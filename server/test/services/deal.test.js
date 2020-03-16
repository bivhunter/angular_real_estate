const assert = require('assert');
const app = require('../../src/app');

describe('\'Deal\' service', () => {
  it('registered the service', () => {
    const service = app.service('deal');

    assert.ok(service, 'Registered the service');
  });
});
