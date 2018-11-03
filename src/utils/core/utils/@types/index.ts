export type arrayLikeType = string | any[] | { length: number };
export type arrayLikeCallbackType = (value?: any, index?: number | string, array?: arrayLikeType) => any;
