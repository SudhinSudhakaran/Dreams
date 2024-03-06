// useEncryptHook.js

import {encode as base64Encode} from 'base-64';
import utf8 from 'utf8';

const useEncryptHook = (text = '') => {
  console.log('🚀 ~ getEncryptedValue ~ text:', text);

  if (text.length > 0) {
    const bytes = utf8.encode(text);
    return base64Encode(bytes);
  }

  return text;
};

export default useEncryptHook;
