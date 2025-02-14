const bcrypt = require('bcrypt');

const hash = "$2b$10$t6XR/M9hAr2bwg0MfmKBZOEb8ftDCkoNC4s/SAM4hYS6Io9Rr0Nk2"; // ค่า hash จากฐานข้อมูล
const password = "hashedpassword123"; // รหัสผ่านที่ต้องการทดสอบ

bcrypt.compare(password, hash, function (err, result) {
  console.log(result ? "✅ รหัสผ่านถูกต้อง" : "❌ รหัสผ่านไม่ถูกต้อง");
});
