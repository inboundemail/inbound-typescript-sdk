// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Endpoints extends APIResource {
  /**
   * Create a new webhook, email forward, or email group endpoint for processing
   * incoming emails.
   *
   * @example
   * ```ts
   * const endpoint = await client.endpoints.create();
   * ```
   */
  create(
    body: EndpointCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EndpointCreateResponse> {
    return this._client.post('/v2/endpoints', { body, ...options });
  }

  /**
   * Get detailed information about a specific endpoint including delivery
   * statistics, recent deliveries, and associated resources.
   *
   * @example
   * ```ts
   * const endpoint = await client.endpoints.retrieve('123');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<EndpointRetrieveResponse> {
    return this._client.get(path`/v2/endpoints/${id}`, options);
  }

  /**
   * Update an existing endpoint's configuration, status, or properties. For email
   * groups, this will recreate the group members.
   *
   * @example
   * ```ts
   * const endpoint = await client.endpoints.update('123');
   * ```
   */
  update(
    pathID: string,
    body: EndpointUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EndpointUpdateResponse> {
    return this._client.put(path`/v2/endpoints/${pathID}`, { body, ...options });
  }

  /**
   * Retrieve all endpoints for the authenticated user with filtering, sorting, and
   * pagination options.
   *
   * @example
   * ```ts
   * const endpoints = await client.endpoints.list();
   * ```
   */
  list(
    query: EndpointListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EndpointListResponse> {
    return this._client.get('/v2/endpoints', { query, ...options });
  }

  /**
   * Permanently delete an endpoint and handle cleanup of associated resources (email
   * addresses, domains, delivery history).
   *
   * @example
   * ```ts
   * const endpoint = await client.endpoints.delete('123');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<EndpointDeleteResponse> {
    return this._client.delete(path`/v2/endpoints/${id}`, options);
  }

  /**
   * Send a test payload to an endpoint to verify it's working correctly. Supports
   * different webhook formats and provides detailed response information.
   *
   * @example
   * ```ts
   * const response = await client.endpoints.test('123');
   * ```
   */
  test(
    pathID: string,
    body: EndpointTestParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EndpointTestResponse> {
    return this._client.post(path`/v2/endpoints/${pathID}/test`, { body, ...options });
  }
}

export interface EndpointCreateResponse {
  id?: string;

  config?: unknown;

  createdAt?: string;

  deliveryStats?: EndpointCreateResponse.DeliveryStats;

  description?: string | null;

  groupEmails?: Array<string> | null;

  isActive?: boolean;

  name?: string;

  type?: 'webhook' | 'email' | 'email_group';

  updatedAt?: string;

  userId?: string;
}

export namespace EndpointCreateResponse {
  export interface DeliveryStats {
    failed?: number;

    lastDelivery?: string | null;

    successful?: number;

    total?: number;
  }
}

export interface EndpointRetrieveResponse {
  id?: string;

  associatedEmails?: Array<EndpointRetrieveResponse.AssociatedEmail>;

  catchAllDomains?: Array<EndpointRetrieveResponse.CatchAllDomain>;

  config?: unknown;

  createdAt?: string | null;

  deliveryStats?: EndpointRetrieveResponse.DeliveryStats;

  description?: string | null;

  groupEmails?: Array<string> | null;

  isActive?: boolean;

  name?: string;

  recentDeliveries?: Array<EndpointRetrieveResponse.RecentDelivery>;

  type?: 'webhook' | 'email' | 'email_group';

  updatedAt?: string | null;

  userId?: string;
}

export namespace EndpointRetrieveResponse {
  export interface AssociatedEmail {
    id?: string;

    address?: string;

    createdAt?: string | null;

    isActive?: boolean;
  }

  export interface CatchAllDomain {
    id?: string;

    domain?: string;

    status?: string;
  }

  export interface DeliveryStats {
    failed?: number;

    lastDelivery?: string | null;

    successful?: number;

    total?: number;
  }

  export interface RecentDelivery {
    id?: string;

    attempts?: number;

    createdAt?: string | null;

    deliveryType?: string;

    emailId?: string;

    lastAttemptAt?: string | null;

    responseData?: unknown;

    status?: string;
  }
}

export interface EndpointUpdateResponse {
  id?: string;

  config?: unknown;

  createdAt?: string | null;

  description?: string | null;

  groupEmails?: Array<string> | null;

  isActive?: boolean;

  name?: string;

  type?: 'webhook' | 'email' | 'email_group';

  updatedAt?: string | null;

  userId?: string;
}

export interface EndpointListResponse {
  data?: Array<EndpointListResponse.Data>;

  pagination?: EndpointListResponse.Pagination;
}

export namespace EndpointListResponse {
  export interface Data {
    id?: string;

    config?: unknown;

    createdAt?: string;

    deliveryStats?: Data.DeliveryStats;

    description?: string | null;

    groupEmails?: Array<string> | null;

    isActive?: boolean;

    name?: string;

    type?: 'webhook' | 'email' | 'email_group';

    updatedAt?: string;

    userId?: string;
  }

  export namespace Data {
    export interface DeliveryStats {
      failed?: number;

      lastDelivery?: string | null;

      successful?: number;

      total?: number;
    }
  }

  export interface Pagination {
    hasMore?: boolean;

    limit?: number;

    offset?: number;

    total?: number;
  }
}

export interface EndpointDeleteResponse {
  cleanup?: EndpointDeleteResponse.Cleanup;

  message?: string;
}

export namespace EndpointDeleteResponse {
  export interface Cleanup {
    deliveriesDeleted?: number;

    domains?: Array<string>;

    domainsUpdated?: number;

    emailAddresses?: Array<string>;

    emailAddressesUpdated?: number;

    groupEmailsDeleted?: number;
  }
}

export interface EndpointTestResponse {
  error?: string;

  message?: string;

  responseBody?: string;

  responseTime?: number;

  statusCode?: number;

  success?: boolean;

  testPayload?: unknown;

  webhookFormat?: 'inbound' | 'discord' | 'slack';
}

export interface EndpointCreateParams {
  config?: unknown;

  description?: string | null;

  name?: string;

  type?: 'webhook' | 'email' | 'email_group';
}

export interface EndpointUpdateParams {
  /**
   * from params
   */
  body_id?: string;

  config?: unknown;

  description?: string | null;

  isActive?: boolean | null;

  name?: string | null;
}

export interface EndpointListParams {
  active?: 'true' | 'false';

  limit?: number;

  offset?: number;

  sortBy?: 'newest' | 'oldest';

  type?: 'webhook' | 'email' | 'email_group';
}

export interface EndpointTestParams {
  /**
   * from params
   */
  body_id?: string;

  /**
   * optional, defaults to 'inbound'
   */
  webhookFormat?: 'inbound' | 'discord' | 'slack' | null;
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
    type EndpointUpdateParams as EndpointUpdateParams,
    type EndpointListParams as EndpointListParams,
    type EndpointTestParams as EndpointTestParams,
  };
}
