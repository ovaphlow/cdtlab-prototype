const path = require('path')

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const staticCache = require('koa-static-cache')

const config = require('./config')

const app = new Koa()

app.env = config.env

app.use(staticCache(path.join(__dirname, '../webapp/dist'), {
  maxAge: 60 * 60 * 24 * 7,
  gzip: true
}))

app.use(bodyParser({
  jsonLimit: '4mb'
}))

app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${new Date()} [${ctx.method}] ${ctx.url} - ${rt}`)
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

;(() => {
  const router = require('./route/customer')
  app.use(router.routes())
  app.use(router.allowedMethods())
})()

;(() => {
  const router = require('./route/customer-journal')
  app.use(router.routes())
  app.use(router.allowedMethods())
})()

module.exports = app
