import * as CryptoJS from 'crypto-js';
export const md5Encrypt = (input: string): string => {
  return CryptoJS.MD5(input).toString();
};


export const imageStoragePath = './images'

export const handleResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = null,
  error: string = ''
) => {
  // @ts-ignore
  return res.status(statusCode).json({
    message: message,
    data: data,
    error: error
  });
}