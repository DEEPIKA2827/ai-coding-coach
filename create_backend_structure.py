#!/usr/bin/env python3
"""Create backend directory structure"""

import os
import sys

base_path = r"c:\Users\Deepika\ai_coding"
os.chdir(base_path)

# Create directory structure
directories = [
    "backend/src/routes",
    "backend/src/controllers",
    "backend/src/services",
    "backend/src/models",
    "backend/src/middleware",
    "backend/src/config"
]

try:
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
    print("✓ Directories created successfully!")
    print("\n--- Contents of backend directory ---")
    
    # List backend contents
    for item in sorted(os.listdir("backend")):
        print(item)
    
    print("\n--- Full directory tree ---")
    # Simple tree display
    for root, dirs, files in os.walk("backend"):
        level = root.replace("backend", "").count(os.sep)
        indent = " " * 2 * level
        print(f"{indent}{os.path.basename(root)}/")
        subindent = " " * 2 * (level + 1)
        for dir_name in sorted(dirs):
            print(f"{subindent}{dir_name}/")
        for file_name in sorted(files):
            print(f"{subindent}{file_name}")
            
except Exception as e:
    print(f"✗ Error: {e}")
    sys.exit(1)
