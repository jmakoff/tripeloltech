const { version } = require('../../package.json');
const mockDataService = require('../services/mockData.service');
const NAME = 'eco-platform-api';

exports.healthz = async (_req, res) => {
  return res.status(200).send({ status: 'ok' });
};

exports.readyz = async (_req, res) => {
  const checks = { dataService: mockDataService.getStatus() };

  if (!mockDataService.isReady()) {
    return res.status(503).send({ status: 'not_ready', checks });
  }

  return res.status(200).send({ status: 'ready', checks });
};

exports.getVersion = async (_req, res) => {
  try {
    return res.status(200).send({
      name: NAME,
      version,
      env: process.env.NODE_ENV,
    });
  } catch (_e) {
    return res.status(200).send({ success: false, msg: 'Internal error' });
  }
};
