const BASE_URL = 'https://www.ahlamakom.com/api';
const EV_BASE_URL = 'https://www.electronicvillage.org';
const EV_USER_BASE_URL = 'https://evusers.electronicvillage.org';

export default {
  APP_INFO: 'http://www.electronicvillage.org/json_appInfo.php?appId=32',
  LOG_OUT: EV_USER_BASE_URL + '/json_logout',
  LOGIN: EV_USER_BASE_URL + '/json_login.php',
  REQUEST_OTP: EV_USER_BASE_URL + '/json_sendOtp',
  VARIFY_OTP: EV_USER_BASE_URL + '/json_otpverify',
  PRIVACY_POLICY: EV_BASE_URL + '/json_evPages.php',
  CHANGE_EMAIL: EV_USER_BASE_URL + '/json_user_changeEmail',
  FORGOT_PASSWORD: EV_USER_BASE_URL + '/json_forgotPassword',
  APPLICATIONS_LIST: EV_USER_BASE_URL + '/json_applications',
  NOTIFICATION: EV_USER_BASE_URL + '/json_appTokenInsert.php',
  RESET_PASSWORD: EV_USER_BASE_URL + '/json_user_resetPassword',
  USER_REGISTER: EV_USER_BASE_URL + '/json_userRegistration.php',
  CHANGE_LANGUAGE: EV_USER_BASE_URL + '/json_user_changeLanguage',
  CHANGE_USERNAME: EV_USER_BASE_URL + '/json_user_changeUsername',
  SUBSCRIPTION_LIST: EV_USER_BASE_URL + '/json_subscriptions.php',
  CHANGE_PASSSWORD: EV_USER_BASE_URL + '/json_user_changePassword',
  CHANGE_PROFILE_PIC: EV_USER_BASE_URL + '/json_user_changeProfilePic',
  CHANGE_NOTIFICATION: EV_USER_BASE_URL + '/json_user_changeNotification',

  DREAMS_SUBJECTS: BASE_URL + '/json_tree.php',
  DREAMS_LIST: BASE_URL + '/json_dreams.php',
  DREAMS_CHAR: BASE_URL + '/json_chars.php',
  KEYS: {
    OTP: 'otp',
    AUTH: 'auth',
    AUTH: 'auth',
    EMAIL: 'email',
    APP_ID: 'appid',
    ACTION: 'action',
    PAGE_ID: 'pageId',
    OS_TYPE: 'osType',
    PASSWORD: 'password',
    LANGUAGE: 'language',
    USERNAME: 'username',
    FULL_NAME: 'fullname',
    FCM_TOKEN: 'fcmToken',
    DEVICE_ID: 'deviceId',
    PROFILE_PIC: 'profile_pic',
    NEW_PASSWORD: 'newPassword',
    OLD_PASSWORD: 'oldPassword',
    NOTIFICATION: 'notification',
    ENCODED_EMAIL: 'encodedEmail',
    DISCOUND_CODE: 'discountCode',
    CHAR_ID: 'charId',
  },
};
