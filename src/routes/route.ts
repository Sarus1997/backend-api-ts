import { Router } from 'express';
const router = Router();

import { getData, getFixData } from '../model/get_data';
import { postData } from '../model/post_data';
import { updateData } from '../model/update_data';
import { deleteData } from '../model/delete_data';



//* GET *//
router.get('/api/get_data', getData);
router.get('/api/get_fix_data', getFixData);

//* POST *//
router.post('/api/post_data', postData);

//* PUT *//
router.put('/api/update_data', updateData);

//* DELETE *//
router.delete('/api/delete_data', deleteData);

export default router;
