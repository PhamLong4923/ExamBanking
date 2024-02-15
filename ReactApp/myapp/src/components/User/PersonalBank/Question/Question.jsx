import React from 'react';
import '../Question/Question.css';
import { useState } from 'react';

const Question = ({props}) => {
    const [solutionVisible, setSolutionVisible] = useState(false);

    const toggleSolution = () => {
        setSolutionVisible(!solutionVisible);
    };

   

    return (
        <div className='qitem'>
            <div className='question'>{props.qQuestion}</div>
            <div className='answers'>
                <div className='answer'></div>
                <div className='answer'></div>
                <div className='answer'></div>
                <div className='answer'></div>
            </div>
            <div className={`solution ${solutionVisible ? '' : 'hidden'}`}>kkkkk</div>
            <div className='expand-solution' onClick={toggleSolution}>
                {solutionVisible ? (
                    <>
                        Cách giải
                        <i className="fa-solid fa-caret-down fa-flip-vertical fa-xl"></i>
                    </>
                ) : (
                    <>
                        Cách giải
                        <i className="fa-solid fa-caret-down fa-xl"></i>
                        
                    </>
                )}
            </div>
        </div>
    );
};

export default Question;