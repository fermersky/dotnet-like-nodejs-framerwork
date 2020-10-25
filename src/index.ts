import * as http from 'http';
import HomeRouter from './routes/Home';
import StaticRouter from './routes/static';
import * as events from 'events';

import { parseUrl } from './routes/utils';

const emitter = new events.EventEmitter();

use('/home', HomeRouter);
use('/public', StaticRouter);

const server = http.createServer((req, res) => {
  const { segments } = parseUrl(req.url);

  emitter.emit(`/${segments[0] || ''}`, req, res);
});

function use(path: string, Handler: any) {
  emitter.on(path, (req, res) => {
    new Handler(req, res, path);
  });
}

server.listen(5000, () => {
  console.log('server started at port 5000');
});
