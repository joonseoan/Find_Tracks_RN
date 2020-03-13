export default class Calendar {   
  constructor() {
     const date = new Date();
     
     this.months = [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC' ];
     this.days = [];
     for(let i = 1; i <= 31; i++) {
       this.days.push(i);
     }
     
     this.years = [];

     this.day = date.getDate();
     this.month = this.months[date.getUTCMonth()];
     this.year = date.getFullYear();
  }
   
  getToday = () => {
      return {
          day: this.day,
          month: this.month,
          year: this.year
      }
  }
}