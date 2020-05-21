const Router = require('@koa/router');

const logger = require('../logger');
const postgres = require('../postgres');

const router = new Router({
  prefix: '/api/customer',
});

module.exports = router;

router.get('/:id', async (ctx) => {
  const cnx = await postgres.connect();
  try {
    const sql = `
      select * from dredd.customer where id = $1 limit 1
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
      update dredd.customer
      set uuid = $1, name = $2, tel = $3,
        address_level1 = $4, address_level2 = $5, address_level3 = $6, address_level4 = $7
      where id = $8
    `;
    const result = await cnx.query(sql, [
      ctx.request.body.uuid,
      ctx.request.body.name,
      ctx.request.body.tel,
      ctx.request.body.address_level1,
      ctx.request.body.address_level2,
      ctx.request.body.address_level3,
      ctx.request.body.address_level4,
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
      select * from dredd.customer order by id desc
    `;
    const result = await cnx.query(sql);
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
        dredd.customer (uuid, name, tel,
          address_level1, address_level2, address_level3, address_level4,
          created_at)
        values ($1, $2, $3,
          $4, $5, $6, $7,
          current_timestamp)
      returning id
    `;
    const result = await cnx.query(sql, [
      ctx.request.body.uuid,
      ctx.request.body.name,
      ctx.request.body.tel,
      ctx.request.body.address_level1,
      ctx.request.body.address_level2,
      ctx.request.body.address_level3,
      ctx.request.body.address_level4,
    ]);
    ctx.response.body = { message: '', content: result.rows[0] };
  } catch (err) {
    logger.error(err.stack);
    ctx.response.body = { message: '服务器错误' };
  } finally {
    cnx.release();
  }
});

router.put('/', async (ctx) => {
  const cnx = await postgres.connect();
  try {
    const sql = `
      select *
      from dredd.customer
      where position($1 in name) > 0
        or position($2 in tel) > 0
    `;
    const result = await cnx.query(sql, [
      ctx.request.body.filter_name,
      ctx.request.body.filter_name,
    ]);
    ctx.response.body = { message: '', content: result.rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  } finally {
    cnx.release();
  }
});
