import React, { useState, useEffect } from 'react';
import GifGridItem from './GifGridItem';

const GifGrid = ({ category }) => {
    
    const [images, setImages] = useState([]);

    useEffect(() => {
        getGifs();
    }, [])

    const getGifs = async () => {

        const apiKey = 'tCq96jGA8jzGmdcugzruM32IZp6GK0Nz';
        const url = `https://api.giphy.com/v1/gifs/search?q=mortal+kombat&limit=20&api_key=${apiKey}`;
        
        const resp = await fetch(url);
        const { data } = await resp.json();

        const gifs = data.map(img => {
            return {
                id: img.id,
                title: img.title,
                url: img.images?.downsized_medium.url
            }
        });

        console.log(gifs)
        setImages(gifs);
    }

    return (
        <>
            <h3>{ category }</h3>
            <div className="card-grid">
                {/* <ol>
                    {
                        images.map( ({ id, title }) => (
                            <li key={ id }>{ title }</li>
                        ))
                    }
                </ol> */}
                {
                    images.map( img => (
                        //Si no están las llaves quiere decir que retornamos implicitamente algo
                        <GifGridItem
                            key = { img.id } 
                            //img = { img }
                            { ...img }
                        />
                    ))
                }
            </div>
        </>
    );
    
}
 
export default GifGrid;