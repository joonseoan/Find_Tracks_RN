import Calendar from './calendar';

// TODO: 
// Feb Control Feb 29 ---> Feb 28 in some year ---> invalid message
// In this year every month March 31 ===> Feb ---> In valid message
// Every month
// Little performance issue

export default class DOBCheck extends Calendar {
    constructor() {
      super();
      this.minAge = 13;
      this.maxAge;
      this.firstYearNumber;
      this.lastMonth;
      this.monthRange=[];
      this.dayRange=[];
    }
  
    setYearRange = maxAge => {
      this.maxAge = maxAge;
      this.firstYearNumber = this.year - this.minAge;
      const lastYearNumber = this.firstYearNumber - (this.maxAge - this.minAge);
  
      for(let i = this.firstYearNumber; i > lastYearNumber ; i--) {
        // this.years = yearRange
        this.years.push(i);
      }
    }
  
    setDays = (year, month) => {
      if(this.firstYearNumber == year && 
          this.month == month.toString()) {
            const index = this.days.findIndex(day => (day == this.day));
            this.dayRange = this.days.slice(0, (index));      
      } else {
        // FOR NUMBER OF DAYS
        this.dayRange=[];
        const index = this.months.findIndex(birthdyMonth => birthdyMonth == month);
        const monthlyDays = new Date(year, index + 1, 0).getDate()
        for(let i = 1; i <= monthlyDays ; i ++) {
          this.dayRange.push(i)
        }
      } 
    }
  
    setMonths = year => {
      if(this.firstYearNumber === year) {
        const index = this.months.findIndex(month => (month === this.month));
        this.monthRange = this.months.slice(0, (index + 1));
      } else {
        this.monthRange = this.months;
      }
    }

    setMothAndDayRange = () => {
      let index = this.months.findIndex(month => (month === this.month));
      this.monthRange = this.months.slice(0, (index + 1));
      index = this.days.findIndex(day => (day === this.day));
      this.dayRange = this.days.slice(0, (index));   
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
