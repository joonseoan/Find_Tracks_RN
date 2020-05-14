import gql from 'graphql-tag';

export default gql`
  query FetchTrack {
    fetchTrack {
      id
      name
      locations {
        coords {
          latitude
          longitude
          altitude
          accuracy
          speed
          heading
          altitudeAccuracy
        }
        timestamp
      }
      user {
        id
        email
      }
    }
  }
`;