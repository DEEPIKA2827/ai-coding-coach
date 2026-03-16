@echo off
REM Create backend directory structure
cd /d c:\Users\Deepika\ai_coding

echo Creating directory structure...
mkdir backend\src\routes 2>nul
mkdir backend\src\controllers 2>nul
mkdir backend\src\services 2>nul
mkdir backend\src\models 2>nul
mkdir backend\src\middleware 2>nul
mkdir backend\src\config 2>nul

echo.
echo Directories created successfully!
echo.
echo Displaying directory tree:
echo.
tree /F backend
