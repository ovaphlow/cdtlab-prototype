const crypto = require('crypto');

const Router = require('@koa/router');

const logger = require('../logger');
const postgres = require('../postgres');

const router = new Router({
  prefix: '/api/user',
});

module.exports = router;

router.get('/test-salt', async (ctx) => {
  const salt = crypto.randomBytes(8).toString('hex');
  const hmac = crypto.createHmac('sha256', salt);
  hmac.update('1123');
  const result = hmac.digest('hex');
  ctx.response.body = { message: '', content: { salt, result }};
})

router.post('/sign-up', async (ctx) => {
  const cnx = await postgres.connect();
  try {
    let sql = `
      select count(*) as qty from dredd.staff where email = $1
    `;
    let result = await cnx.query(sql, [ctx.request.body.email]);
    if (parseInt(result.rows[0].qty, 10) > 0) {
      ctx.response.body = { message: 'EMAIL已被注册，请更换。' };
      return;
    }
    const salt = crypto.randomBytes(8).toString('hex');
    const hmac = crypto.createHmac('sha256', salt);
    hmac.update(ctx.request.body.password);
    const password_salted = hmac.digest('hex');
    sql = `
      insert into
        dredd.staff (uuid, email, name, password, salt)
        values ($1, $2, $3, $4, $5)
      returning id
    `;
    result = await cnx.query(sql, [
      ctx.request.body.uuid,
      ctx.request.body.email,
      ctx.request.body.name,
      password_salted,
      salt,
    ]);
    ctx.response.body = { message: '', content: result.rows[0] };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  } finally {
    cnx.release();
  }
});

router.put('/sign-in', async (ctx) => {
  const cnx = await postgres.connect();
  try {
    const sql = `
      select * from dredd.staff where email = $1
    `;
    const result = await cnx.query(sql, [ctx.request.body.email]);
    if (result.rowCount !== 1) {
      ctx.response.body = { message: '用户不存在或帐号异常，请联系管理员。', content: '' };
      return;
    }
    const hmac = crypto.createHmac('sha256', result.rows[0].salt);
    hmac.update(ctx.request.body.password);
    const password_salted = hmac.digest('hex');
    if (password_salted !== result.rows[0].password) {
      ctx.response.body = { message: 'EMAIL或密码错误', content: '' };
      return;
    }
    result.rows[0].password = undefined;
    result.rows[0].salt = undefined;
    ctx.response.body = { message: '', content: result.rows[0] };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  } finally {
    cnx.release();
  }
});
