import React from 'react';
import PropTypes from 'prop-types';

const GifGridItem = ({ id, title, url }) => {

    let widthImg;

    return ( 
        <div className="card">
            <img 
                src={ url } 
                id={id} 
                alt={ title }
                ref={
                    (input) => {                        
                        if (!input) { return; }
                        const img = input;
                        widthImg = img.width;
                    }
                }
            >
            </img>
            <p style={{ maxWidth: `${widthImg}px` }}> { title }</p>
        </div>
    );
}

GifGridItem.propTypes = {
    url:PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}
 
export default GifGridItem;