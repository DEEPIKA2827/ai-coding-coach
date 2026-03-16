import os
import sys

# Define the directory structure
base_path = r'c:\Users\Deepika\ai_coding\backend'
dirs = [
    'src',
    'src\\routes',
    'src\\controllers',
    'src\\services',
    'src\\models',
    'src\\middleware',
    'src\\config'
]

print("Creating directory structure...\n")

# Create all directories
for directory in dirs:
    full_path = os.path.join(base_path, directory)
    if not os.path.exists(full_path):
        os.makedirs(full_path, exist_ok=True)
        print(f"✓ Created: {full_path}")
    else:
        print(f"✓ Already exists: {full_path}")

print("\n✓ Directory structure created successfully!\n")

# Display the directory tree
print("Directory structure:\n")

def show_tree(directory, prefix="", is_last=True):
    """Display directory tree"""
    connector = "└── " if is_last else "├── "
    print(prefix + connector + os.path.basename(directory))
    
    prefix += "    " if is_last else "│   "
    
    try:
        entries = sorted(os.listdir(directory))
        dirs_list = [e for e in entries if os.path.isdir(os.path.join(directory, e))]
        
        for i, entry in enumerate(dirs_list):
            entry_path = os.path.join(directory, entry)
            is_last_entry = (i == len(dirs_list) - 1)
            show_tree(entry_path, prefix, is_last_entry)
    except PermissionError:
        pass

# Print the root
print(base_path)

# Print the tree starting from src
src_path = os.path.join(base_path, 'src')
if os.path.exists(src_path):
    entries = sorted(os.listdir(src_path))
    for i, entry in enumerate(entries):
        entry_path = os.path.join(src_path, entry)
        is_last = (i == len(entries) - 1)
        show_tree(entry_path, "", is_last)
