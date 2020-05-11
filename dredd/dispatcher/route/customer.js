const Router = require('@koa/router')

const postgres = require('../postgres')

const router = new Router({
  prefix: '/api/customer'
})

module.exports = router

router.get('/', async ctx => {
  ctx.response.body = { message: '', content: '111' }
})

router.post('/', async ctx => {
  console.info(ctx.request.body)
  const client = await postgres.connect()
  try {
    const sql = `
      insert into
        dredd.customer (uuid, name, tel,
          address_level1, address_level2, address_level3, address_level4)
        values ($1, $2, $3,
          $4, $5, $6, $7)
      returing id
    `
    const result = await client.query(sql, [
      ctx.request.body.uuid,
      ctx.request.body.name,
      ctx.request.body.tel,
      ctx.request.body.address_level1,
      ctx.request.body.address_level2,
      ctx.request.body.address_level3,
      ctx.request.body.address_level4
    ])
    ctx.response.body = { message: '', content: result.rows[0] }
  } catch (err) {
    console.error(err.stack)
    ctx.response.body = { message: '服务器错误' }
  } finally {
    client.release()
  }
})
