import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddCategory = ({ categories, setCategories }) => {

    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if( inputValue.trim().length > 2){
            setCategories([inputValue, ...categories]);
            setInputValue('');
        }
        //También podríamos hacer
        //setCategories( array => [...array, 'Power Rangers']);
    }
    

    return ( 
        <form onSubmit={ handleSubmit }>
            <input
                type="text"
                placeholder="Ingresa una categoria"
                value={ inputValue }
                onChange={ handleInputChange }
            />
        </form>
     );
}

AddCategory.propTypes = {
    setCategories: PropTypes.func.isRequired, 
}

export default AddCategory;