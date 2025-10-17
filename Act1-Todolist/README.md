# To-do List Application

A full-stack task management system built with **React.js**, **NestJS**, **TypeScript**, and **MySQL**. Features complete CRUD operations, priority-based task organization, and real-time statistics tracking.

---

## System Overview

### Application Purpose
A web-based task management system that enables users to create, organize, and track daily tasks with advanced features including priority levels, due dates, completion status, and filtering capabilities.

### Key Capabilities
- **CRUD Operations**: Full Create, Read, Update, Delete functionality for tasks
- **Task Attributes**: Title, description, priority (Low/Medium/High), due date, completion status
- **Organization**: Filter tasks by status (All, Active, Completed)
- **Statistics**: Real-time tracking of total, active, and completed tasks
- **Responsive UI**: Mobile-first design with modern aesthetics

---

## Technology Stack

### Frontend Layer
| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 18.x | UI component framework |
| TypeScript | 4.x | Type-safe development |
| Axios | 1.x | HTTP client for API calls |
| CSS3 | - | Styling and animations |
| date-fns | 2.x | Date formatting |

### Backend Layer
| Technology | Version | Purpose |
|------------|---------|---------|
| NestJS | 10.x | Server-side framework |
| Node.js | 16+ | Runtime environment |
| TypeScript | 4.x | Type-safe backend code |
| TypeORM | 0.3.x | Database ORM |
| class-validator | 0.14.x | DTO validation |

### Database Layer
| Technology | Version | Purpose |
|------------|---------|---------|
| MySQL | 8.0+ | Relational database |
| TypeORM | 0.3.x | Database migrations & queries |

### Architecture Pattern
- **Design**: RESTful API architecture
- **Communication**: Client-server model with HTTP/JSON
- **Data Flow**: React → Axios → NestJS → TypeORM → MySQL
- **Validation**: Client-side (React forms) + Server-side (class-validator)

---

## System Requirements

### Software Prerequisites
```
Node.js      : v16.0.0 or higher
MySQL Server : v8.0.0 or higher
npm          : v7.0.0 or higher (comes with Node.js)
```

### Port Requirements
```
Frontend  : Port 3000 (React development server)
Backend   : Port 3001 (NestJS API server)
Database  : Port 3306 (MySQL default)
```

---

## Installation & Setup

### Step 1: Database Setup

1. **Install MySQL Server** if not already installed
2. **Start MySQL Service**
3. **Create Database**:
   ```sql
   CREATE DATABASE taskmanager;
   ```
4. **Note your MySQL credentials** (username, password, port)

### Step 2: Backend Setup

1. **Navigate to Backend Directory**:
   ```bash
   cd Act1-Todolist/backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   
   Create a `.env` file in the backend directory with the following content:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=taskmanager
   PORT=3001
   ```
   Replace `your_mysql_password` with your actual MySQL password.

4. **Start Backend Server**:
   ```bash
   npm run start:dev
   ```
   
   The backend API will be available at `http://localhost:3001`
   
   **Success Indicators**:
   - Console shows "To-do List Backend running on port 3001"
   - Database tables are automatically created
   - No error messages in the console

### Step 3: Frontend Setup

1. **Open New Terminal Window**

2. **Navigate to Frontend Directory**:
   ```bash
   cd Act1-Todolist/frontend
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start Frontend Development Server**:
   ```bash
   npm start
   ```
   
   The application will automatically open in your browser at `http://localhost:3000`

---

## Application Usage

### User Interface Operations

**Access Application**: Navigate to `http://localhost:3000`

**Task Creation**:
1. Click "Add Task" button
2. Required field: Task title
3. Optional fields: Description, Priority (Low/Medium/High), Due Date
4. Submit to persist to database

**Task Management**:
- **Mark Complete**: Toggle checkbox (PATCH `/tasks/:id/toggle`)
- **Edit Task**: Click edit icon (✏️) to modify task data
- **Delete Task**: Click delete icon (🗑️) to remove from database
- **Filter View**: Select All / Active / Completed tabs

**Real-time Statistics**: Dashboard displays live counts of total, active, and completed tasks

---

## API Specification

### REST Endpoints

| HTTP Method | Endpoint | Request Body | Response | Description |
|-------------|----------|--------------|----------|-------------|
| GET | `/tasks` | - | Task[] | Retrieve all tasks from database |
| GET | `/tasks/:id` | - | Task | Retrieve single task by ID |
| POST | `/tasks` | CreateTaskDto | Task | Create new task record |
| PATCH | `/tasks/:id` | UpdateTaskDto | Task | Update task attributes |
| PATCH | `/tasks/:id/toggle` | - | Task | Toggle completion status |
| DELETE | `/tasks/:id` | - | void | Delete task from database |

### Data Transfer Objects (DTOs)

**CreateTaskDto**:
```typescript
{
  title: string;           // Required, min 1 char
  description?: string;    // Optional
  priority?: 'low' | 'medium' | 'high';  // Optional, defaults to 'low'
  dueDate?: string;        // Optional, ISO date string
}
```

**UpdateTaskDto**:
```typescript
{
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
}
```

**Task Entity Schema** (Database Model):
```typescript
{
  id: number;              // Auto-generated primary key
  title: string;           // Task title
  description?: string;    // Task details
  completed: boolean;      // Status flag (default: false)
  priority: string;        // Priority level (default: 'low')
  dueDate?: Date;         // Target completion date
  createdAt: Date;        // Auto-generated timestamp
  updatedAt: Date;        // Auto-updated timestamp
}
```

### API Testing Examples

**GET /tasks - Retrieve All Tasks**

![GET Tasks](images/gettasks.png)

*Example response showing all tasks retrieved from the database*

---

**POST /tasks - Create New Task**

![POST Task](images/posttasks.png)

*Creating a new task with title, description, priority, and due date*

---

**PATCH /tasks/:id - Update Task**

![PATCH Task](images/patchtasks.png)

*Updating an existing task's information*

---

**DELETE /tasks/:id - Delete Task**

![DELETE Task](images/deltasks.png)

*Deleting a task from the database*

---

## Project Structure

```
Act1-Todolist/
├── backend/                      # NestJS Backend API
│   ├── src/
│   │   ├── tasks/               # Task module
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── create-task.dto.ts
│   │   │   │   └── update-task.dto.ts
│   │   │   ├── entities/        # Database entities
│   │   │   │   └── task.entity.ts
│   │   │   ├── tasks.controller.ts
│   │   │   ├── tasks.service.ts
│   │   │   └── tasks.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json
├── frontend/                     # React.js Frontend
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── TaskForm.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   └── TaskList.tsx
│   │   ├── services/            # API services
│   │   │   └── taskService.ts
│   │   ├── types/               # TypeScript types
│   │   │   └── Task.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.tsx
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── tsconfig.json
├── images/                       # Screenshots and documentation images
└── README.md
```

---

## Development Commands

### Backend (NestJS)
```bash
cd backend
npm run start:dev   # Development mode with hot-reload (watch mode)
npm run build       # Compile TypeScript to JavaScript (dist/)
npm run start:prod  # Production mode (requires build first)
npm run lint        # ESLint code analysis
npm run test        # Run Jest unit tests
```

### Frontend (React)
```bash
cd frontend
npm start           # Development server with hot-reload (port 3000)
npm run build       # Production build (optimized bundle)
npm test            # Run Jest/React Testing Library tests
```

### Database Operations
```bash
# TypeORM migrations (if synchronize: false)
npm run migration:generate -- -n MigrationName
npm run migration:run
npm run migration:revert
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Backend Won't Start
- **Issue**: Backend fails to start or crashes immediately
- **Solutions**:
  - Check if MySQL server is running
  - Verify database credentials in `.env` file
  - Ensure port 3001 is not in use by another application
  - Confirm the database `taskmanager` exists in MySQL

#### 2. Frontend Can't Connect to Backend
- **Issue**: API calls fail or return CORS errors
- **Solutions**:
  - Confirm backend is running on port 3001
  - Check browser console for specific CORS errors
  - Verify API URLs in `taskService.ts`
  - Ensure CORS is properly configured in `main.ts`

#### 3. Database Connection Errors
- **Issue**: "Cannot connect to database" or similar errors
- **Solutions**:
  - Confirm MySQL service is active and running
  - Check database name exists (`taskmanager`)
  - Verify username and password in `.env` file
  - Ensure DB_HOST and DB_PORT are correct

#### 4. Port Conflicts
- **Issue**: "Port already in use" error
- **Solutions**:
  - Change backend port in `.env` file (default: 3001)
  - Change frontend port by setting PORT environment variable
  - Update frontend proxy configuration if backend port changes

#### 5. Dependencies Installation Fails
- **Issue**: npm install fails with errors
- **Solutions**:
  - Clear npm cache: `npm cache clean --force`
  - Delete `node_modules` and `package-lock.json`, then reinstall
  - Ensure Node.js version is 16 or higher
  - Check internet connection for package downloads

---

## Deployment

### Backend Deployment

1. **Environment Configuration**:
   - Set `NODE_ENV=production`
   - Configure production database settings
   - Set `synchronize: false` in TypeORM configuration for safety

2. **Build Application**:
   ```bash
   npm run build
   ```

3. **Start Production Server**:
   ```bash
   npm run start:prod
   ```

4. **Recommended Hosting**: Heroku, AWS EC2, DigitalOcean, Railway

### Frontend Deployment

1. **Update API Base URL**:
   - Modify `taskService.ts` to point to production backend URL

2. **Build for Production**:
   ```bash
   npm run build
   ```

3. **Deploy Static Files**:
   - Serve the `build` folder with a web server (Nginx, Apache)
   - Or deploy to platforms like Vercel, Netlify, or AWS S3

4. **Recommended Hosting**: Vercel, Netlify, AWS S3 + CloudFront

### Database Production Setup

1. Use a managed MySQL service (AWS RDS, Google Cloud SQL, PlanetScale)
2. Set up proper backups and monitoring
3. Configure SSL/TLS for secure connections
4. Disable `synchronize` in TypeORM and use migrations instead

---

## Technical Learning Outcomes

### Full-Stack Architecture
- **Client-Server Communication**: RESTful API design and implementation
- **State Management**: React hooks (useState, useEffect) for component state
- **Data Persistence**: MySQL relational database with TypeORM migrations
- **Type Safety**: End-to-end TypeScript across frontend and backend

### Backend Engineering (NestJS)
- **Modular Architecture**: Modules, Controllers, Services separation
- **Dependency Injection**: NestJS IoC container pattern
- **Data Validation**: class-validator decorators for DTO validation
- **ORM Integration**: TypeORM entities, repositories, and query builders
- **CORS Configuration**: Cross-origin resource sharing setup

### Frontend Engineering (React)
- **Component Architecture**: Functional components with TypeScript interfaces
- **HTTP Client**: Axios interceptors and error handling
- **Form Handling**: Controlled components with validation
- **Conditional Rendering**: Dynamic UI based on application state
- **CSS Styling**: Responsive design with flexbox and grid

### Database Design
- **Schema**: Task entity with relationships and constraints
- **Indexes**: Primary keys and auto-increment IDs
- **Timestamps**: Automatic createdAt/updatedAt tracking
- **Data Types**: VARCHAR, TEXT, BOOLEAN, DATETIME mapping

---

## License

Educational and demonstration purposes only.

---

**System Architecture**: React.js (Frontend) ↔ NestJS API (Backend) ↔ MySQL (Database)
