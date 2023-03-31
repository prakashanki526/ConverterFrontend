import React, { useState} from 'react';
import styles from './Home.module.css';
import { useCSVReader } from 'react-papaparse';
import { jsPDF } from "jspdf";
import downLoadIcon from '../../assets/download-fill.svg';
import uploadIcon from '../../assets/upload-fill.svg';

const Home = () => {
    const { CSVReader } = useCSVReader();
    
    const [file, setFile] = useState(null);

    function handleFileLoad(data){
        setFile(data);
    }


    function handleDownload(){
        if(!file){
            return;
        }
        
        const jsonData = file.data;
        
        var pdf2 = new jsPDF();
        let pageHeight= 142;
        pdf2.setFontSize(12);
        var i = 1;
        var row = 1;
        for(let data in jsonData){
            var j = 1;
            if(typeof(jsonData[data]) === 'object' && jsonData[data] !== null){
                for(let innerData in jsonData[data])
                {
                    // pdf2.text(data, 10, 20 + (row*10));
                    if(jsonData[data][innerData] !== undefined){
                        // row = row+1;
                        // pdf2.text(innerData, 10, 20 + (row*10));

                        row = row+1;
                        if(row >= pageHeight){
                            pdf2.addPage();
                            row = 1;
                        }
                        pdf2.text(jsonData[data][innerData], 10, 10 + (row*2));
                        j=j+1;
                    }
                    row = row+2;
                }
                row = row+1;
            }
            row=row+1;
            i = i+1;
        }
        pdf2.save('converted.pdf');

    }


    return (
        <div className={styles.home}>
            <h1 className={styles.title}>Convert CSV to PDF</h1>
            {/* <div className={styles.inputContainer}> */}
                <CSVReader
                onUploadAccepted={handleFileLoad}
                >
                {({
                    getRootProps,
                    acceptedFile,
                    ProgressBar,
                    getRemoveFileProps,
                }) => (
                    <div className={styles.inputContainer}>
                        <div className={styles.csvReader}>
                            <div style={styles.acceptedFile} className={styles.fileName}>
                            {acceptedFile && acceptedFile.name}
                            </div>
                            <button type='button' {...getRootProps()} style={styles.browseFile} className={styles.browseBtn}>
                            Browse file <img src={uploadIcon} alt=""></img>
                            </button>
                            {/* {acceptedFile && <button {...getRemoveFileProps()} ref={buttonRef} className={styles.remove}>
                            Remove
                            </button>} */}
                        </div>
                        <ProgressBar style={styles.progressBarBackgroundColor} className={styles.progressBar} />
                    </div>
                )}
                </CSVReader>

                {file && <div className={styles.downloadBtn} onClick={handleDownload}>Download PDF <img src={downLoadIcon} alt=""></img></div>}

            {/* </div> */}

            {/* <div className={styles.container}>
                {fileList.map((file,index)=>{
                    return (
                        <DisplayTab key={index} filedata={file} />
                    )
                })}
            </div> */}
        </div>
    );
};

export default Home;