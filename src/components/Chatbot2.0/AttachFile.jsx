import React, { useContext, useState } from 'react';
import './AttachFile.css';
import axios from 'axios';
import { GlobalContext } from 'GlobalContext';

const AttachFile = ({ triggerNextStep }) => {
    const [excelFile, setExcelFile] = useState(null);
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(false); 
    const {setFile} = useContext(GlobalContext)

    const onDetach = () => {
        setExcelFile(null);
        setActive(true);
        setFile(null);
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.value = '';
    }
    };

    const onFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validTypes = [
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
                'text/csv' 
            ];
    
            if (validTypes.includes(file.type)) {
                if (file.size <= 5 * 1024 * 1024) {
                    setExcelFile(file);
                    setFile(file);
                } else {
                    alert('File size exceeds 5MB.');
                    setExcelFile(null);
                }
            } else {
                alert('Invalid file type. Please upload an Excel (.xlsx) or CSV (.csv) file.');
                setExcelFile(null);
            }
        }
    };

    const onClick = () => {
        document.getElementById('fileInput').click();
    };

    const onSubmit = async () => {
        if (!excelFile) {
            alert('No file attached');
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('file', excelFile);
        
        try {
            const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setActive(false);
            setLoading(false);
            triggerNextStep({value: response.data.message , trigger: '13'})
        } 
        catch (error) {
            console.error(error);
            alert('File upload failed. Please try again.');
            setLoading(false);
            return;
        }

    };
    

    const renderPreview = () => {
        if (!excelFile) return null;

        return (
            <div className="file-preview">
                <span className="excel-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-file-text"
                    >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <line x1="10" y1="9" x2="8" y2="9"></line>
                    </svg>
                </span>
                <span className="file-name">{excelFile.name}</span>
            </div>
        );
    };


    return (
        <>
        {active ? (
        <div className="modal">
            <div className="modal-body">
                {excelFile ? (
                    <button className="upload-area" style={{height: '70px'}}>
                        {renderPreview()}
                    </button>
                ) : (
                    <button className="upload-area" onClick={onClick}>
                        <span className="upload-area-icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="35"
                                viewBox="0 0 340.531 419.116"
                            >
                                <g id="files-new">
                                    <path
                                        id="Union_2"
                                        d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z"
                                        transform="translate(2944 428)"
                                        fill="var(--c-action-primary)"
                                    ></path>
                                </g>
                            </svg>
                        </span>
                        <span className="upload-area-title">
                            Upload Your Excel File
                        </span>
                    </button>
                )}
                <input
                    id="fileInput"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={onFileUpload}
                />
            </div>
            {loading ? (
                <div className="loader"></div>
            ) : (
            <div className="modal-footer">
                <button className="btn-secondary" onClick={onDetach}>
                    Detach File
                </button>
                <button className="btn-primary" onClick={onSubmit}>
                    Upload File
                </button>
            </div>
            )}
        </div>
        ) : (
        <div className="file-preview-container">
            {renderPreview()}
        </div>
        )}
        </>
    );
};

export default AttachFile;
