import gql from 'graphql-tag';

export default gql`
  mutation CreateTrack($data: createTrackInput!) {
    createTrack(data: $data) {
      id
      name
      user {
        id
        email
      }
      locations {
        timestamp
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
    }
  }
`;

// export default gql`
//   mutation CreateTrack(
//     $name: String!
//     $timestamp: Int!
//     $latitude: Float!
//     $longitude: Float!
//     $altitude: Float!
//     $accuracy: Float!
//     $heading: Float!
//     $speed: Float!
//     $altitudeAccuracty: Float!
//   ) {
//     createTrack(data: {
//       name: $name
//       locations: [{
//         timestamp: $timestamp
//         coords: {
//           latitude: $latitude
//           longitude: $longitude
//           altitude: $altitude
//           accuracy: $accuracy
//           heading: $heading
//           speed: $speed
//           altitudeAccuracy: $altitudeAccuracty
//         }	
//       }]
//   }) {
//     id
//    	name
//     user {
//       id
//       email
//     }
//     locations {
//       timestamp
//       coords {
//         latitude
//         longitude
//         altitude
//         accuracy
//         heading
//         speed
//         altitudeAccuracy
//       }
//     }
//   }
// }
// `;
