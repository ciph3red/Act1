@echo off
echo 🚀 Setting up Task Manager Application...

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ and try again.
    pause
    exit /b 1
)

:: Check if MySQL is available
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  MySQL is not installed. Please install MySQL 8.0+ before continuing.
)

echo 📦 Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

echo 📦 Installing frontend dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

cd ..

echo ✅ Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Create MySQL database: CREATE DATABASE taskmanager;
echo 2. Create backend\.env file with your database credentials
echo 3. Start backend: cd backend ^&^& npm run start:dev
echo 4. Start frontend: cd frontend ^&^& npm start
echo.
echo 🌐 Frontend will be available at: http://localhost:3000
echo 🔗 Backend API will be available at: http://localhost:3001
pause
