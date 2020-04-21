import React from 'react';
import styled from 'styled-components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
 from 'react-native-responsive-screen';

import { PageMainButton } from '../../../components/common';

const TrackCreateScreenInputs = ({ 
  startRecording, 
  stopRecording, 
  changeName,
  recording,
  locations,
  name
}) => {

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

export default TrackCreateScreenInputs;