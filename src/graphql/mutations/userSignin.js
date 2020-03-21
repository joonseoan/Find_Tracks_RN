import gql from 'graphql-tag';

export default gql`
    mutation LoginUser(
        $email: String!
        $password: String!
    ) {
        loginUser(data: {
            email: $email
            password: $password
        }) {
            id
            email
            token
            dob
        }
    }
`;