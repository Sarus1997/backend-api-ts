import bcrypt from "bcrypt";

const hash: string = "$2b$10$YalUzX5Vc/WluxWYMXZZSuuiaCLRJALcaHE6aX6fxSuuxwf.PYnG.";
const password: string = "hashedpassword123"; //* รหัสผ่านที่ต้องการทดสอบ

bcrypt.compare(password, hash)
  .then((result: boolean) => {
    console.log(result ? "✅ รหัสผ่านถูกต้อง" : "❌ รหัสผ่านไม่ถูกต้อง");
  })
  .catch((err: Error) => {
    console.error("❌ เกิดข้อผิดพลาดในการตรวจสอบรหัสผ่าน", err);
  });
