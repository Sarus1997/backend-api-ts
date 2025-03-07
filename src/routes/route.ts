import { Router } from 'express';

import { getData, getDataID, getFixData } from '../model/get_data';
import { postData } from '../model/post_data';
import { postRegister } from '../model/signup/post_register';
import { updateData } from '../model/update_data';
import { deleteData } from '../model/delete_data';
import { generateToken } from '../Controller/authController';
import authenticate from '../Middleware/authMiddleware';
import { postLogin } from '../model/signin/post_login';


const router = Router();

//* ไม่ต้องใช้ Token *//
router.post('/api/login/_token', generateToken);

//* register
router.post("/api/register", postRegister);

//* login
router.post("/api/signin", postLogin);

//* ต้องใช้ Token *//
//* GET *//
router.get('/api/get_data', authenticate, getData);
router.get('/api/get_fix_data', authenticate, getFixData);
router.get('/api/get_data_id', authenticate, getDataID);

//* POST *//
router.post('/api/post_data', authenticate, postData);

//* PUT *//
router.put('/api/update_data', authenticate, updateData);

//* DELETE *//
router.delete('/api/delete_data', authenticate, deleteData);

export default router;
