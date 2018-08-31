// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/explorer
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
import {
  createClientForHandler,
  createClientForRestServer,
} from '@loopback/testlab';
import {RestServerConfig, RestComponent, RestServer} from '@loopback/rest';
import {Application} from '@loopback/core';
import {ExplorerComponent, ExplorerBindings} from '../..';

describe('API Explorer for REST Server', () => {
  let server: RestServer;

  before(async () => {
    server = await givenAServer({
      rest: {port: 0},
    });
  });

  after(async () => {
    await server.stop();
  });

  it('exposes "GET /explorer"', async () => {
    const test = await createClientForRestServer(server);
    test
      .get('/explorer')
      .expect(200, /\<title\>LoopBack API Explorer<\/title\>/)
      .expect('content-type', /text\/html.*/);
  });
});

async function givenAServer(options?: {rest: RestServerConfig}) {
  const app = new Application(options);
  app.component(RestComponent);
  app.bind(ExplorerBindings.CONFIG).to({});
  // FIXME: Can we mount the ExplorerComponent to a given server?
  app.component(ExplorerComponent);
  const server = await app.getServer(RestServer);
  return server;
}
