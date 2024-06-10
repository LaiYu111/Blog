import * as CryptoJS from 'crypto-js';
export const md5Encrypt = (input: string): string => {
  return CryptoJS.MD5(input).toString();
};


export const imageStoragePath = './images'