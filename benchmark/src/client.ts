// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/benchmark
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import * as request from 'request-promise-native';
import {Todo} from '@loopback/example-todo';

export class Client {
  constructor(private url: string) {}

  createTodo(data: Partial<Todo>) {
    return request.post(`${this.url}/todos`, {
      json: true,
      body: data,
    });
  }

  ping() {
    return request.get(`${this.url}/todos`);
  }
}
