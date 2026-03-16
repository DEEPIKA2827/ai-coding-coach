#!/usr/bin/env python3
"""Create backend directory structure and verify"""

import os
import subprocess
import sys

def create_directories():
    """Create the backend directory structure"""
    base_path = r'c:\Users\Deepika\ai_coding'
    backend_path = os.path.join(base_path, 'backend')
    
    directories = [
        backend_path,
        os.path.join(backend_path, 'src'),
        os.path.join(backend_path, 'src', 'routes'),
        os.path.join(backend_path, 'src', 'controllers'),
        os.path.join(backend_path, 'src', 'services'),
        os.path.join(backend_path, 'src', 'models'),
        os.path.join(backend_path, 'src', 'middleware'),
        os.path.join(backend_path, 'src', 'config')
    ]
    
    print('Creating backend directory structure...\n')
    
    for directory in directories:
        try:
            os.makedirs(directory, exist_ok=True)
            print(f'✓ Created: {directory}')
        except Exception as e:
            print(f'✗ Failed to create {directory}: {e}')
            return False
    
    return True

def display_tree(path, prefix='', is_last=True):
    """Display directory tree structure"""
    if not os.path.exists(path):
        return
    
    basename = os.path.basename(path)
    connector = '└── ' if is_last else '├── '
    print(prefix + connector + basename)
    
    try:
        entries = sorted(os.listdir(path))
        dirs = [e for e in entries if os.path.isdir(os.path.join(path, e))]
        
        for i, entry in enumerate(dirs):
            entry_path = os.path.join(path, entry)
            is_last_entry = (i == len(dirs) - 1)
            new_prefix = prefix + ('    ' if is_last else '│   ')
            display_tree(entry_path, new_prefix, is_last_entry)
    except PermissionError:
        pass

def main():
    """Main function"""
    base_path = r'c:\Users\Deepika\ai_coding'
    backend_path = os.path.join(base_path, 'backend')
    
    # Create directories
    if not create_directories():
        print('\n✗ Failed to create some directories')
        return 1
    
    print('\n✓ All directories created successfully!\n')
    print('--- Directory Structure ---\n')
    print(backend_path)
    
    # Display tree
    try:
        entries = sorted(os.listdir(backend_path))
        dirs = [e for e in entries if os.path.isdir(os.path.join(backend_path, e))]
        
        for i, entry in enumerate(dirs):
            entry_path = os.path.join(backend_path, entry)
            is_last = (i == len(dirs) - 1)
            display_tree(entry_path, '', is_last)
    except Exception as e:
        print(f'Error displaying tree: {e}')
    
    return 0

if __name__ == '__main__':
    sys.exit(main())
