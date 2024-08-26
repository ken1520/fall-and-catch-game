const morgan = require('morgan');
const logger = require('./winston');

morgan.token('req-body', (req, res) => {
  return req.body;
});

const jsonFormat = (tokens, req, res) => {
  return JSON.stringify({
    remote_address: tokens['remote-addr'](req, res),
    time: tokens['date'](req, res, 'iso'),
    method: tokens['method'](req, res),
    url: tokens['url'](req, res),
    request_body: tokens['req-body'](req, res),
    status_code: tokens['status'](req, res),
    response_time: `${tokens['response-time'](req, res)}ms`,
  });
};

const morganLog = () => {
  return morgan(jsonFormat, {
    stream: { write: (message) => logger.info(message) },
  });
};

module.exports = {
  morganLog,
};
