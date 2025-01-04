import React from 'react';
import AddColorBtn from './AddColorBtn';
import Input from '../../../components/input/Input';

const AddColor = ({commonData, inputCommonData, errorColor, errorColorName,setError}) => {
    return (
        <div className='add_color_wrapper'>
            <h4>цвет</h4>

            <div className="color_flex">
                <AddColorBtn outColor={commonData.color} setError={setError} error={errorColor}/>

                <Input 
                    error={errorColorName}
                    type={'text'} 
                    value={commonData.colorName} 
                    onChange={(e) => inputCommonData(e, 'colorName')}
                />
            </div>
        </div>
    );
};

export default AddColor;