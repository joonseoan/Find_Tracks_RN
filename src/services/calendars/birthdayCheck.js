import Calendar from './calendar';

export default class BirthdayCheck extends Calendar {
    constructor() {
      super();
      this.minAge = 13;
      this.maxAge;
      this.firstYearNumber;
      this.selectedYear;
      this.monthRange=[];
      this.dayRange=[];
    }
  
    setYearRange = (maxAge) => {
      this.maxAge = maxAge;
      this.firstYearNumber = this.year - this.minAge;
      const lastYearNumber = this.firstYearNumber - (this.maxAge - this.minAge);
  
      for(let i =  this.firstYearNumber; i > lastYearNumber ; i--) {
        this.years.push(i);
      }
    }
  
    setDays = year => {
      if(this.firstYearNumber === year) {
        const index = this.days.findIndex(day => (day === this.day));
        this.dayRange = this.days.slice(0, (index));
      } else {
        this.dayRange = this.days;
      }
    }
  
    setMonths = year => {
      this.selectedYear = year;
      
      if(this.firstYearNumber === year) {
        const index = this.months.findIndex(month => (month === this.month));
        
        this.monthRange = this.months.slice(0, (index + 1));
      } else {
        this.monthRange = this.months;
      }
      this.setDays(year);
    }
  
    getYearRange = () => {
      return this.years;
    }
  
    getMonthRange = () => {
      return this.monthRange;
    }
  
    getDayRange = () => {
      return this.dayRange;
    }
    
  } 