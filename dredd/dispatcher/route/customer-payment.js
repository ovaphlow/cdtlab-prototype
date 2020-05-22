const Router = require('@koa/router');

const logger = require('../logger');
const postgres = require('../postgres');

const router = new Router({
  prefix: '/api/customer-payment',
});

module.exports = router;

router.get('/', async (ctx) => {
  const cnx = await postgres.connect();
  try {
    const sql = `
      select *
      from dredd.customer_payment
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
        dredd.customer_payment (
          uuid, customer_id, amount, date0, date1, date, category, remark
        )
        values (
          $1, $2, $3, $4, $5, current_date, $6, $7
        )
    `;
    const result = await cnx.query(sql, [
      ctx.request.body.uuid,
      parseInt(ctx.request.body.customer_id || 0, 10),
      parseInt(ctx.request.body.amount, 10),
      ctx.request.body.date0,
      ctx.request.body.date1,
      ctx.request.body.category,
      ctx.request.body.remark,
    ]);
    ctx.response.body = { message: '', contet: result.rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  } finally {
    cnx.release();
  }
});
