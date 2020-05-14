const crypto = require('crypto')

const Router = require('@koa/router')

const postgres = require('../postgres')

const router = new Router({
  prefix: '/api/user'
})

module.exports = router

router.post('/sign-up', async ctx => {
  const cnx = await postgres.connect()
  try {
    let sql = `
      select count(*) as qty from dredd.staff where email = $1
    `
    let result = await cnx.query(sql, [ctx.request.body.email])
    if (parseInt(result.rows[0].qty) > 0) {
      ctx.response.body = { message: 'EMAIL已被注册，请更换。' }
      return
    }
    const salt = crypto.randomBytes(16).toString('hex')
    const hmac = crypto.createHmac('sha256', salt)
    hmac.update(ctx.request.body.password)
    const password_salted = hmac.digest('hex')
    sql = `
      insert into
        dredd.staff (uuid, email, name, password, salt)
        values ($1, $2, $3, $4, $5)
      returning id
    `
    result = await cnx.query(sql, [
      ctx.request.body.uuid,
      ctx.request.body.email,
      ctx.request.body.name,
      password_salted,
      salt
    ])
    ctx.response.body = { message: '', content: result.rows[0] }
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误', content: '' }
  } finally {
    cnx.release()
  }
})
