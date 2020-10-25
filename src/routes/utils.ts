import { IParsedUrl } from '../interfaces';

export function parseUrl(url: string): IParsedUrl {
  const [path, paramsString] = url.split('?');
  let params = {};
  const segments = path
    .substr(1)
    .split('/')
    .filter((segment) => segment !== '');

  if (!paramsString) {
    return { segments };
  }

  const keyValuePairs = paramsString.split('&');
  keyValuePairs.forEach((keyValue) => {
    const [key, value] = keyValue.split('=');
    params[key] = <any>value;
  });

  return { path, params, segments };
}

export function route(path: string, method: string = 's') {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Object.setPrototypeOf(descriptor.value, { __path: path, __method: method });
  };
}

export function get() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const oldProto = Object.getPrototypeOf(descriptor.value);
    const newProto = { ...oldProto, __method: 'get' };

    Object.setPrototypeOf(descriptor.value, newProto);
  };
}
