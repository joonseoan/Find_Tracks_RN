import React, { useState, useRef } from 'react';

import BirthDayCheck from '../../services/calendars/birthdayCheck';
import BirthdayCheck from '../../services/calendars/birthdayCheck';
const birthdayCheck = new BirthDayCheck();
birthdayCheck.setYearRange(60);

export default () => {
  
    // setup year range with MaxAge  
    const [ birthday, setBirthDay ] = useState({
      month: 'MM',
      day: 'DD',
      year: 'YYYY'
    });

    const prevBirthday = useRef();

    // When using useEffect
    // useEffect(() => {

    //   const nextBirthday = birthday;
    //   if(prevBirthday.current) {
    //     const { current } = prevBirthday;
    //     if(!isNaN(current.year) &&
    //       current.year !== birthdayCheck.firstYearNumber && 
    //       nextBirthday.year == birthdayCheck.firstYearNumber) {
    //         if(current.month !== 'MM' && current.day !== 'DD') {
    //           if(birthdayCheck.getMonthRange().indexOf(current.month) === -1 &&
    //           birthdayCheck.getDayRange().indexOf(current.day) === -1) {
    //             setBirthDay({
    //               ...birthday,
    //               month: 'MM',
    //               day: 'DD'
    //             });
    //           }
    //         } else {
    //           if(current.month !== 'MM') {
    //             if(birthdayCheck.getMonthRange().indexOf(current.month) === -1) {
    //               setBirthDay({
    //                 ...birthday,
    //                 month: 'MM'
    //               });
    //             } 
    //           } else if(current.day !== 'DD') {
    //               if(birthdayCheck.getDayRange().indexOf(current.day) === -1) {
    //                 setBirthDay({
    //                   ...birthday,
    //                   day: 'DD'
    //                 });
    //               }
    //             }

    //           }
    //     }
    //   }    
    //   prevBirthday.current = birthday;
    // });
    
    // birthdayCheck.setMonths(birthday.year === 'YYYY' ? 
    // birthdayCheck.firstYearNumber : 
    // birthday.year);

    birthday.year === 'YYYY' && birthdayCheck.setMonths(birthdayCheck.firstYearNumber);
    
    const handleBirthday = ({ name, value }) => {
      
      if(name === 'year') {
        birthdayCheck.setMonths(value);
      }

      prevBirthday.current = birthday;
      const { current } = prevBirthday;
        if(!isNaN(current.year) &&
          current.year !== birthdayCheck.firstYearNumber && 
          name == 'year' &&
          value ==  birthdayCheck.firstYearNumber) {
            if(current.month !== 'MM' && current.day !== 'DD') {
              if(birthdayCheck.getMonthRange().indexOf(current.month) === -1 &&
              birthdayCheck.getDayRange().indexOf(current.day) === -1) {
                return setBirthDay({
                  ...birthday,
                  month: 'MM',
                  day: 'DD',
                  year: value
                });
              }
              if(birthdayCheck.getMonthRange().indexOf(current.month) === -1) {
                return setBirthDay({
                  ...birthday,
                  month: 'MM',
                  year: value
                });
              }
              if(birthdayCheck.getDayRange().indexOf(current.day) === -1) {
                return setBirthDay({
                  ...birthday,
                  day: 'DD',
                  year: value
                });
              }
            } else {
              if(current.month !== 'MM') {
                if(birthdayCheck.getMonthRange().indexOf(current.month) === -1) {
                  return setBirthDay({
                    ...birthday,
                    month: 'MM',
                    year: value
                  });
                } 
              } else if(current.day !== 'DD') {
                  if(birthdayCheck.getDayRange().indexOf(current.day) === -1) {
                    return setBirthDay({
                      ...birthday,
                      day: 'DD',
                      year: value
                    });
                  }
                }

              }
        }
        
        setBirthDay({
          ...birthday,
          [name] : value
        });
    }
  
    return { 
        birthday, 
        handleBirthday,
        months: birthdayCheck.months,
        days: birthdayCheck.days,
        years: birthdayCheck.getYearRange(),
        monthLastIndex: birthdayCheck.getMonthRange().length - 1,
        dayLastIndex: birthdayCheck.getDayRange().length - 1,
    }
}