import React from 'react';
import '../UI/UIStyle/Page.css'
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';


export default function Page() {
    return (

        <div>
            <Header></Header>

            <div className='body'>
                <Sidebar></Sidebar>
                
            </div>

            <Footer></Footer>

        </div>

    );
}
