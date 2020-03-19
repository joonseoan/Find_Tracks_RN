import React, { useState } from 'react';

import DobRenderManager from './DobRenderManager';
// import inputValidation, { dobConfirmInitialValue } from '../../../utils/inputValidation';
import dobHandler from './dobHandler';
import DOBCheck from '../../../services/calendars/dobCheck';
const dobCheck = new DOBCheck();
dobCheck.setYearRange(40);

export default () => {
    
    const [ birthday, setBirthDay ] = useState({
      month: 'MM',
      day: 'DD',
      year: 'YYYY',
      invalidMessage: ''
    });

    const [ dobConfirm, setDobConfirm ] = useState(false);

    if(birthday.year !== 'YYYY') {
      dobCheck.setMonths(birthday.year); 
      // dobCheck.setDays(birthday.year, birthday.month); // different scenario
    }

    if(birthday.year !== 'YYYY' && birthday.month !== 'MM') {
      // dobCheck.setMonths(birthday.year); // different scenario
      dobCheck.setDays(birthday.year, birthday.month);
    }

    const handleBirthday = ({ name, value }) => {
      dobHandler(name, value, dobCheck, birthday, setBirthDay);
    }
      
    const DobAailableCheck = (
      userInputs, setUserInputs, 
      setModalState, modalState
    ) => {
      return (
        <DobRenderManager
          userInputs={ userInputs }
          setUserInputs={ setUserInputs } 
          birthday={ birthday }
          dobConfirm={ dobConfirm }
          setDobConfirm={ setDobConfirm }
          // setAuthUser={ setAuthUser }
          setModalState={ setModalState }
          modalState={ modalState }
        />
      )
    }

    return { 
        DobAailableCheck,
        birthday, 
        handleBirthday,
        months: dobCheck.months,
        days: dobCheck.days,
        years: dobCheck.getYearRange(),
        monthLastIndex: dobCheck.getMonthRange().length - 1,
        dayLastIndex: dobCheck.getDayRange().length -1
    }
}