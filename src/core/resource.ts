// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Inbound } from '../client';

export abstract class APIResource {
  protected _client: Inbound;

  constructor(client: Inbound) {
    this._client = client;
  }
}
