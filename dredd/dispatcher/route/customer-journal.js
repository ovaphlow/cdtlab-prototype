const Router = require('@koa/router')

const postgres = require('../postgres')

const router = new Router({
  prefix: '/api/customer-journal'
})

module.exports = router

router.post('/', async ctx => {
  const cnx = await postgres.connect()
  try {
    const sql = `
      insert into
        customer_journal (uuid, staff_id, staff, datime, customer_id,
          content, client)
        values ($1, $2, $3, $4, $5,
          $6, $7)
      returning id
    `
    const result = await cnx.query(sql, [
      ctx.request.body.uuid,
      ctx.request.body.staff_id,
      ctx.request.body.staff,
      ctx.request.body.datime,
      parseInt(ctx.request.body.customer_id),
      ctx.request.body.content,
      ctx.request.body.client
    ])
    ctx.response.body = { message: '', content: result.rows[0] }
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误', content: '' }
  } finally {
    cnx.release()
  }
})
