import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import styled from 'styled-components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } 
 from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';


const SignupScreen = ({ navigation }) => {
    return(
        <SignupContainer>
            <LinearGradient 
                style={ [styles.signupGroup, {
                    shadowColor: "#000000",
        shadowOffset: {
            width: 5,
            height: 7,
        },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 23
                }] }
                colors={ [ 'rgb(245, 255, 250)', '#F0F8FF', '#00FFFF' ]}
                start={[0.5, 0.8 ]}
                end={[0, 0.1 ]}
            >              
                <Text>Signup</Text>            
            </LinearGradient>
        </SignupContainer>
    );
}

const SignupContainer = styled.View`
    background-color: rgba(255, 255, 0, 0.05);    
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
`;

const styles = StyleSheet.create({
    signupGroup: {
        width: 350,
        height: 600,
        // backgroundColor: 'rgb(245, 255, 250)',
        borderRadius: 15,
        // shadowColor: "#000000",
        // shadowOffset: {
        //     width: 5,
        //     height: 7,
        // },
        // shadowOpacity: 1,
        // shadowRadius: 15,
        // elevation: 17
    }
});

// const SignupGroup = styled.LinearGradient`
//     width: ${ wp('90%') };
//     height: ${ hp('70%') };
//     background-color: rgb(245, 255, 250);
//     border-radius: 30px;
// `;

// const signupShadow = {
//     shadowColor: "#000000",
//     shadowOffset: {
//         width: 5,
//         height: 7,
//     },
//     shadowOpacity: 1,
//     shadowRadius: 15,
//     elevation: 17,
//     width: `${ wp('90%') }`,
//     height: `${ hp('70%') }`,
//     // backgroundColor: 'rgb(245, 255, 250)',
//     borderRadius: 30,
// }

export default SignupScreen;