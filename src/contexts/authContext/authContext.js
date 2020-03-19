import createDataContext from '../createDataContext';
import apolloClient from '../../graphql';
import userSignup from '../../graphql/mutations/userSignup';

const authReducer = (state, action) => {
  switch(action.type) {
    case 'SIGNUP':
      console.log('action.payload: ', action.payload);
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const signup = dispatch => {
  return async userInputs => {
    try {

      const { data } = await apolloClient.mutate({
        mutation: userSignup,
        variables: userInputs
      })

      if(data) {
        throw new Error('Unable to post your signup data.');
      }

      dispatch({ type: 'SIGNUP', payload: data.createUser });

    } catch(e) {
      throw new Error(e);
    }
  }
}

const signin = dispatch => {
  return async userInputs => {
    try {

      const { data } = await apolloClient.mutate({
        // mutation: userSignup,
        variables: userInputs
      })

      if(data) {
        throw new Error('Unable to post your signup data.');
      }

      dispatch({ type: 'SIGNUP', payload: data.createUser });

    } catch(e) {
      throw new Error(e);
    }
  }
}

const signout = dispatch => {
  return;
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup },
  { isSignedIn: false }
);