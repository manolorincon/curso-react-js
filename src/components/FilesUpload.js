import React, { useState } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'


export const FilesUpload = () => {

    const initialState = {
        files: []
    };

    let data = {
        archivos: []
    }

    const [state, setState] = useState(initialState)

    const handleChange = (files) => {
        setState({
            files
        });
    }

    const fileListToBase64 = async ( files ) => {
       
        const promises = []

        const getBase64File = (file) => {
            return new Promise(resolve => {
                const reader = new FileReader()
                reader.onload = () => {
                    let archivo = reader.result;
                    console.log('llena array');
                    resolve (data.archivos.push({
                        'archivo': archivo
                    }))
                };
                reader.readAsDataURL(file)
            })
        }

        for (let i = 0; i < files.length; i++) {
            promises.push(getBase64File(files[i]))
        }

        return await Promise.all(promises)

    }
    
    const handleUpload = async (e) => {

        
        const { files } = state;
        
        data = {
            archivos: []
        }
        
        await fileListToBase64(files);

        const resp = await fetch('http://localhost:4000/api/archivos/cargarArchivo', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });

        const texto = await resp.json()

        console.log(texto);


    }

    return (
        <div>
            <DropzoneArea
                acceptedFiles={['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                dropzoneText='Por favor arrastre un archivo, o haga click acá'
                maxFileSize={5000000}
                onChange={ (files) => { console.log(files); handleChange(files) } }
                previewGridProps={{container: { spacing: 1, direction: 'row' }}}
                previewText="Archivos Seleccionados"
                showPreviews={true}
                showPreviewsInDropzone={false}
                useChipsForPreview
            />
            
            <button id='upload-files' onClick={ handleUpload }>Cargar</button>
            
        </div>
        
    )
    
}
