import React, { useContext } from 'react';
import styled from 'styled-components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
 from 'react-native-responsive-screen';

// [ Important : the way of cache update in component level]
// import { graphql } from 'react-apollo';
// import createTracks from '../../../graphql/mutations/trackCreate';
// import fetchTrack from '../../../graphql/queries/getTracks';

import { PageMainButton } from '../../../components/common';

const TrackCreateScreenInputs = ({ 
  startRecording, 
  stopRecording, 
  changeName,
  recording,
  locations,
  name,
  navigation,

  saveTracks,
  mutate,
  reset
}) => {

// [ Important : the way of cache update in component level]
// const TrackCreateScreenInputs = ({ mutate }) => {
  // console.log('data in input ~~~~~~~~~~~~~~~~~~~~`>', mutate)

  return(
    <>
      <TrackTextInput 
        autoCorrect={ false }
        autoCapitalize="none"
        keyboardtype="default"
        value={ name }
        onChangeText={ changeName }
        placeholder="Enter Name"
      />

      <PageMainButton 
        isChecked={ true }
        handleSubmit={ !recording ? startRecording : stopRecording }
      >
        <RecordingButtonText>
           { !recording ? "Start Record" : "Stop" }
        </RecordingButtonText>  
      </PageMainButton>

      {
        // Remind again. Because of React Native Text attributes.
        // some null value must be returned!
       (!recording && locations.length) ? (
          <PageMainButton save
            isChecked={ true }
            handleSubmit={ saveTracks }

            // [ Important : the way of cache update in component level]
            // handleSubmit={ async () => {

            //   const orglocations = locations.map(location => {
            //     const { 
            //       accuracy, altitude, heading, 
            //       latitude, longitude, speed, 
            //       altitudeAccuracy 
            //     } = location.coords;
          
            //     return { 
            //       coords: { 
            //         accuracy,
            //         altitude,
            //         heading,
            //         latitude,
            //         longitude,
            //         speed,
            //         altitudeAccuracy
            //       },
            //       timestamp: location.timestamp !== 10000000 ? "10000000" : location.timestamp.toString()
            //     }
            //   });
              
            //   await mutate({
            //     variables: { data: { name, locations: orglocations }},

            //     *we can use data.refetch() if graphql(query)(componentName) is available.*
            //     refetchQueries: [{ query: fetchTrack }],
            //     awaitRefetchQueries: true
            //   });

            //   reset();

            //   navigation.navigate('TrackList');
  
            // }}
          >
            <RecordingButtonText>
              Save Recording
            </RecordingButtonText>   
          </PageMainButton>
        ) :
        null
      }
    </>
  )
}

const TrackTextInput = styled.TextInput`
  width: ${wp('80%')};
  height: ${hp('5%')};
  padding-horizontal: ${wp('4%')};
  border-width: 1px;
  border-color: grey;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  font-size: ${wp('4%')};
  color: #2F4F4F; 
  font-weight: 500;
`;

const RecordingButtonText = styled.Text`
  font-size: ${ wp('5%') };
  font-weight: 700;
  color: #FFFFFF;
  text-transform: uppercase;
`;

// ****
// [ Important : the way of cache update in component level]
// export default graphql(createTracks)(TrackCreateScreenInputs);
  
export default TrackCreateScreenInputs;