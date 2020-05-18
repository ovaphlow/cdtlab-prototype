const crypto = require('crypto')

const Router = require('@koa/router')

const postgres = require('../postgres')

const router = new Router({
  prefix: '/api/staff'
})

module.exports = router

router.get('/:id', async ctx => {
  const cnx = await postgres.connect()
  try {
    const sql = `
      select id, uuid, email, name, certified
      from dredd.staff
      where id = $1 and uuid = $2
    `
    const result = await cnx.query(sql, [
      parseInt(ctx.params.id),
      ctx.request.query.uuid
    ])
    ctx.response.body = { message: '', content: result.rowCount === 1 ? result.rows[0] : {} }
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误', content: '' }
  } finally {
    cnx.release()
  }
})

router.put('/:id', async ctx => {
  const cnx = await postgres.connect()
  try {
    const sql = `
      update dredd.staff
      set email = $1, name = $2, certified = $3
      where id = $4 and uuid = $5
    `
    const result = await cnx.query(sql, [
      ctx.request.body.email,
      ctx.request.body.name,
      ctx.request.body.certified,
      parseInt(ctx.params.id),
      ctx.request.query.uuid
    ])
    ctx.response.body = { message: '', content: result }
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误', content: '' }
  } finally {
    cnx.release()
  }
})
router.delete('/:id', async ctx => {
  const cnx = await postgres.connect()
  try {
    const sql = `
      delete from dredd.staff
      where id = $1 and uuid = $2
    `
    const result = await cnx.query(sql, [
      parseInt(ctx.params.id),
      ctx.request.query.uuid
    ])
    ctx.response.body = { message: '', content: result }
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误', content: '' }
  } finally {
    cnx.release()
  }
})

router.get('/', async ctx => {
  const cnx = await postgres.connect()
  try {
    const sql = `
      select id, uuid, email, name, certified
      from dredd.staff
      order by id desc
    `
    const result = await cnx.query(sql)
    ctx.response.body = { message: '', content: result.rows }
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误', content: '' }
  } finally {
    cnx.release()
  }
})
