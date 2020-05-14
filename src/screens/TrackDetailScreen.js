import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import MapView, { Polyline } from 'react-native-maps';

import useTrackDetail from '../hooks/stateManager/trackDetailScreen/useTrackDetail';

const TrackDetailScreen = ({ navigation }) => {

    const id = navigation.getParam('id');
    const { track } = useTrackDetail(id);
    const initialCoords = track.locations[0].coords;

    return(
        <OuterView>
            <TrackDetailView>
                <TrackDetailTitleText>Track Detail</TrackDetailTitleText>
            </TrackDetailView>
            <TrackNameView>
                <TrackNameText>
                    { track.name }
                </TrackNameText>            
            </TrackNameView>
            <MapTrackView>
                <MapView style={ styles.map }
                    initialRegion={{
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                        ...initialCoords
                      }}
                      // Do not need this.
                    //   region={{
                    //     latitudeDelta: 0.01,
                    //     longitudeDelta: 0.01,
                    //     ...initialCoords
                    //   }}
                >
                    <Polyline coordinates={ track.locations.map(location => location.coords) }/>
                </MapView>
            </MapTrackView>
        </OuterView>
    )
}

TrackDetailScreen.navigationOptions = {
    title: 'Track Detail',
    headerTitleAlign: 'center',
    headerTitleStyle: {
        textTransform: 'uppercase',
        fontWeight: '700',
        textAlign: 'center',
    }
}

const OuterView = styled.View`
    background-color: #FFFFFF;
    flex: 1;
    align-items: center;
`;

const TrackDetailView = styled.View`
    height: ${ hp('15%') };
    margin-left: ${ wp('2%') };
    align-self: flex-start;

    justify-content: center;
`;

const TrackDetailTitleText = styled.Text`
    color: #438899;
    font-size: ${ wp('7%') };
    font-weight: 700;
`;

const TrackNameView = styled.View`
    width: ${ wp('90%') };
    align-items: center;
    margin-bottom: ${ hp('2%') };
`;

const TrackNameText = styled.Text`
    color: #000000;
    font-size: ${ wp('8%') };
    font-weight: 500;
    text-transform: uppercase;
    text-decoration: underline;
`;

const MapTrackView = styled.View`
    height: ${ hp('35%') };
    width: ${ wp('95%') };

    border-radius: 20px;
    overflow: hidden;
    border-width: 2px;
    border-color: red;

`;

const styles = StyleSheet.create({
    map: {
      height: '100%',
    }
});
  
export default TrackDetailScreen;