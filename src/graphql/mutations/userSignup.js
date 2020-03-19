import gql from 'graphql-tag';

export default gql`
    mutation CreateUser(
        $email: String!
        $password: String!
        $dob: String!
    ) {
        createUser(data: {
            email: $email
            password: $password
            dob: $dob
        }) {
            id
            email
            token
            dob
        }
    }
`;