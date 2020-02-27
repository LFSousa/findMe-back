const token = require('../utilities/token');

module.exports = (app, limiter) => {
  app.use(
    '/auth',
    limiter,
    require('../api/auth/auth.routes'),
  );

  app.use(
    '/faq',
    limiter,
    token.tokenValidation(1),
    require('../api/company/company.routes'),
  );

  app.use(
    '/company',
    limiter,
    require('../api/company/company.routes'),
  );
};