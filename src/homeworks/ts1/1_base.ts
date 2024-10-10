/**
 * Нужно превратить файл в ts и указать типы аргументов и типы возвращаемого значения
 * */
export type RegexApplyFunction = (string: string) => string;
export type RegexApplyFunctionNumber = (value: number, separator? : string | number) => string | number;
export const removePlus : RegexApplyFunction = (string : string) => string.replace(/^\+/, '');

export const addPlus :  RegexApplyFunction = (string : string) => `+${string}`;

export const removeFirstZeros:  RegexApplyFunction = (value : string) => value.replace(/^(-)?[0]+(-?\d+.*)$/, '$1$2');

export const getBeautifulNumber: RegexApplyFunctionNumber  = (value : number, separator:string = ' ') =>
  value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

export const round :RegexApplyFunctionNumber = (value: number, accuracy: number = 2) => {
  const d = 10 ** accuracy;
  return Math.round(value * d) / d;
};

const transformRegexp =
  /(matrix\(-?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, )(-?\d+(\.\d+)?), (-?\d+(\.\d+)?)\)/;
export interface ICoordinates
{
    x: number;
    y: number;
}

export const getTransformFromCss = (transformCssString : string) => {
  const data = transformCssString.match(transformRegexp);
  if (!data) return { x: 0, y: 0 };
  return {
    x: parseInt(data[6], 10),
    y: parseInt(data[8], 10),
  };
};
type Color = 0x008000| 0x0000FF | 0xFF0000;
const GREEN: Color = 0x008000;
const RED: Color = 0x0000FF;
const BLUE: Color = 0xFF0000;
type RGB = [number,number,number]
export const getColorContrastValue = ([red, green, blue]:RGB) =>
  // http://www.w3.org/TR/AERT#color-contrast
  Math.round((red * 299 + green * 587 + blue * 114) / 1000);

export const getContrastType = (contrastValue: number) => (contrastValue > 125 ? 'black' : 'white');



export const shortColorRegExp = /^#[0-9a-f]{3}$/i;
export const longColorRegExp = /^#[0-9a-f]{6}$/i;

export const checkColor = (color: string) => {
  if (!longColorRegExp.test(color) && !shortColorRegExp.test(color)) throw new Error(`invalid hex color: ${color}`);
};

export const hex2rgb = (color: string) => {
  checkColor(color);
  if (shortColorRegExp.test(color)) {
    const red = parseInt(color.substring(1, 2), 16);
    const green = parseInt(color.substring(2, 3), 16);
    const blue = parseInt(color.substring(3, 4), 16);
    return [red, green, blue];
  }
  const red = parseInt(color.substring(1, 3), 16);
  const green = parseInt(color.substring(3, 5), 16);
  const blue = parseInt(color.substring(5, 8), 16);
  return [red, green, blue];
};
type numberedArray =
{
    value: number;
    number: number;
}
export const getNumberedArray = (arr:number[]) => arr.map((value, number) => ({ value, number }));
export const toStringArray = (arr: numberedArray[]) => arr.map(({ value, number }) => `${value}_${number}`);
export interface ICustomer
{
    id:number;
    name: string;
    age: number;
    isSubscribed: boolean;
}
export interface ICustomerEx extends ICustomer
{
   
}


export const transformCustomers = (customers: ICustomer[]) => {
    return customers.reduce((acc: Record<number,Partial<ICustomer>>, customer: ICustomer) => {
      acc[customer.id] = { name: customer.name, age: customer.age, isSubscribed: customer.isSubscribed };
      return acc;
    }, {});
  };
