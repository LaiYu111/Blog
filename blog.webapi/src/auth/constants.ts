import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secrets: 'dasdsggnas i@@@ joiasdgjp894372908*&()*@#Y',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
