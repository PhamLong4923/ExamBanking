import React from 'react';
import MyEditor from './MyEditor';

const ImportModal = ({ showModal, closeModal, handleEditorDataChange, modalType }) => {
    return (
        <>
            {showModal && (
                <div className="modal-background">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className='header-left'>
                                <div className="header-icon">
                                    {modalType === 'excel' ? (
                                        <i className="fa-solid fa-table fa-2xl"></i>
                                    ) : modalType === 'word' ? (
                                        <i className="fa-regular fa-file-word fa-2xl"></i>
                                    ) : null}
                                </div>
                                <div>
                                    <h5>{modalType === 'excel' ? 'Nhập câu hỏi từ excel' : 'Nhập câu hỏi từ Word'}</h5>
                                    <div className="modal-subtitle">Vui lòng tải lên {modalType === 'excel' ? 'bảng tính excel' : 'Word'} theo mẫu</div>
                                </div>
                            </div>
                            <i className="fa-solid fa-xmark fa-2xl" onClick={closeModal}></i>
                        </div>
                        <div className="modal-body">
                            <MyEditor type={modalType} quesid="" ansid="" onChange={handleEditorDataChange} />
                        </div>
                        <div className="modal-footer">
                            <button>Tải về mẫu</button>
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImportModal;
