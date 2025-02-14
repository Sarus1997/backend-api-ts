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
npm install
npm run dev
```

## 📁 Project Structure

```
src/
├── config/
│   └── colorUtils.ts
├── core/
│   └── function.ts
├── model/
│   └── get_data.ts
│   └── post_data.ts
│   └── update_data.ts
│   └── delete_data.ts
├── routes/
│   └── route.ts
├── server/
    └── db.ts

```

## 🛠️ Core Files

### User Routes (src/routes/routes.ts)

```typescript
import express from 'express';
const router = Router();

router.get('/'); // Welcome Page
router.get("/api/get_data", getData); // Get Data
router.post('/api/post_data', postData); // Create Data
router.put('/api/update_data', updateData); // Update Data
router.delete('/api/delete_data', deleteData); // Delete Data

export default router;
```

### Main Application (index.ts)

```typescript
import express from 'express';
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
    "bcrypt": "^5.1.1",
    "body-parser": "^1.20.3",
    "dotenv": "^16.4.7",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.11.5",
    "open": "^10.1.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/node": "^20.5.0",
    "nodemon": "^3.0.1",
    "ts-node": "^10.9.1",
    "typescript": "^5.1.6"
  }
}
```

## 🛠️ Scripts

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon --exec ts-node index.ts",
    "build": "tsc"
  }
}
```
```
Developed ⚒️ by Saharat Suwannapapond
```