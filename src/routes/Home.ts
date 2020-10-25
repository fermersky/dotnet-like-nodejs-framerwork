import * as http from 'http';
import BaseRouter from './BaseRouter';
import { route } from './utils';

declare type IncomingMessage = http.IncomingMessage;
declare type OutgoingMessage = http.OutgoingMessage;

class HomeRouter extends BaseRouter {
  constructor(_req: IncomingMessage, _res: OutgoingMessage, _baseUrl: string) {
    super(_req, _res, _baseUrl);
  }

  @route('/', 'get')
  get(a: any, b: any): void {
    this._res.end(`home router (get method handled) a=${a}, b=${b}`);
  }

  @route('/post', 'post')
  async post(body) {
    this._res.end('home router (post method handled); recived data is ' + JSON.stringify(body));
  }
}

export default HomeRouter;
