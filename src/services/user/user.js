export default class User {   
    constructor(first_name, last_name, email, token) {
       this.profile = {
           first_name,
           last_name,
           email,
       };

       this.token = token;
    }

    setUserProfile = (first_name, last_name, email) => {
        this.profile={
            first_name,
            last_name,
            email,
        };
    }
     
    getUserProfile = () => {
        return this.profile;
    }

    setToken = token => {
        this.token = token;
    }
     
    getToken = () => {
        return this.token;
    }

    getUser = () => {
        return {
            ...this.profile,
            token: this.token
        }
    }

 }