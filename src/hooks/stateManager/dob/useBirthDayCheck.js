import React, { useState } from 'react';

import DobCheckManager from './DobRenderManager';
import inputValidation, { dobConfirmInitialValue } from '../../../utils/inputValidation';
import DOBCheck from '../../../services/calendars/dobCheck';
const dobCheck = new DOBCheck();
dobCheck.setYearRange(40);

export default () => {
  
    // setup year range with MaxAge  
    const [ birthday, setBirthDay ] = useState({
      month: 'MM',
      day: 'DD',
      year: 'YYYY',
      invalidMessage: ''
    });

    const dobKeys = Object.keys(dobConfirmInitialValue);
    
    if(birthday.year !== 'YYYY') {
      dobCheck.setMonths(birthday.year); 
      // dobCheck.setDays(birthday.year, birthday.month); // different scenario
    }

    if(birthday.year !== 'YYYY' && birthday.month !== 'MM') {
      // dobCheck.setMonths(birthday.year); // different scenario
      dobCheck.setDays(birthday.year, birthday.month);
    }

    const handleBirthday = ({ name, value }) => {  
      
      if(birthday.year !== 'YYYY') {
        if(
            name === 'year' &&
            birthday.year !== dobCheck.firstYearNumber &&
            value == dobCheck.firstYearNumber
          ) {
          if(
              birthday.month !=='MM' &&
              birthday.day !== 'DD'
            ) {
                dobCheck.setMothAndDayRange(); 
              if(dobCheck.getMonthRange().indexOf(birthday.month) === -1 &&
                 dobCheck.getDayRange().indexOf(birthday.day) === -1) {
        
                return setBirthDay({
                  ...birthday,
                  year: value,
                  invalidMessage: `${ birthday.month }, ${ birthday.day }th is not valid in ${ value }.` 
                });      
              }
              if(dobCheck.getMonthRange().indexOf(birthday.month) === -1) {
                return setBirthDay({
                  ...birthday,
                  year: value,
                  invalidMessage: `${ birthday.month } is not valid in ${ value }.` 
                });
              }
              if(dobCheck.getDayRange().indexOf(birthday.day) === -1) {
                return setBirthDay({
                  ...birthday,
                  year: value,
                  invalidMessage: `${ birthday.day }th is not valid in ${ name === 'month' ? value : birthday.month }, ${ value }.` 
                });
              }
           } else {
            dobCheck.setMothAndDayRange();
            if(birthday.month !== 'MM') {
              if(dobCheck.getMonthRange().indexOf(birthday.month) === -1) {
                return setBirthDay({
                  ...birthday,
                  year: value,
                  invalidMessage: `${ birthday.month } is not valid in ${ value }.` 
                });
              } 
            }  
  
            // Might not required, but just in case.
            // else if(birthday.day !== 'DD') {
            //   if(dobCheck.getDayRange().indexOf(current.day) === -1) {
            //     return setBirthDay({
            //       ...birthday,
            //       year: value,
            //       invalidMessage: `${ current.day } is not available in ${ value }.` 
            //     });
            //   }
            // }
           }
        }
      }
                  
      if(birthday.day !== 'DD') {
        if(birthday.year == dobCheck.firstYearNumber && 
            name === 'month' && 
            value === dobCheck.month) {        
            dobCheck.setMothAndDayRange();
          if(dobCheck.getDayRange().indexOf(birthday.day) === -1) {
            return setBirthDay({
              ...birthday,
              month: value,
              invalidMessage: `${ birthday.day }th is not valid in ${ dobCheck.month }, ${ dobCheck.firstYearNumber }.` 
            });
          }
        }
      }
      
    // Need to test
      if(birthday.day !== 'DD' && birthday.month !== 'MM' && birthday.year !== 'YYYY') {
        if(name === 'year' || name === 'month') {
          const currentYear = name === 'year' ? value : birthday.year;
          const currentMonth = name === 'month' ? value : birthday.month;
          dobCheck.setDays(currentYear, currentMonth);
          
          if(Number(birthday.day) >  Number(dobCheck.getDayRange()[dobCheck.getDayRange().length - 1])) {
            return setBirthDay({
              ...birthday,
              month: currentMonth,
              year: currentYear,
              invalidMessage: `${ birthday.day }th is not available in ${ name ==='month' ? value : birthday.month }, ${ name === 'year' ? value : birthday.year }.` 
            });
          }
        }
      }
         
      setBirthDay({
        ...birthday,
        [name] : value,
        invalidMessage: ''
      });
    }
      
    const DobAailableCheck = (
      // setAuthUser, 
      setModalState, modalState) => {
      return (
        <DobCheckManager 
           birthday={ birthday }
           dobConfirmInitialValue={ dobConfirmInitialValue }
           validationSchema={ inputValidation(dobKeys) }
           dobKeys={ dobKeys }
          //  setAuthUser={ setAuthUser }
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
        days: dobCheck.getDayRange(),
        years: dobCheck.getYearRange(),
        monthLastIndex: dobCheck.getMonthRange().length - 1,
        dayLastIndex: dobCheck.getDayRange().length -1,
        dobKeys,
    }
}