const Router = require('@koa/router');

const logger = require('../logger');
const postgres = require('../postgres');

const router = new Router({
  prefix: '/api/customer-journal',
});

module.exports = router;

router.get('/:id', async (ctx) => {
  const cnx = await postgres.connect();
  try {
    const sql = `
      select * from dredd.customer_journal where id = $1 limit 1
    `;
    const result = await cnx.query(sql, [parseInt(ctx.params.id, 10)]);
    ctx.response.body = { message: '', content: result.rowCount === 1 ? result.rows[0] : {} };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  } finally {
    cnx.release();
  }
});

router.put('/:id', async (ctx) => {
  const cnx = await postgres.connect();
  try {
    const sql = `
      update dredd.customer_journal
      set uuid = $1, staff_id = $2, staff_delegate = $3, datime = $4,
        customer_id = $5, content = $6, customer_delegate = $7
      where id = $8
    `;
    const result = await cnx.query(sql, [
      ctx.request.body.uuid,
      ctx.request.body.staff_id,
      ctx.request.body.staff,
      ctx.request.body.datime,
      parseInt(ctx.request.body.customer_id, 10),
      ctx.request.body.content,
      ctx.request.body.client,
      parseInt(ctx.params.id, 10),
    ]);
    ctx.response.body = { message: '', content: result };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  } finally {
    cnx.release();
  }
});

router.get('/', async (ctx) => {
  const cnx = await postgres.connect();
  try {
    const sql = `
      select *
      from dredd.customer_journal
      where customer_id = $1
      order by id desc
      limit 6
    `;
    const result = await cnx.query(sql, [
      parseInt(ctx.request.query.customer_id || 0, 10),
    ]);
    ctx.response.body = { message: '', content: result.rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  } finally {
    cnx.release();
  }
});

router.post('/', async (ctx) => {
  const cnx = await postgres.connect();
  try {
    const sql = `
      insert into
        dredd.customer_journal (uuid, staff_id, staff_delegate, datime, customer_id,
          content, customer_delegate)
        values ($1, $2, $3, $4, $5,
          $6, $7)
      returning id
    `;
    const result = await cnx.query(sql, [
      ctx.request.body.uuid,
      ctx.request.body.staff_id,
      ctx.request.body.staff_delegate,
      ctx.request.body.datime,
      parseInt(ctx.request.body.customer_id, 10),
      ctx.request.body.content,
      ctx.request.body.customer_delegate,
    ]);
    ctx.response.body = { message: '', content: result.rows[0] };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  } finally {
    cnx.release();
  }
});
