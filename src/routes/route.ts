import { Router } from 'express';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';

import { getData, getDataID, getFixData } from '../model/product/get_data';
import { postData } from '../model/product/post_data';
import { postRegister } from '../model/signup/post_register';
import { updateData } from '../model/product/update_data';
import { deleteData } from '../model/product/delete_data';
import authenticate from '../Middleware/authMiddleware';
import { postLogin } from '../model/signin/post_login';

const router = Router();

//* โหลดค่า config.yaml
const config = yaml.load(readFileSync('config.yaml', 'utf8')) as any;

//* ตรวจสอบการเปิด-ปิด API
const isUsersEnabled = config.api_status.users;
const isProductEnabled = config.api_status.product;

//* ไม่ต้องใช้ Token
if (isUsersEnabled) {
  router.post("/api/register", postRegister);
  router.post("/api/signin", postLogin);
}

//* ต้องใช้ Token
if (isProductEnabled) {

  //* GET *//
  router.get('/api/get_data', authenticate, getData);
  router.get('/api/get_fix_data', authenticate, getFixData);
  router.get('/api/get_data_id', authenticate, getDataID);

  //* POST *//
  router.post('/api/post_data', postData);

  //* PUT *//
  router.put('/api/update_data', authenticate, updateData);

  //* DELETE *//
  router.delete('/api/delete_data', authenticate, deleteData);
}

export default router;
