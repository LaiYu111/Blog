export const ALLOW_HOSTS = ['http://localhost:4000'];

export type Status = 'PRODUCTION' | 'DEVELOPMENT';

// 只能是 'PRODUCTION' 或 'DEVELOPMENT'。项目部署使用 'PRODUCTION'，start:dev 情况下使用 'DEVELOPMENT'
// 解决 fs,sharp 和 nest/static-serve 文件读写路径不一致问题
export const status: Status = 'PRODUCTION';
