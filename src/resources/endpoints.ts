// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Endpoints extends APIResource {
  /**
   * POST /endpoints
   */
  create(body: EndpointCreateParams, options?: RequestOptions): APIPromise<EndpointCreateResponse> {
    return this._client.post('/api/v2/endpoints', { body, ...options });
  }

  /**
   * GET /endpoints/{id}
   */
  retrieve(
    pathID: string,
    query: EndpointRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<EndpointRetrieveResponse> {
    return this._client.get(path`/api/v2/endpoints/${pathID}`, { query, ...options });
  }

  /**
   * PUT /endpoints/{id}
   */
  update(
    pathID: string,
    body: EndpointUpdateParams,
    options?: RequestOptions,
  ): APIPromise<EndpointUpdateResponse> {
    return this._client.put(path`/api/v2/endpoints/${pathID}`, { body, ...options });
  }

  /**
   * GET /endpoints
   */
  list(
    query: EndpointListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EndpointListResponse> {
    return this._client.get('/api/v2/endpoints', { query, ...options });
  }

  /**
   * DELETE /endpoints/{id}
   */
  delete(id: string, options?: RequestOptions): APIPromise<EndpointDeleteResponse> {
    return this._client.delete(path`/api/v2/endpoints/${id}`, options);
  }

  /**
   * POST /endpoints/{id}/test
   */
  test(pathID: string, body: EndpointTestParams, options?: RequestOptions): APIPromise<EndpointTestResponse> {
    return this._client.post(path`/api/v2/endpoints/${pathID}/test`, { body, ...options });
  }
}

export interface EndpointCreateResponse {
  id: string;

  config: string;

  createdAt: string;

  deliveryStats: string;

  description: string;

  groupEmails: string;

  isActive: boolean;

  name: string;

  type: 'webhook' | 'email' | 'email_group';

  updatedAt: string;

  userId: string;
}

export interface EndpointRetrieveResponse {
  id: string;

  associatedEmails: Array<string>;

  catchAllDomains: Array<string>;

  config: string;

  createdAt: string;

  deliveryStats: string;

  description: string;

  groupEmails: string;

  isActive: boolean;

  name: string;

  recentDeliveries: Array<string>;

  type: 'webhook' | 'email' | 'email_group';

  updatedAt: string;

  userId: string;
}

export interface EndpointUpdateResponse {
  id: string;

  config: string;

  createdAt: string;

  description: string;

  groupEmails: string;

  isActive: boolean;

  name: string;

  type: 'webhook' | 'email' | 'email_group';

  updatedAt: string;

  userId: string;
}

export interface EndpointListResponse {
  data: Array<string>;

  pagination: number;
}

export interface EndpointDeleteResponse {
  cleanup: string;

  message: string;
}

export interface EndpointTestResponse {
  message: string;

  responseTime: number;

  success: boolean;

  error?: string;

  responseBody?: string;

  statusCode?: number;

  testPayload?: string;

  webhookFormat?: 'inbound' | 'discord' | 'slack' | 'undefined';
}

export interface EndpointCreateParams {
  config: string;

  name: string;

  type: 'webhook' | 'email' | 'email_group';

  description?: string;
}

export interface EndpointRetrieveParams {
  /**
   * id parameter
   */
  query_id: string;
}

export interface EndpointUpdateParams {
  body_id: string;

  config?:
    | 'import(/Users/ryanvogel/dev/inbound-org/inbound/features/endpoints/types/index).EndpointConfig'
    | 'undefined';

  description?: string;

  isActive?: boolean;

  name?: string;
}

export interface EndpointListParams {
  /**
   * active parameter
   */
  active?: 'true' | 'false' | 'undefined';

  /**
   * limit parameter
   */
  limit?: number;

  /**
   * offset parameter
   */
  offset?: number;

  /**
   * sortBy parameter
   */
  sortBy?: 'newest' | 'oldest' | 'undefined';

  /**
   * type parameter
   */
  type?: 'webhook' | 'email' | 'email_group' | 'undefined';
}

export interface EndpointTestParams {
  body_id: string;

  webhookFormat?: 'inbound' | 'discord' | 'slack' | 'undefined';
}

export declare namespace Endpoints {
  export {
    type EndpointCreateResponse as EndpointCreateResponse,
    type EndpointRetrieveResponse as EndpointRetrieveResponse,
    type EndpointUpdateResponse as EndpointUpdateResponse,
    type EndpointListResponse as EndpointListResponse,
    type EndpointDeleteResponse as EndpointDeleteResponse,
    type EndpointTestResponse as EndpointTestResponse,
    type EndpointCreateParams as EndpointCreateParams,
    type EndpointRetrieveParams as EndpointRetrieveParams,
    type EndpointUpdateParams as EndpointUpdateParams,
    type EndpointListParams as EndpointListParams,
    type EndpointTestParams as EndpointTestParams,
  };
}
