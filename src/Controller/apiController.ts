const fetchData = async () => {
  //* ดึง Token จาก LocalStorage
  const token = localStorage.getItem('token');

  if (!token) {
    console.log('Token not found! Please log in first.');
    return;
  }

  try {
    const response = await fetch('http://localhost:8080/api/get_data', {
      method: 'GET',
      headers: {
        //* ส่ง Token ใน Authorization header
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    //* แสดงข้อมูลที่ได้จาก API
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

export default fetchData;
