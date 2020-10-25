import * as http from 'http';
import BaseRouter from './BaseRouter';
import { route } from './utils';
import * as fs from 'fs';
import * as path from 'path';

declare type IncomingMessage = http.IncomingMessage;
declare type OutgoingMessage = http.OutgoingMessage;

class StaticRouter extends BaseRouter {
  constructor(_req: IncomingMessage, _res: OutgoingMessage, _baseUrl: string) {
    super(_req, _res, _baseUrl);
  }

  @route('/image', 'get')
  public getImage(filename: any) {
    const filePath = path.join(__dirname, '..', '..', 'public', filename);
    const stream = fs.createReadStream(filePath);

    stream.pipe(this._res);
  }
}

export default StaticRouter;
