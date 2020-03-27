import React from 'react';
import styled from 'styled-components';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-navigation';

import Map from '../components/Map';
import trackCreateScreen 
    from '../hooks/stateManager/trackCreateScreen/trackCreateScreen';

const TrackCreateScreen = props => {
    const [ error ] = trackCreateScreen();
    return(
        <SafeAreaView forceInset={{ top: 'always' }}>
            <OuterView>
                <TracKCreateTitleView>
                    <TracKCreateTitleText>
                        TrackCreateScreen
                    </TracKCreateTitleText>
                </TracKCreateTitleView>
                <MapTrackView>
                    <Map />
                </MapTrackView>
                <ErrorView>
                    {/* it is working only in android. ios does return any error message so far. */}
                    { error && <ErrorText>{ error }</ErrorText> }
                </ErrorView>
            </OuterView>
        </SafeAreaView>
    )
}

const OuterView = styled.View`
    flex: 1;
    border-width: 2px;
    border-color: blue;
`;

const TracKCreateTitleView = styled.View`
    background-color: #FFFFFF;
    height: ${ hp('15%') };

    margin-left: ${ wp('2%') };
    justify-content: center;
`;

const TracKCreateTitleText = styled.Text`
    color: #438899;
    font-size: ${wp('7%')};
    font-weight: 700;
    
`; 

const MapTrackView = styled.View`
    height: ${ hp('35%') };
    width: ${ wp('95%') };
    align-self: center;

    border-radius: 20px;
    overflow: hidden;
    border-width: 2px;
    border-color: red;
`;

const ErrorView = styled.View`
    height: ${ hp('2%') };
`;

const ErrorText = styled.Text`
    color: red;
`;

export default TrackCreateScreen;