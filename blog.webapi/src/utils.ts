import * as CryptoJS from 'crypto-js';
import { status } from './config';
export const md5Encrypt = (input: string): string => {
  return CryptoJS.MD5(input).toString();
};

export const imagePath = () => {
  const productionPath = './dist/images'; // 生产环境的图片路径 (common/controller.ts)
  const developmentPath = './images'; // 开发环境的图片路径(common/controller.ts)

  return status === 'PRODUCTION' ? productionPath : developmentPath;
  // return './dist/src/images';
};

export const handleResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = null,
  error: string = '',
) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return res.status(statusCode).json({
    message: message,
    data: data,
    error: error,
  });
};
