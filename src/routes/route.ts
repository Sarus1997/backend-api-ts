import { Router } from 'express';
import { getData } from '../model/get_data';
import { postData } from '../model/post_data';
import { updateData } from '../model/update_data';
import { deleteData } from '../model/delete_data';

const router = Router();

// Define routes
router.get('/api/get_data', getData); // Use GET for fetching data
router.post('/api/post_data', postData); // Use POST for adding new data
router.put('/api/update_data', updateData); // Use PUT for updates
router.delete('/api/delete_data', deleteData); // Use DELETE for deletion

export default router;
