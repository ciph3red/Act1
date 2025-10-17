# Task Manager Backend API

A RESTful API built with NestJS and TypeScript for managing tasks with MySQL database.

## Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Database Setup**:
   - Create MySQL database: `taskmanager`
   - Create `.env` file with your database credentials:
     ```env
     DB_HOST=localhost
     DB_PORT=3306
     DB_USERNAME=root
     DB_PASSWORD=your_password
     DB_NAME=taskmanager
     PORT=3001
     ```

3. **Start Development Server**:
   ```bash
   npm run start:dev
   ```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get task by ID |
| POST | `/tasks` | Create new task |
| PATCH | `/tasks/:id` | Update task |
| PATCH | `/tasks/:id/toggle` | Toggle completion |
| DELETE | `/tasks/:id` | Delete task |

## Environment Variables

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_NAME=taskmanager
PORT=3001
```

## Scripts

- `npm run start:dev` - Start in development mode
- `npm run build` - Build for production
- `npm run start:prod` - Start in production mode
- `npm run test` - Run tests
