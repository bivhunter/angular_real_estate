const assert = require('assert');
const app = require('../../src/app');

describe('\'Home\' service', () => {
  it('registered the service', () => {
    const service = app.service('home');

    assert.ok(service, 'Registered the service');
  });
});
