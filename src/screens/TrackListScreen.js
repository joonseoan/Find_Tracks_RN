import React from 'react';
import { View, Text, Button } from 'react-native';

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