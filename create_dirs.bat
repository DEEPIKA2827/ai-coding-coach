@echo off
REM Create the backend directory structure

mkdir "c:\Users\Deepika\ai_coding\backend\src\routes" 2>nul
mkdir "c:\Users\Deepika\ai_coding\backend\src\controllers" 2>nul
mkdir "c:\Users\Deepika\ai_coding\backend\src\services" 2>nul
mkdir "c:\Users\Deepika\ai_coding\backend\src\models" 2>nul
mkdir "c:\Users\Deepika\ai_coding\backend\src\middleware" 2>nul
mkdir "c:\Users\Deepika\ai_coding\backend\src\config" 2>nul

echo Directory structure created successfully!

REM Display the directory tree
cd c:\Users\Deepika\ai_coding\backend
tree /F

pause
