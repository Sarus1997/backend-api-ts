# Backend Api TS 😎

## Description

### API Built with Express.js and TypeScript

This project is a robust and efficient API using Express.js and TypeScript. It provides basic CRUD (Create, Read, Update, Delete) operations to manage users effectively with type safety and proper error handling.

## 🚀 Installation

Follow these steps to set up and run the project:

### Clone the project

```bash
git clone https://github.com/Sarus1997/backend-api-ts.git
cd backend-api-ts 
➡️ Run `npm install`
➡️ Run `npm run dev`
```

## 📁 Project Structure

```
src/
├── config/
│   └── database.ts
├── controllers/
│   └── userController.ts
├── middleware/
│   └── errorHandler.ts
├── routes/
│   └── userRoutes.ts
├── types/
│   └── user.types.ts
└── app.ts
```

## 🛠️ Core Files

### User Types (src/types/user.types.ts)

```typescript
export interface User {
    id: number;
    username: string;
    email: string;
    created_at: Date;
}
```

### Database Configuration (src/config/database.ts)

```typescript
import { Pool } from 'pg';

export const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});
```

### Error Handler (src/middleware/errorHandler.ts)

```typescript
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};
```

### User Routes (src/routes/userRoutes.ts)

```typescript
import express from 'express';
import { userController } from '../controllers/userController';

const router = express.Router();

router.get('/', userController.welcomePage);
router.get('/api/get_data', userController.getAllData);
router.post('/api/post_data', userController.postData);
router.put('/api/update_data/:id', userController.updateData);
router.delete('/api/delete_data/:id', userController.deleteData);

export default router;
```

### Main Application (src/app.ts)

```typescript
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
```

## 📂 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome page |
| GET | `/api/get_data` | Get all users |
| POST | `/api/post_data` | Create new user |
| PUT | `/api/update_data/:id` | Update user by ID |
| DELETE | `/api/delete_data/:id` | Delete user by ID |

## 📦 Dependencies

```json
{
    "dependencies": {
        "cors": "^2.8.5",
        "express": "^4.18.2",
        "pg": "^8.11.3"
    },
    "devDependencies": {
        "@types/cors": "^2.8.17",
        "@types/express": "^4.17.21",
        "@types/node": "^20.11.19",
        "@types/pg": "^8.11.0",
        "nodemon": "^3.0.3",
        "ts-node": "^10.9.2",
        "typescript": "^5.3.3"
    }
}
```

## 🛠️ Scripts

```json
{
    "scripts": {
        "start": "node dist/app.js",
        "dev": "nodemon src/app.ts",
        "build": "tsc",
        "lint": "eslint . --ext .ts",
        "test": "jest"
    }
}
```

```bash
Developed ⚒️ by Saharat Suwannapapond 
```