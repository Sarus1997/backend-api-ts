# Backend Api TS 😎

## Description

### API Built with TypeScript

This project is a robust and efficient API using Express.js and TypeScript. It provides basic CRUD (Create, Read, Update, Delete) operations to manage users effectively with type safety and proper error handling.

## 🚀 Installation

Follow these steps to set up and run the project:

### Clone the project

```bash
git clone https://github.com/Sarus1997/backend-api-ts.git
cd backend-api-ts 
npm install
npm run dev (Develop)
npm start (Production)
```

## 📁 Project Structure
Use the ``` tsc ``` command to create a Folder ``` dist```

```project-root/
├── src/
│    ├── config/
│    │   └── colorUtils.ts
│    ├── core/
│    │   └── function.ts
│    ├── model/
│    │   └── get_data.ts
│    │   └── post_data.ts
│    │   └── update_data.ts
│    │   └── delete_data.ts
│    ├── routes/
│    │   └── route.ts
│    ├── server/
│        └── db.ts
├── index.ts
├── generateSecretKey.ts
├── chack_pass.ts
```

## 🛠️ Core Files

### User Routes (src/routes/routes.ts)

```typescript
import { Router } from 'express';
const router = Router();

router.get('/'); // Welcome Page
router.get("/api/get_data", getData);
router.post('/api/post_data', postData);
router.put('/api/update_data', updateData);
router.delete('/api/delete_data', deleteData);

export default router;
```

### Main Application (index.ts)

```typescript
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import { logServerRunning } from './src/config/logger';
import router from './src/routes/route';
import { getHomePage } from './src/home';

dotenv.config();

(async () => {
  const port: number = 8080;
  const server: Application = express();

  server.use(express.static(path.join(__dirname, 'public')));
  server.use(bodyParser.json());
  server.use(router);

  //* หน้าแรก
  server.get('/', (req, res) => {
    res.send(getHomePage());
  });

  server.listen(port, () => {
    logServerRunning(port);
  });
})();

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
    "mysql2": "^3.11.5"
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
