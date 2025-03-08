### Example of use

#### 📂 API Endpoints

```bash
router.get('/'); //* Welcome Page
router.get("/api/get_data", getData);
router.post('/api/post_data', postData);
router.put('/api/update_data', updateData);
router.delete('/api/delete_data', deleteData);
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome page |
| GET | `/api/get_data` | Get all users |
| POST | `/api/post_data` | Create new user |
| PUT | `/api/update_data/:id` | Update user by ID |
| DELETE | `/api/delete_data/:id` | Delete user by ID |