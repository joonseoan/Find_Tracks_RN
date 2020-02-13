import React from 'react';
import { View, Text, Button } from 'react-native';
// import styled from 'styled-components';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
//  from 'react-native-responsive-screen';

const TrackListScreen = ({ navigation }) => {
    return(
        <View>
            <Button 
                title="Go to TrackDetail Screen"
                onPress={ () =>navigation.navigate('TrackDetail') }
            />
            <Text>TrackListScreen</Text>
        </View>
    )
}

export default TrackListScreen;