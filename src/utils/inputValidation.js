import * as Yup from 'yup';

const validationElements = {
    email: Yup.string()
        .required('Please, enter your email.')
        .email('Please, enter full email address.')
        .trim('Please remove space.'),
    password: Yup.string()
        .required('Please, enter a password.')
        .min(4, 'Please, enter greater than 4 letters.')
        .trim('Please remove space.'),
    confirmPassword: Yup.string()
        .required('Please, enter a confirmming password.')
        .oneOf([ Yup.ref('password'), null ], 'Password must be identical')
        .trim('Please remove space.'),
    ageCheck: Yup.bool()
        .oneOf([true], 'Must confirm your age.'),
}

const keyFilters = validationKeys => {
    return validationKeys.map(key => {
        return { [ key ]: validationElements[key] };
    });
}

export default validationKeys => {
    let validations = {};
    keyFilters(validationKeys).forEach(validation => {
        validations = { ...validations, ...validation }
    });

    return Yup.object().shape(validations);
}  
 














// const moment = require('moment');

// const maxDateforDob = new Date();
// maxDateforDob.setFullYear(maxDateforDob.getFullYear() - 13);

// const checkAge = ({ parent }) => {
//   const dob = moment(`${parent.month}-${parent.day}-${parent.year}`, 'MM-DD-YYYY');
//   const now = moment(new Date(), 'MM-DD-YYYY');
//   const duration = moment.duration(now.diff(dob));
//   const years = duration.asYears();
//   if (years < 13) {
//     return false;
//   }
//   return true;
// };

// const updatePasswordValidations = [
//   {
//     email: Yup.string()
//       .required('Must enter your email address')
//       .email('Must enter valid email address.')      
//       .trim('Delete a white space.'),
//   },
// ];

// const resetPasswordValidations = [
//   {
//     password: Yup.string()
//       .required('Must enter your signup password')
//       .min(6, 'Must be at least 6 letters') // later on combination
//       .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Must contain 1 uppercase, 1 lowercase, 1 number & 1 special character')
//       .trim('Delete a white space'),
//   },
//   {
//     confirm_password: Yup.string()
//       .required('Must enter the password again')
//       .oneOf([Yup.ref('password'), null], 'Passwords must match')
//       .trim('Delete a white space'),
//   },
// ];

// const changePasswordValidations = [
//   {
//     old_password: Yup.string()
//       .required('Must enter your old password')
//       .min(6, 'Must be at least 6 letters') // later on combination
//       .trim('Delete a white space'),
//   },
//   {
//     new_password: Yup.string()
//       .required('Must enter your new password')
//       .min(6, 'Must be at least 6 letters') // later on combination
//       .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Must contain 1 uppercase, 1 lowercase, 1 number & 1 special character')
//       .trim('Delete a white space'),
//   },
// ];

// const loginValidations = [
//   {
//     email_or_phone: Yup.bool()
//       .required('Must enter your email address or mobile number')
//       .oneOf([true], 'Must enter valid email address or mobile number'),
//   },
//   {
//     password: Yup.string()
//       .required('Must enter your login password')
//       .min(6, 'Must be at least 6 letters') // later on combination
//       .trim('Delete a white space'),
//   },
// ];

// const validations = [
//   {
//     first_name: Yup.string()
//       .required('Must enter your name')
//       .matches(/[a-zA-Z]/, 'Must use alphabetic letters')
//       .trim('Delete a white space'),
//   },
//   {
//     last_name: Yup.string()
//       .required('Must enter your name')
//       .matches(/[a-zA-Z]/, 'Must use alphabetic letters')
//       .trim('Delete a white space'),
//   },
//   {
//     email_or_phone: Yup.bool()
//       .required('Must enter your email address or mobile number')
//       .oneOf([true], 'Must enter valid email or mobile number'),
//   },
//   {
//     password: Yup.string()
//       .required('Must enter your signup password')
//       .min(6, 'Must be at least 6 letters') // later on combination
//       .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Must contain 1 uppercase, 1 lowercase, 1 number & 1 special character')
//       .trim('Delete a white space'),
//   },
//   {
//     confirm_password: Yup.string()
//       .required('Must enter the password again')
//       .oneOf([Yup.ref('password'), null], 'Passwords must match')
//       .trim('Delete a white space'),
//   },
//   {
//     month: Yup.string()
//       .test(
//         'oneOfRequired',
//         'Must enter the birthdate',
//         function () {
//           return (this.parent.month && this.parent.year && this.parent.day);
//         },
//       )
//       .test(
//         'shouldBeOlder',
//         'Must be older than 13 years',
//         function () { return checkAge(this); },
//       ),
//   },
//   {
//     day: Yup.string()
//       .test(
//         'oneOfRequired',
//         'Must enter the birthdate',
//         function () {
//           return (this.parent.month && this.parent.year && this.parent.day);
//         },
//       )
//       .test(
//         'shouldBeOlder',
//         'Must be older than 13 years',
//         function () { return checkAge(this); },
//       ),
//   },
//   {
//     year: Yup.string()
//       .test(
//         'oneOfRequired',
//         'Must enter the birthdate',
//         function () {
//           return (this.parent.month && this.parent.year && this.parent.day);
//         },
//       )
//       .test(
//         'shouldBeOlder',
//         'Must be older than 13 years',
//         function () { return checkAge(this); },
//       ),
//   },
//   {
//     terms_and_condition: Yup.bool()
//       .oneOf([true], 'Must read terms and conditon and check the checkbox')
//       .required('Please agree the Terms and Condition'),
//   },
// ];

// export const authInputValidations = (validationType) => Yup.object().shape(getAuthInputValidations(validationType));

// const getAuthInputValidations = (validationType) => {
//   switch (validationType) {
//     case 'login':
//       let loginValidation = {};
//       loginValidations.forEach((validation) => {
//         loginValidation = { ...loginValidation, ...validation };
//       });

//       return loginValidation;
//     case 'signUp':
//       let signupValidation = {};
//       validations.forEach((validation) => {
//         signupValidation = { ...signupValidation, ...validation };
//       });

//       return signupValidation;

//     case 'updatePasswordByEmail':
//       let updatePasswordByEmail = {};
//       updatePasswordValidations.forEach((validation) => {
//         updatePasswordByEmail = { ...updatePasswordByEmail, ...validation };
//       });

//       return updatePasswordByEmail;

//     case 'resetPassword':
//       let resetPassword = {};
//       resetPasswordValidations.forEach((validation) => {
//         resetPassword = { ...resetPassword, ...validation };
//       });

//       return resetPassword;

//     case 'changePassword':
//       let changePassword = {};
//       changePasswordValidations.forEach((validation) => {
//         changePassword = { ...changePassword, ...validation };
//       });

//       return changePassword;
//     default:
//       break;
//   }
// };





