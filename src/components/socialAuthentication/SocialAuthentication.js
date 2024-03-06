import {StyleSheet, Text, View, Platform} from 'react-native';
import React, {useEffect} from 'react';
import IconButton from '../iconButton/IconButton';
import Fontisto from 'react-native-vector-icons/Fontisto';
import RtlView from '../rtlComponents/RtlView';
import appleAuth, {
  AppleButton,
  AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRealUserStatus,
  AppleAuthCredentialState,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ItemSeperator from '../itemSeperator/ItemSeperator';
import {
  LoginManager,
  Settings,
  Profile,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {Style} from '../../constants';
import {webClientId} from '../../helpers/helper/Config';
import jwt_decode from 'jwt-decode';
const SocialAuthentication = ({tranaferData}) => {
  useEffect(() => {
    configureGoogleSignin?.();

    return () => {};
  }, []);

  //GOOGLE_SIGNIN
  const configureGoogleSignin = async () => {
    // console.log('Called', webClientId);

    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      GoogleSignin.configure({
        webClientId: webClientId,
        offlineAccess: false,
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  const fetchDataFromGoogle = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    console.log('🚀 ~ fetchDataFromGoogle ~ idToken:', idToken);

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  const googleButtonAction = async () => {
    fetchDataFromGoogle?.().then(data => {
      console.log('suu', data);
      let user = {};
      user.name = data?.user?._user?.displayName;
      user.email = data?.user?._user?.email;
      user.photo = data?.user?._user?.photoURL;
      user.auth = {
        id: data?.user?._user?.uid,
        provider: 'google',
      };
      user.fbgoogle = 2;
      user.fcmToken = '';

      tranaferData(user);
    });
  };

  //FACE BOOK
  const getDataFromFacebook = () => {
    Settings.setAppID('310702401623716');
    Settings.initializeSDK();

    LoginManager.logOut();
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(result => {
        if (!result.isCancelled) {
          getFBdata();
        }
      })
      .catch(err => {
        console.log('fb erore', err);
      });
  };
  const getFBdata = () => {
    const infoRequest = new GraphRequest(
      '/me?fields=name,email,picture.height(72).width(72)',
      null,
      _responseInfoCallback,
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  };
  const _responseInfoCallback = (error: ?Object, result: ?Object) => {
    console.log('sdfg', result, error);
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      let user = {};
      user.name = result.name;
      user.email = result.email;
      user.photo = result.picture.data.url;
      user.fbgoogle = 1;
      user.fcmToken = this.state.fcmToken;
      user.auth = {
        id: result.id,
        provider: 'facebook',
      };
      tranaferData(user);
    }
  };

  //APPLE

  const onAppleButtonPress = async () => {
    console.log('appleAuth', appleAuth);
    // 1). start a apple sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // 2). if the request was successful, extract the token and nonce
    console.log(
      'appleAuthRequestResponse',
      appleAuthRequestResponse?.identityToken,
    );
    const {identityToken, nonce} = appleAuthRequestResponse;

    // can be null in some scenarios
    if (appleAuthRequestResponse?.identityToken) {
      var decoded = jwt_decode(appleAuthRequestResponse?.identityToken);
      console.log('decoded', decoded.email);
      let user = {};
      user.name =
        appleAuthRequestResponse.fullName.givenName +
        ' ' +
        appleAuthRequestResponse.fullName.familyName;
      user.email = appleAuthRequestResponse.email
        ? appleAuthRequestResponse.email
        : decoded && decoded.email;
      // user.photo = appleAuthRequestResponse.picture.data.url
      user.fbgoogle = 3;
      // user.fcmToken = this.state.fcmToken
      user.auth = {
        id: appleAuthRequestResponse.id,
        provider: 'apple',
      };
      tranaferData(user);
    } else {
      // handle this - retry?
    }
  };

  return (
    <View>
      <Text
        style={[
          Style.popupTitles,
          {alignSelf: 'center', marginTop: responsiveHeight(3)},
        ]}>
        Connect with
      </Text>

      <RtlView style={styles.container}>
        <IconButton
          onPress={() => {
            // getDataFromFacebook?.();
          }}
          style={{...styles.button, backgroundColor: '#3b5998'}}>
          <Fontisto name="facebook" size={20} color="white" />
        </IconButton>

        <IconButton
          onPress={() => {
            googleButtonAction?.();
          }}
          style={{...styles.button, backgroundColor: '#DD4B39'}}>
          <Fontisto name="google" size={20} color="white" />
        </IconButton>
        {Platform.OS === 'ios' && (
          <IconButton
            onPress={() => {
              onAppleButtonPress?.();
            }}
            style={{...styles.button, backgroundColor: '#000000'}}>
            <Fontisto name="apple" size={20} color="white" />
          </IconButton>
        )}
      </RtlView>
    </View>
  );
};

export default SocialAuthentication;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(90),

    height: responsiveHeight(8),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: responsiveWidth(25),
  },
});
