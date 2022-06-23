
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import PasswordReset from 'App/Models/PasswordReset'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Mail from '@ioc:Adonis/Addons/Mail'
import Route from '@ioc:Adonis/Core/Route'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  public async users(){
    return User.all()

  }
  public async register({ request, response }: HttpContextContract) {
    // validate email
    const validations = schema.create({
      first_name: schema.string({}, [rules.minLength(3)]),
      last_name: schema.string({}, [rules.minLength(3)]),
      role: schema.string({}, [rules.required()]),
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [rules.confirmed()]),
    })
    const data = await request.validate({ schema: validations })
    const user = await User.create(data)
    return response.created(user)
  }
  public async update({params, request}: HttpContextContract){
    const newMenuSchema = schema.create({
      first_name: schema.string({trim: true}),
      last_name: schema.string({trim: true}),
      role: schema.string({trim: true}),
    })
    const payload = await request.validate({schema: newMenuSchema})
    const user = await User.findOrFail(params.id)
    user.firstName = payload.first_name
    user.lastName = payload.last_name
    user.role = payload.role

    return user.save()
  }
  //   login function
  public async login({ request, response, auth }: HttpContextContract) {
    const password = await request.input('password')
    const email = await request.input('email')

    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '24hours',
      })
      const user = await User.findByOrFail('email', email)
      return {"token": token.toJSON(), "user": user}
    } catch {
      return response
        .status(400)
        .send({ error: { message: 'User with provided credentials could not be found' } })
    }
  }

  //   logout function
  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.status(200)
  }

  public async sendResetCode({ request, response }: HttpContextContract) {
    const validations = schema.create({
      email: schema.string({}, [rules.email()])
    })


    const data = await request.validate({ schema: validations })
    const email = data.email
    let code = Math.floor(100000 + Math.random() * 900000)
    const user = await User.findByOrFail('email', email)
    
    await Mail.send((message) => {
      message
        .from('Annapurna')
        .to(user.email)
        .subject('Password Reset')
        .html(code.toString());
        // .htmlView('emails/welcome', { name: code })
    })
    let reset = await PasswordReset.create({ email, code})

    return response.status(200)
  }

  public async resetPassword({ params, request, response }: HttpContextContract) {
    const validations = schema.create({
      password: schema.string({}, [rules.minLength(6)]),
      confirmPassword: schema.string({}, [rules.minLength(6)])
    })

    const data = await request.validate({ schema: validations })
    if (request.hasValidSignature()) {
      const user = await User.findByOrFail('email', params.email)
      // console.log(data.password);
      // const hashedPassword = await Hash.make(data.password)
      // const testP = await Hash.make('111111')
      // const testPI = await Hash.make('111111')
      user.password = data.password
      // console.log(hashedPassword);
      // console.log(testP);
      
      user.save()
      return user
    }else{
      return response.status(500) 
    }
  }


  public async resetCode({ request, response }: HttpContextContract) {
    const validations = schema.create({
      code: schema.string({}, [rules.minLength(6)]),
      email: schema.string({}, [rules.email()])

    })


    const data = await request.validate({ schema: validations })

    const users = await PasswordReset
      .query() // 👈now have access to all query builder methods
      .where('email',data.email)
      .where('code', data.code)
    if (users.length > 0){
      const resetPasswordUrl = Route.builder()
        .params({ email: data.email })
        .makeSigned('reset.password', { expiresIn: '1h' })
      return {"reset_url": resetPasswordUrl};
    }else{
      return response.status(500)
    }
  }
}


