import gql from 'graphql-tag';

export default gql`
    mutation CreateUser(
        $email: String!
        $password: String!
        $confirmPassword: String!
        $ageCheck: Boolean!
    ) {
        createUser(data: {
            email: $email
            password: $password
            confirmPassword: $confirmPassword
            ageCheck: $ageCheck
        }) {
            id
            email
            token
        }
    }
`;