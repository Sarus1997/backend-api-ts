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

```bash
Recommended Node.js version: v23.10.0
```

## 📁 Project Structure
Use the ``` tsc ``` command to create a Folder ``` dist```

```project-root/
├── src/
│    ├── config/
│    │   └── env.ts
│    ├── core/
│    │   └── function.ts
│    ├── Middleware/
│    │   └── authMiddleware.ts
│    ├── model/
│    │   └── signin/
│    │   │   └── post_login.ts
│    │   └── signup/
│    │   │   └── post_register.ts
│    │   └── get_data.ts
│    │   └── get_data.ts
│    │   └── post_data.ts
│    │   └── update_data.ts
│    │   └── delete_data.ts
│    ├── routes/
│    │   └── route.ts
│    ├── utils/
│        └── colorUtils.ts
├── .env
├── config.yaml
├── index.ts
├── generateSecretKey.ts
├── chack_pass.ts
```

## 🛠️ Core Files

### Enable/Disable API usage in config.yaml file using True/False
```yaml
    api_status:
      users: true
      product: true
```

### User Routes (src/routes/routes.ts)

```typescript
import { Router } from 'express';
const router = Router();

router.get('/'); //* Welcome Page
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
import { logServerRunning } from './utils/logger';
import router from './routes/route';
import { getHomePage } from './views/getHomePage';

//* Load environment variables
dotenv.config();

(async () => {
  const port: number = 8080;
  const server: Application = express();

  server.use(express.static(path.join(__dirname, 'public')));
  server.use(bodyParser.json());
  server.use(router);

  //* Welcome Page
  server.get('/', (req, res) => {
    res.send(getHomePage());
  });

  //* Server Running
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

## 🛠️ Scripts

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon --exec ts-node src/index.ts",
    "start": "node dist/index.js",
    "build": "tsc"
  }
}
```
``` 
Developed ⚒️ by Saharat Suwannapapond
```
