import * as http from 'http';
import { type } from 'os';
import { parseUrl } from './utils';

export default class BaseRouter {
  constructor(
    protected _req: http.IncomingMessage,
    protected _res: http.OutgoingMessage,
    protected _baseUrl: string
  ) {
    const propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this)) as any;
    // console.log(propertyNames || 'adf');
    propertyNames.map(async (prop: string) => {
      const value = this[prop];

      if (typeof value !== 'function') {
        return;
      }

      const proto = Object.getPrototypeOf(this[prop]) as any;

      const realMethod = _req.method.toLowerCase();
      const protoMethod = proto.__method;

      let protoPath = `${this._baseUrl}${proto.__path}`;

      if (protoPath[protoPath.length - 1] !== '/') {
        protoPath = protoPath.concat('/');
      }

      const { segments, params } = parseUrl(_req.url);
      let realPath = `/${segments.join('/')}/`;

      if (realPath === protoPath && protoMethod === realMethod) {
        if (realMethod === 'get') {
          this[prop](...(<any>Object.values(params)));
        } else if (realMethod === 'post') {
          const body = await this.parseBodyAsJson();
          this[prop](body);
        }
      }
    });
  }

  parseBodyAsJson(): Promise<any> {
    return new Promise((resolve, reject) => {
      let data = '';

      this._req.on('data', (chunk) => {
        data += chunk;
      });

      this._req.on('end', () => {
        const stringBody = data.toString();

        if (stringBody) {
          const jsonBody = JSON.parse(stringBody);
          resolve(jsonBody);
        } else {
          resolve({});
        }
      });

      this._req.on('error', (err) => {
        reject(err);
      });
    });
  }
}
