import os

directories = [
    r'c:\Users\Deepika\ai_coding\extension\background',
    r'c:\Users\Deepika\ai_coding\extension\content',
    r'c:\Users\Deepika\ai_coding\extension\popup',
    r'c:\Users\Deepika\ai_coding\extension\icons'
]

for d in directories:
    os.makedirs(d, exist_ok=True)
    print(f"Created: {d}")
