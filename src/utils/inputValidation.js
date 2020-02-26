import * as Yup from 'yup';

export const authValidationSchema = Yup.object().shape({
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
});