// screens/Student/List.jsx
import React, { useEffect, useState } from 'react';
import StudentList from '../../components/Account/List/List';
import { fetchData } from '../../services/exapi';
import Footer from '../../components/UI/Footer'
import Header from '../../components/UI/Header'
import Sidebar from '../../components/UI/Sidebar'


const StudentListScreen = () => {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const data = await fetchData('Home'); // Assuming endpoint is 'students'
        setStudentList(data.studentList);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, []);
  // <StudentList studentList={studentList} />

  return (
    <>
      <Header></Header>

      <Sidebar></Sidebar>
      
      <Footer></Footer>
    </>
  )
};

export default StudentListScreen;
