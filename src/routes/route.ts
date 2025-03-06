import { Router } from 'express';
const router = Router(); ///* สร้าง router ของ Express

///* นำเข้าไฟล์จาก model
import { getData, getDataID, getFixData } from '../model/get_data';
import { postData } from '../model/post_data';
import { postRegister } from '../model/post_register';
import { postLogin } from '../model/post_login';
import { updateData } from '../model/update_data';
import { deleteData } from '../model/delete_data';




//* GET *//
router.get('/api/get_data', getData);
router.get('/api/get_fix_data', getFixData);
router.get('/api/get_data_id', getDataID);


//* POST *//
router.post('/api/post_data', postData);
router.post("/api/post_register", postRegister);
router.post("/api/post_login", postLogin);

//* PUT *//
router.put('/api/update_data', updateData);

//* DELETE *//
router.delete('/api/delete_data', deleteData);

export default router;
