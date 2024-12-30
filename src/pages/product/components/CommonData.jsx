import React from 'react';
import Input from '../../../components/input/Input';
import AddColor from './AddColor';

const CommonData = ({commonData, inputCommonData}) => {

    return (
        <div className="common_data">
            <Input 
                label={'название'} 
                type={'text'} 
                value={commonData.name} 
                onChange={(e) => inputCommonData(e, 'name')} 
                onBlur={''}
                placeholder={''} 
                mode={'full'}
            />
            
            <Input 
                label={'объём памяти, ГБ'} 
                type={'text'} 
                value={commonData.memory} 
                onChange={(e) => inputCommonData(e, 'memory')} 
                onBlur={''}
                placeholder={''} 
                mode={'full'}
            />

            <Input 
                label={'цена, $'} 
                type={'text'} 
                value={commonData.price} 
                onChange={(e) => inputCommonData(e, 'price')}
                onBlur={''}
                placeholder={''} 
                mode={'full'}
            />

            <AddColor commonData={commonData} inputCommonData={inputCommonData}/>
        </div>
    );
};

export default CommonData;