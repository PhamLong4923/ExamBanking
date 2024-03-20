import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BankTypep from './User/Bank/BankTypep.jsx';
import Bankp from './User/Bank/Bankp.jsx';
import Sections from './User/Bank/Sectionp';
import HomeScreen from './User/Home';
import Profile from './User/Setting/Profile';

// import AdminRepository from '../../../admin/src/components/UI/Features/repository.jsx';
import Repository from './User/Bank/Repositoryp';
import BankSelectp from './User/Exam/BankSelectp';
import BankTypeSelectp from './User/Exam/BankTypeSelectp';
import ExamConfigp from './User/Exam/ExamConfigp';
import RepoSelectp from './User/Exam/RepoSelectp';
import Loginp from './User/Login/Loginp';
import Signupp from './User/Login/Signupp';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopupCreateModel from '../components/EditPopup/popupcreate.jsx';


const Root = () => (
  <BrowserRouter>
    <Routes>
      {/*Model Create*/}
      <Route path="/popup" element={<PopupCreateModel title={"Thêm ngân hàng"} />} />

      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<Loginp />} />
      <Route path="/signup" element={<Signupp />} />
      <Route path="/profile" element={<Profile />} />

      {/*Question Bank*/}

      <Route path="/qbank" element={< BankTypep />} />
      <Route path="/pbank" element={<Bankp />} />
      <Route path="/repo" element={<Repository />} />
      <Route path="/sec" element={<Sections />} />
      {/* <Route path="/adminrepo" element={<AdminRepository />}></Route> */}

      {/*Exam Create*/}

      <Route path="/exam" element={<BankTypeSelectp />} />
      <Route path="/exbank" element={<BankSelectp />} />
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
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
    />
  </BrowserRouter>

);

export default Root;
