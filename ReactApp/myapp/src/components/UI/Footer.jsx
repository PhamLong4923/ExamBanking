import React from 'react';
import '../UI/UIStyle/Footer.css'


export default function Footer() {
  return (

    <>
      <footer className='footer'>
        <div className='websitelogo'>
          <img className='logo' src="/EBLogo.png" alt="Exam Banking Logo" />
          <div className='websitename'>
            <h2>EXAM BANKING</h2>
          </div>
        </div>


        <div className='creator'>
          <h3>Tác giả</h3>
          <span><p className="font-bold underline"><i className="fa-solid fa-code"></i> Phạm Hoàng Long</p></span>
          <span><p><i className="fa-solid fa-code"></i> Nguyễn Hoàng Việt</p></span>
          <span><p><i className="fa-solid fa-code"></i> Lê Quang Trung</p></span>
        </div>

        <div className='contact'>
          <h3>Liên hệ</h3>
          <span><p><i className="fa-solid fa-envelope"></i> example@email.com</p></span>
          <span><p><i className="fa-solid fa-phone"></i> 0888123889</p></span>
        </div>

      </footer>
    </>
  );
}