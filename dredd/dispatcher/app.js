const path = require('path');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const staticCache = require('koa-static-cache');

const config = require('./config');
const logger = require('./logger');
const customerRouter = require('./route/customer');
const customerJournalRouter = require('./route/customer-journal');
const staffRouter = require('./route/staff');
const userRouter = require('./route/user');

const app = new Koa();

app.env = config.env;

app.use(staticCache(path.join(__dirname, '../webapp/dist'), {
  maxAge: 60 * 60 * 24 * 7,
  gzip: true,
}));

app.use(bodyParser({
  jsonLimit: '4mb',
}));

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  logger.log(`${new Date()} [${ctx.method}] ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.on('error', (err, ctx) => {
  logger.error('server error', err, ctx);
});

(() => {
  app.use(customerRouter.routes());
  app.use(customerRouter.allowedMethods());
})();

(() => {
  app.use(customerJournalRouter.routes());
  app.use(customerJournalRouter.allowedMethods());
})();

(() => {
  app.use(userRouter.routes());
  app.use(userRouter.allowedMethods());
})();

(() => {
  app.use(staffRouter.routes());
  app.use(staffRouter.allowedMethods());
})();

module.exports = app;
