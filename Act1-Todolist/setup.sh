#!/bin/bash

echo "🚀 Setting up Task Manager Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ and try again."
    exit 1
fi

# Check if MySQL is running
if ! command -v mysql &> /dev/null; then
    echo "⚠️  MySQL is not installed. Please install MySQL 8.0+ before continuing."
fi

echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

echo "✅ Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Create MySQL database: CREATE DATABASE taskmanager;"
echo "2. Create backend/.env file with your database credentials"
echo "3. Start backend: cd backend && npm run start:dev"
echo "4. Start frontend: cd frontend && npm start"
echo ""
echo "🌐 Frontend will be available at: http://localhost:3000"
echo "🔗 Backend API will be available at: http://localhost:3001"
