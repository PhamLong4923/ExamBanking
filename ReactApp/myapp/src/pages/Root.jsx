import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './User/Home';
import PBanks from './User/Bank/PBank';
import Profile from './User/Setting/Profile';
import Sections from './User/Bank/Sectionp';
import Qbanks from './User/Bank/Qbankp'

import Repository from './User/Bank/Repositoryp';
import BankSelectp from './User/Exam/BankSelectp';
import BankTypeSelectp from './User/Exam/BankTypeSelectp';
import RepoSelectp from './User/Exam/RepoSelectp';
import ExamConfigp from './User/Exam/ExamConfigp';
import Loginp from './User/Login/Loginp';

const Root = () => (
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<Loginp/>} />

      {/*Question Bank*/}
      
      <Route path="/qbank" element={< Qbanks/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/pbank" element={<PBanks />}/>
      <Route path="/repo" element={<Repository />}/>
      <Route path="/sec/:bid" element={<Sections />}/>

      {/*Exam Create*/}

      <Route path="/exam" element={<BankTypeSelectp />}/>
      <Route path="/exbank" element={<BankSelectp/>}/>
      <Route path="/exrepo" element={<RepoSelectp></RepoSelectp>}></Route>
      <Route path="/exconfig" element={<ExamConfigp></ExamConfigp>}></Route>
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
  </BrowserRouter>

);

export default Root;
