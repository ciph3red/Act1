# Task Manager Application

A full-stack task management application built with React.js frontend and NestJS backend with TypeScript and MySQL database.

## Features

### Frontend (React.js)
- ✅ Modern, responsive UI with beautiful design
- ✅ Add, view, edit, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Filter tasks by status (All, Active, Completed)
- ✅ Task priority levels (Low, Medium, High)
- ✅ Due date management
- ✅ Task descriptions
- ✅ Real-time task statistics
- ✅ Form validation and error handling

### Backend (NestJS + TypeScript)
- ✅ RESTful API with full CRUD operations
- ✅ MySQL database integration with TypeORM
- ✅ Data validation with class-validator
- ✅ CORS enabled for frontend communication
- ✅ Structured DTOs for type safety
- ✅ Error handling and logging

## Technology Stack

- **Frontend**: React.js 18, TypeScript, CSS3, Axios
- **Backend**: NestJS, TypeScript, Node.js
- **Database**: MySQL with TypeORM
- **Additional**: date-fns for date formatting

## Project Structure

```
Act1-Todolist/
├── backend/
│   ├── src/
│   │   ├── tasks/
│   │   │   ├── dto/
│   │   │   │   ├── create-task.dto.ts
│   │   │   │   └── update-task.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── task.entity.ts
│   │   │   ├── tasks.controller.ts
│   │   │   ├── tasks.service.ts
│   │   │   └── tasks.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   └── TaskList.tsx
│   │   ├── services/
│   │   │   └── taskService.ts
│   │   ├── types/
│   │   │   └── Task.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.tsx
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- MySQL Server (v8.0 or higher)
- npm or yarn package manager

## Installation & Setup

### 1. Database Setup

1. Install and start MySQL server
2. Create a new database:
   ```sql
   CREATE DATABASE taskmanager;
   ```

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Act1-Todolist/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=taskmanager
   PORT=3001
   ```

4. Start the backend server:
   ```bash
   npm run start:dev
   ```

   The backend will run on `http://localhost:3001`

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Act1-Todolist/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

## API Endpoints

### Tasks
- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a specific task
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update a task
- `PATCH /tasks/:id/toggle` - Toggle task completion status
- `DELETE /tasks/:id` - Delete a task

### Task Schema
```typescript
{
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority?: string; // 'low' | 'medium' | 'high'
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
```

## Usage Instructions

1. **Adding Tasks**: Click the "Add Task" button to create new tasks with title, description, priority, and due date.

2. **Managing Tasks**: 
   - Click the checkbox to mark tasks as complete/incomplete
   - Use the edit button (✏️) to modify task details
   - Use the delete button (🗑️) to remove tasks

3. **Filtering Tasks**: Use the filter tabs to view:
   - All tasks
   - Active (incomplete) tasks only
   - Completed tasks only

4. **Task Statistics**: View real-time counts of total, active, and completed tasks.

## Development

### Backend Development
```bash
cd backend
npm run start:dev  # Start in development mode with hot reload
npm run build      # Build for production
npm run start:prod # Start in production mode
```

### Frontend Development
```bash
cd frontend
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**: 
   - Ensure MySQL server is running
   - Check database credentials in `.env` file
   - Verify the database exists

2. **CORS Issues**:
   - Backend includes CORS configuration for `http://localhost:3000`
   - If using different ports, update CORS settings in `main.ts`

3. **Port Conflicts**:
   - Backend runs on port 3001 by default
   - Frontend runs on port 3000 by default
   - Change ports in respective configuration files if needed

## Production Deployment

1. **Backend**: 
   - Set `NODE_ENV=production`
   - Configure production database settings
   - Set `synchronize: false` in TypeORM configuration

2. **Frontend**: 
   - Update API base URL in `taskService.ts`
   - Run `npm run build` to create production build
   - Serve static files with a web server

## License

This project is for educational purposes.
