// ดึง Token จาก LocalStorage
const token = localStorage.getItem('token');  // ดึง Token ที่เก็บจากการ login

if (!token) {
  console.log('Token not found! Please log in first.');
  throw new Error('Token not found');
}
// ส่ง Token ผ่าน Authorization header
fetch('http://localhost:8080/api/get_data', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,  // ส่ง Token ใน Authorization header
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));

