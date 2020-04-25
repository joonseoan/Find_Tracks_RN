import gql from 'graphql-tag';


export default gql`
    mutation CreateTrack(
        $data: {
          $name: String!
          $locations: [createPointInput: {
            latitude: Float!
        longitude: Float!
        altitude: Float!
        accuracy: Float!
        heading: Float!
        speed: Float!
        altitudeAccuracy: Float
          }]!
        }
    ) {
        createTrack(data: $data) {
          id
          locations {
            coords {
              latitude
              longitude
              altitude
              accuracy
              heading
              speed
              altitudeAccuracy
            }
          }
          name
          user {
            email
            id
            dob
          }
        }
    }
`;

// export default gql`
//     mutation CreateTrack(
//         $name: String!
//         $timestamp: String!
//         $latitude: Float! 
//         $longitude: Float!
//         $altitude: Float!
//         $accuracy: Float! 
//         $heading: Float! 
//         $speed: Float! 
//         $altitudeAccuracy: Float!
//     ) {
//         createTrack(data: {
//           name: $name
//           locations: [{
//             timestamp: $timestamp
//             coords: {
//               latitude: $latitude
//               longitude: $longitude
//               altitude: $altitude
//               accuracy: $accuracy
//               heading: $heading
//               speed: $speed
//               altitudeAccuracy: $altitudeAccuracy
//             }
//           }]
//         }) {
//           id
//           locations {
//             coords {
//               latitude
//               longitude
//               altitude
//               accuracy
//               heading
//               speed
//               altitudeAccuracy
//             }
//           }
//           name
//           user {
//             email
//             id
//             dob
//           }
//         }
//     }
// `;