import React from 'react';
import Cross from '../../../components/cross/Cross';
import Input from '../../../components/input/Input';

const AddColor = ({commonData, inputCommonData}) => {
    return (
        <div className='add_color_wrapper'>
            <h4>цвет</h4>

            <div className="color_flex">
                <div className="add_color_btn shadow">
                    <Cross />
                </div>

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