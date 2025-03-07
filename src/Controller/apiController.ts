// apiService.js

const fetchData = async () => {
  const token = localStorage.getItem('token');  // ดึง Token จาก LocalStorage

  if (!token) {
    console.log('Token not found! Please log in first.');
    return;
  }

  try {
    const response = await fetch('http://localhost:8080/api/get_data', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // ส่ง Token ใน Authorization header
      },
    });

    const data = await response.json();
    console.log(data);  // แสดงข้อมูลที่ได้จาก API
  } catch (error) {
    console.error('Error:', error);
  }
};

export default fetchData;
