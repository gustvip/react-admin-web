export type arrayLikeType = string | any[] | { length: number };
export type arrayLikeCallbackType = (value?: any, index?: number | string, array?: arrayLikeType) => any;
export type compareFunctionType = (a?: any, b?: any) => 0 | 1 | -1;
