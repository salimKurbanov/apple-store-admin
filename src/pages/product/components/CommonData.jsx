import React from 'react';
import Input from '../../../components/input/Input';
import AddColor from './AddColor';

const CommonData = ({commonData, inputCommonData, error , setError}) => {

    return (
        <div className="common_data">
            <Input 
                error={error.name}
                label={'название'} 
                type={'text'} 
                value={commonData.name} 
                onChange={(e) => inputCommonData(e, 'name')} 
                onBlur={''}
                placeholder={''} 
                mode={'full'}
            />
            
            <Input 
                error={error.memory}
                label={'объём памяти, ГБ'} 
                type={'text'} 
                value={commonData.memory} 
                onChange={(e) => inputCommonData(e, 'memory')} 
                onBlur={''}
                placeholder={''} 
                mode={'full'}
            />

            <Input 
                error={error.price}
                label={'цена, $'} 
                type={'text'} 
                value={commonData.price} 
                onChange={(e) => inputCommonData(e, 'price')}
                onBlur={''}
                placeholder={''} 
                mode={'full'}
            />

            <AddColor setError={setError} errorColor={error.color} errorColorName={error.colorName} commonData={commonData} inputCommonData={inputCommonData}/>
        </div>
    );
};

export default CommonData;