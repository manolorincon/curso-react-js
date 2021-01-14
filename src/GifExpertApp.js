import React, { Fragment, useState } from 'react';
import AddCategory from './components/AddCategory';
import GifGrid from './components/GifGrid';

const GifExpertApp = () => {

    const [categories, setCategories] = useState(['Dragon Ball Z'])

    // const handleAdds = () => {
    //     setCategories( array => [...array, 'Power Rangers']);
    //     //tambien podríamos usar:
    //     //setCategories( [...categories, 'Power Rangers']);
    // }

    return (
        <Fragment>
            <h1>GifExpertApp</h1>
            <AddCategory
                categories = { categories }
                setCategories = { setCategories }
            />
            <hr />

            <ol>
                {
                    categories.map( category => (
                        <GifGrid
                            key = { category } 
                            category = { category } 
                        />
                    ))
                }
            </ol>

        </Fragment>
     );
}
 
export default GifExpertApp;