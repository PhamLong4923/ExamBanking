// src/screens/Root.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Thay thế 'Switch' bằng 'Routes'
import HomeScreen from './User/Home';
import PBanks from './User/PBank';
import Profile from './User/Profile';
import Sections from './User/Sections';
import Qbanks from './User/Qbanks'
import Header from '../components/UI/Header';
import Footer from '../components/UI/Footer';
import Repository from './User/Repository';

const Root = () => (
  <BrowserRouter>
    <Header></Header>
    <Routes>

      {/* User Routes */}
      <Route path="/" element={<HomeScreen />} />
      <Route path="/qbank" element={< Qbanks/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/pbank" element={<PBanks />}/>
      <Route path="/repo" element={<Repository />}/>
      <Route path="/sec/:bid" element={<Sections />}/>
      {/* <Route path="/qbank/pbank/:bid" element={<YourNestedComponent/>}/> */}
        
      
      {/* <Route path="/user/create" element={<UserFormScreen />} />
      <Route path="/user/:id" element={<UserFormScreen />} /> */}

      {/* Book Routes
      <Route path="/book/list" element={<BookListScreen />} />
      <Route path="/book/create" element={<BookFormScreen />} />
      <Route path="/book/:id" element={<BookFormScreen />} /> */}

      {/* Manager Routes
      <Route path="/manager/list" element={<ManagerListScreen />} />
      <Route path="/manager/create" element={<ManagerFormScreen />} />
      <Route path="/manager/:id" element={<ManagerFormScreen />} /> */}

    </Routes>
    <Footer></Footer>
  </BrowserRouter>

);

export default Root;
