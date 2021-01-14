import React from 'react';
import useFetchGifs from '../hooks/useFetchGifs';
import GifGridItem from './GifGridItem';

const GifGrid = ({ category }) => {
    
    const {data:images, loading} = useFetchGifs(category);
    
    return (
        <>
            <h3>{ category }</h3>
            { loading && <h3 className="card-grid animate__animated animate__flash">Loading...</h3> }
            <div className="card-grid animate__animated animate__fadeIn">
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