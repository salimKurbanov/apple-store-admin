import React from 'react';
import Input from '../../../components/input/Input';
import AddColorBtn from './AddColorBtn';

const AddColor = ({commonData, inputCommonData}) => {

    return (
        <div className='add_color_wrapper'>
            <h4>цвет</h4>

            <div className="color_flex">
                <AddColorBtn />

                <Input 
                    label={''} 
                    type={'text'} 
                    value={commonData.colorName} 
                    onChange={(e) => inputCommonData(e, 'colorName')}
                    onBlur={''}
                    placeholder={''} 
                    mode={''}
                />
            </div>
        </div>
    );
};

export default AddColor;