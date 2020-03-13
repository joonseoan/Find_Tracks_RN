import gql from 'graphql-tag';

export default gql`
    mutation CreateUser(
        $email: String!
        $password: String!
        $confirmPassword: String!
        $ageCheck: Boolean!
        $dob: String!
    ) {
        createUser(data: {
            email: $email
            password: $password
            confirmPassword: $confirmPassword
            ageCheck: $ageCheck
            dob: $dob
        }) {
            id
            email
            token
            dob
        }
    }
`;