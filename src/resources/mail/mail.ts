// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ThreadsAPI from './threads';
import { ThreadListParams, ThreadListResponse, ThreadRetrieveResponse, Threads } from './threads';

export class Mail extends APIResource {
  threads: ThreadsAPI.Threads = new ThreadsAPI.Threads(this._client);
}

Mail.Threads = Threads;

export declare namespace Mail {
  export {
    Threads as Threads,
    type ThreadRetrieveResponse as ThreadRetrieveResponse,
    type ThreadListResponse as ThreadListResponse,
    type ThreadListParams as ThreadListParams,
  };
}
