import React from 'react';
import Sidebar from './Sidebar';
import '../UI/UIStyle/Body.css'

export default function Body({content, picker}) {
    return (

        <>
            <div className='body'>
                <div className='rightside'>
                    <Sidebar picker={picker}></Sidebar>
                </div>
                <div className='leftside'>
                    {content}
                </div>

            </div>
        </>
    );
}

