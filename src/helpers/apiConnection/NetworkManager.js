// import axios from 'axios';
// import {useSelector, useDispatch} from 'react-redux';

// function select(state) {
//   return state.userLogin && state.userLogin.user != null
//     ? state.userLogin.user.sessionToken
//     : null;
// }

// export default function request(type, url, params) {
//   const {userDetails} = useSelector(state => state.user);
//   // let locale = store.getState().userLogin.locale
//   //   let token = select(store.getState());
//   let token = '';
//   axios.defaults.headers.common['sessiontoken'] = token;
//   // axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
//   axios.defaults.headers.common['Content-Type'] = 'application/json';
//   switch (type) {
//     case 'get':
//       return axios
//         .get(url, {params: {...params, language: locale == 'ar' ? 1 : 2}})
//         .then(function (response) {
//           console.log('Get Response', response);
//           return response.data;
//         })
//         .catch(function (error) {
//           console.log('Error', error);
//           console.log('Response', error.response);
//           return error.response.data;
//         });
//       break;
//     case 'post':
//       return axios
//         .post(url, params)
//         .then(function (response) {
//           console.log('Post Response', response);
//           return response.data;
//         })
//         .catch(function (error) {
//           console.log('Error', error);
//           console.log('Response', error.response);
//           return error.response.data;
//         });
//       break;
//     default:
//       break;
//   }
// }

import {useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

export const useNetworkManager = () => {
  const userDetails = useSelector(state => state.user.userDetails);
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  const token = useSelector(state => state.user?.sessionToken);

  axios.defaults.headers.common['sessiontoken'] = token;
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  const get = async (url, params) => {
    console.log('🚀 ~ get ~ url:', url);
    console.log('🚀 ~ get ~ params:', params);

    try {
      const response = await axios.get(url, {
        params: {...params, language: currentLanguage === 'ar' ? 1 : 2},
      });

      let _res = response.data;
      console.log('🚀 ~ get ~ response:', response);

      if (_res && _res.status && _res.statusCode == 200) {
        return [true, _res?.errormessage, _res];
      } else {
        return [false, _res?.errormessage, null];
      }
    } catch (error) {
      console.log('Error', error);
      console.log('Response', error.response);
      return error.response.data;
    }
  };

  const post = async (url, formData) => {
    console.log('🚀 ~ post ~ url:', url);
    console.log('🚀 ~ post ~ formData:', formData);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      let _res = response.data;
      console.log('🚀 ~ post ~ response:', response);

      if (_res && _res.status && _res.statusCode == 200) {
        return [true, _res?.errormessage, _res];
      } else {
        return [false, _res.errormessage, null];
      }
    } catch (error) {
      console.log('Error', error);
      console.log('Response', error.response);
      return error.response.data;
    }
  };

  // custome fetch functions

  const getPrivacyDetails = async (url, params) => {
    console.log('🚀 ~ get ~ url:', url);
    console.log('🚀 ~ get ~ params:', params);

    try {
      const response = await axios.get(url, {
        params: {...params, language: currentLanguage === 'ar' ? 1 : 2},
      });

      console.log('🚀 ~ get ~ response:', response);

      if (response && response.status == 200) {
        return [true, response?.errormessage, response?.data];
      } else {
        return [false, response?.errormessage, null];
      }
    } catch (error) {
      console.log('Error', error);
      console.log('Response', error.response);
      return error.response.data;
    }
  };

  return {get, post, getPrivacyDetails};
};
