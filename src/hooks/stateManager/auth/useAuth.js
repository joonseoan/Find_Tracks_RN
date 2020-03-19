import React, { useState } from 'react';
import { View, Text } from 'react-native';

import authInputs from '../../../utils/authInput.json';
import inputValidation, { setInitialValues } from '../../../utils/inputValidation';
import AuthRenderManager from './AuthRenderManager';

const useAuth = () => {

    const [ userInputs, setUserInputs ] = useState({});
    const [ isLogin, setIsLogin ] = useState(false);
    const [ isChecked, setIsChecked ] = useState(false);
    const [ modalState, setModalState ] = useState(false);

    const validationInitialValue = setInitialValues(isLogin);
    const inputKeys = Object.keys(validationInitialValue);

    const validationSchema = inputValidation(inputKeys);

    const authInputList = () => {
        if(isLogin) {
            return authInputs.filter(input => inputKeys.indexOf(input.name) > -1); 
        }
        else {
            return authInputs;
        }
    }

    const handleCheckBox = (values, name) => {        
        setIsChecked(!isChecked);
        values[name] = !isChecked;
    }

    const InputElements = (
            formikProps, input, 
            userInputs, setUserInputs
        ) => (

        <AuthRenderManager 
            formikProps={ formikProps }
            input={ input }
            isChecked={ isChecked }
            handleCheckBox={ handleCheckBox }
            modalState={ modalState }
            setModalState={ setModalState }
            userInputs={ userInputs }
            setUserInputs={ setUserInputs }
        />
    );

    return { 
        InputElements,
        isChecked, setIsLogin, 
        isLogin, inputValidation, validationInitialValue, 
        authInputList, validationSchema,
        handleCheckBox, userInputs, setUserInputs
    };
}

export default useAuth;