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

    const getBase64 = async () => {

        const { files } = state;

        let reader = new FileReader();

        for await (let file of files) {

            reader.readAsDataURL(file);
            reader.onload = () => {
                let archivo = reader.result;
                console.log('llena array');
                data.archivos.push({
                    'archivo': archivo
                })
            };
            reader.onerror = (error) => {
                console.log('Error: ', error);
                return false;
            };

        }

        return true;


    }
    
    const handleUpload = async (e) => {

        const filesToBase64 = await getBase64();

        if( filesToBase64 ){

            setTimeout(() => {
                console.log('ejecuta fetch');
                fetch('http://localhost:4000/api/archivos/cargarArchivo', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify( data )
                });
            }, 1000);

        }

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
