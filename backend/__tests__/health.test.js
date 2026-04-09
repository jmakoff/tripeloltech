const request = require('supertest');
const mockDataService = require('../services/mockData.service');

let app, server, io;

beforeAll(() => {
  mockDataService._initialized = true;
  ({ app, server, io } = require('../app'));
});

afterAll((done) => {
  if (io) io.close();
  if (server.listening) {
    server.close(done);
  } else {
    done();
  }
});

describe('GET /api/v1/healthz', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/api/v1/healthz');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /api/v1/readyz', () => {
  it('returns 200 when data service is initialized', async () => {
    mockDataService._initialized = true;

    const res = await request(app).get('/api/v1/readyz');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ready');
    expect(res.body.checks.dataService.status).toBe('up');
  });

  it('returns 503 when data service is not yet initialized', async () => {
    mockDataService._initialized = false;

    const res = await request(app).get('/api/v1/readyz');
    expect(res.status).toBe(503);
    expect(res.body.status).toBe('not_ready');
    expect(res.body.checks.dataService.status).toBe('initializing');
  });
});
