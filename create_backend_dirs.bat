@echo off
REM Create backend directory structure
setlocal enabledelayedexpansion

cd /d c:\Users\Deepika\ai_coding

echo Creating backend directory structure...
echo.

if not exist backend (
    mkdir backend
    echo ✓ Created: backend
) else (
    echo ✓ Already exists: backend
)

if not exist backend\src (
    mkdir backend\src
    echo ✓ Created: backend\src
) else (
    echo ✓ Already exists: backend\src
)

if not exist backend\src\routes (
    mkdir backend\src\routes
    echo ✓ Created: backend\src\routes
) else (
    echo ✓ Already exists: backend\src\routes
)

if not exist backend\src\controllers (
    mkdir backend\src\controllers
    echo ✓ Created: backend\src\controllers
) else (
    echo ✓ Already exists: backend\src\controllers
)

if not exist backend\src\services (
    mkdir backend\src\services
    echo ✓ Created: backend\src\services
) else (
    echo ✓ Already exists: backend\src\services
)

if not exist backend\src\models (
    mkdir backend\src\models
    echo ✓ Created: backend\src\models
) else (
    echo ✓ Already exists: backend\src\models
)

if not exist backend\src\middleware (
    mkdir backend\src\middleware
    echo ✓ Created: backend\src\middleware
) else (
    echo ✓ Already exists: backend\src\middleware
)

if not exist backend\src\config (
    mkdir backend\src\config
    echo ✓ Created: backend\src\config
) else (
    echo ✓ Already exists: backend\src\config
)

echo.
echo ✓ All directories created successfully!
echo.
echo --- Directory Structure ---
echo.
tree backend
echo.
dir /s /b backend

endlocal
pause
