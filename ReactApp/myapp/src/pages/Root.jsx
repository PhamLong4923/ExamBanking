import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './User/Home';
import PBanks from './User/Bank/PBank';
import Profile from './User/Setting/Profile';
import Sections from './User/Bank/Sectionp';
import Qbanks from './User/Bank/Qbankp'
import Header from '../components/UI/Header';
import Footer from '../components/UI/Footer';
import Repository from './User/Bank/Repositoryp';
import BankSelectp from './User/Exam/BankSelectp';
import RepoSelectp from './User/Exam/RepoSelectp';

const Root = () => (
  <BrowserRouter>
    <Header></Header>
    <Routes>

      <Route path="/" element={<HomeScreen />} />

      {/*Question Bank*/}
      
      <Route path="/qbank" element={< Qbanks/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/pbank" element={<PBanks />}/>
      <Route path="/repo" element={<Repository />}/>
      <Route path="/sec/:bid" element={<Sections />}/>

      {/*Exam Create*/}

      <Route path="/exam" element={<BankSelectp />}/>
      <Route path="/expersonalbank" element={<RepoSelectp/>}/>

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
