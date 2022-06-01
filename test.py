import os
import random
message = ['api changes', 'new additions', 'bug fixes', 'changes', 'done for the day', 'made changes', 'new features', 'api added', 'database changes', 'validation', 'fixed']
os.system("git add .")
os.system(f'git commit -m"{random.choice(message)}"')