import { Router } from 'express';

import { getData, getDataID, getFixData } from '../model/get_data';
import { postData } from '../model/post_data';
import { postRegister } from '../model/signup/post_register';
import { updateData } from '../model/update_data';
import { deleteData } from '../model/delete_data';
import authenticate from '../Middleware/authMiddleware';
import { postLogin } from '../model/signin/post_login';

const router = Router();

//* ไม่ต้องใช้ Token *//
//* register
router.post("/api/register", postRegister);
//* login
router.post("/api/signin", postLogin);

//* ต้องใช้ Token *//
//* GET *//
router.get('/api/get_data', authenticate, getData);  // ต้องใช้ Token
router.get('/api/get_fix_data', authenticate, getFixData);  // ต้องใช้ Token
router.get('/api/get_data_id', authenticate, getDataID);  // ต้องใช้ Token

//* POST *//
router.post('/api/post_data', authenticate, postData);  // ต้องใช้ Token

//* PUT *//
router.put('/api/update_data', authenticate, updateData);  // ต้องใช้ Token

//* DELETE *//
router.delete('/api/delete_data', authenticate, deleteData);  // ต้องใช้ Token

export default router;
