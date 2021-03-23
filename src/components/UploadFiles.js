import React from 'react'
import {useDropzone} from 'react-dropzone';

export const UploadFiles = (props) => {
    
    const {
        acceptedFiles,
        rejectedFiles,
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: '.xls, .xlsx'
    });

    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
    
    const fileRejectionItems = rejectedFiles.map(({name, size}) => (
        <li key={name}>
            {name} - {size} bytes
        </li>
    ));
    
    return (
        <section className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <em>(Only *.jpeg and *.png images will be accepted)</em>
        </div>
        <aside>
            <h4>Accepted files</h4>
            <ul>{acceptedFileItems}</ul>
            <h4>Rejected files</h4>
            <ul>{fileRejectionItems}</ul>
        </aside>
        </section>
    );
    
}
