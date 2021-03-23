import React, { useEffect, useState } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'


export const FilesUpload = () => {

    const initialState = {
        files: []
    };

    const [state, setState] = useState(initialState)

    const handleChange = (files) => {
        setState({
            files
        });
    }
    
    const handleUpload = (e) => {
        e.preventDefault();
        console.log(e);
        const { files } = state
        let formData = new FormData();

        for (let i = 0; i < files.length; i++) {
             let file = files[i];
             console.log(files[i]);
             formData.append('archivo', files[i]);
             console.log(formData);
        }
    }

    useEffect(() => {
        console.log(state);
    }, [state])
      
    return (
        <div>
            <DropzoneArea
                acceptedFiles={['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                dropzoneText='Por favor arrastre un archivo, o haga click acá'
                maxFileSize={5000000}
                onChange={ (files) => { handleChange(files) } }
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
