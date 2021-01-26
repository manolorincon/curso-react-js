import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from 'cloudinary'


cloudinary.config({ 
    cloud_name: 'dlogfultr', 
    api_key: '125594249831436', 
    api_secret: 'V6CNkUnnvIKQ179t4zAmF4gLvBo' 
  });

describe('Pruebas en fileUpload', () => {
    
    test('Debe de cargar un archivo y retornar el URL', async() => {
        
        const resp = await fetch('https://www.ligue1.com/-/media/Project/LFP/Ligue1-COM/Images/Articles-Assests/2020/12/11/Desktop_1920_UK_CDL_Lyon_PSG_Depay_Neymar.jpg');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        //Borrar imagen por ID
        const segments = url.split('/');
        const imageId = segments[ segments.length -1 ].replace('.jpg','');

        await cloudinary.v2.api.delete_resources(imageId);

    })

    test('Debe retornar un error', async() => {
        
        const file = new File([], 'foto.png');
        const url = await fileUpload(file);

        expect(url).toBe(null);

    })
    

})
