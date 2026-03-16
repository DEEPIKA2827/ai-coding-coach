# Create the backend directory structure
$basePath = "c:\Users\Deepika\ai_coding\backend"

$dirs = @(
    "src",
    "src\routes",
    "src\controllers",
    "src\services",
    "src\models",
    "src\middleware",
    "src\config"
)

# Create all directories
foreach ($dir in $dirs) {
    $fullPath = Join-Path $basePath $dir
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
        Write-Host "✓ Created: $fullPath"
    } else {
        Write-Host "✓ Already exists: $fullPath"
    }
}

Write-Host "`n✓ Directory structure created successfully!`n"

# Display the directory tree
Write-Host "Directory structure:"
tree /F $basePath
