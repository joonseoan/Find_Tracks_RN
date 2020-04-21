import * as Yup from 'yup';

export const setInitialValues = isLogin => {
    const initialValues = {
        email: '',
        password: ''
    };

    if(!isLogin) {
        return {
            ...initialValues,
            confirmPassword: '',
            dob: ''
        }
    }

    return initialValues;
}

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
        .oneOf([ Yup.ref('password'), null ], 'Password must be identical.')
        .trim('Please remove space.'),
    dob: Yup.string()
        .required('Please, enter your birthday.'),
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
