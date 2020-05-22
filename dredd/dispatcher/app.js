const path = require('path');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const staticCache = require('koa-static-cache');

const logger = require('./logger');
const routerCustomer = require('./route/customer');
const routerCustomerJournal = require('./route/customer-journal');
const routerCustomerPayment = require('./route/customer-payment');
const routerStaff = require('./route/staff');
const routerUser = require('./route/user');

const app = new Koa();

// salt: '89ufjio239oikwef8023r90i',

app.env = 'production';

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
  app.use(routerCustomer.routes());
  app.use(routerCustomer.allowedMethods());
})();

(() => {
  app.use(routerCustomerJournal.routes());
  app.use(routerCustomerJournal.allowedMethods());
})();

(() => {
  app.use(routerCustomerPayment.routes());
  app.use(routerCustomerPayment.allowedMethods());
})();

(() => {
  app.use(routerUser.routes());
  app.use(routerUser.allowedMethods());
})();

(() => {
  app.use(routerStaff.routes());
  app.use(routerStaff.allowedMethods());
})();

module.exports = app;
