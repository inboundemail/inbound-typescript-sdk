// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class Endpoints extends APIResource {
  /**
   * Create a new endpoint (webhook, email, or email_group) for the authenticated
   * user
   */
  create(body: EndpointCreateParams, options?: RequestOptions): APIPromise<EndpointCreateResponse> {
    return this._client.post(
      '/api/e2/endpoints',
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Get detailed information about a specific endpoint including delivery stats,
   * recent deliveries, associated emails, and catch-all domains
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<EndpointRetrieveResponse> {
    return this._client.get(path`/api/e2/endpoints/${id}`, options);
  }

  /**
   * Update an existing endpoint's name, description, active status, config, or
   * webhook format
   */
  update(
    id: string,
    body: EndpointUpdateParams,
    options?: RequestOptions,
  ): APIPromise<EndpointUpdateResponse> {
    return this._client.put(
      path`/api/e2/endpoints/${id}`,
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Get paginated list of endpoints for authenticated user with optional filtering
   * by type, active status, sort order, and search by name
   */
  list(
    query: EndpointListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EndpointListResponse> {
    return this._client.get('/api/e2/endpoints', { query, ...options });
  }

  /**
   * Delete an endpoint and clean up associated resources (email addresses become
   * store-only, domains lose catch-all config, group entries and delivery history
   * are deleted)
   */
  delete(id: string, options?: RequestOptions): APIPromise<EndpointDeleteResponse> {
    return this._client.delete(path`/api/e2/endpoints/${id}`, options);
  }

  /**
   * Test an endpoint by sending a test payload. For webhooks, supports inbound,
   * discord, and slack formats. For email endpoints, simulates the forwarding
   * process.
   */
  test(id: string, body: EndpointTestParams, options?: RequestOptions): APIPromise<EndpointTestResponse> {
    return this._client.post(
      path`/api/e2/endpoints/${id}/test`,
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

export interface EndpointCreateResponse {
  id: string;

  config: unknown;

  createdAt: string;

  deliveryStats: EndpointCreateResponse.DeliveryStats;

  description: string | null;

  groupEmails: Array<string> | null;

  isActive: boolean;

  name: string;

  type: 'webhook' | 'email' | 'email_group';

  updatedAt: string;

  userId: string;
}

export namespace EndpointCreateResponse {
  export interface DeliveryStats {
    failed: number;

    lastDelivery: string | null;

    successful: number;

    total: number;
  }
}

export interface EndpointRetrieveResponse {
  id: string;

  associatedEmails: Array<EndpointRetrieveResponse.AssociatedEmail>;

  catchAllDomains: Array<EndpointRetrieveResponse.CatchAllDomain>;

  config: unknown;

  createdAt: string | null;

  deliveryStats: EndpointRetrieveResponse.DeliveryStats;

  description: string | null;

  groupEmails: Array<string> | null;

  isActive: boolean;

  name: string;

  recentDeliveries: Array<EndpointRetrieveResponse.RecentDelivery>;

  type: 'webhook' | 'email' | 'email_group';

  updatedAt: string | null;

  userId: string;
}

export namespace EndpointRetrieveResponse {
  export interface AssociatedEmail {
    id: string;

    address: string;

    createdAt: string | null;

    isActive: boolean;
  }

  export interface CatchAllDomain {
    id: string;

    domain: string;

    status: string;
  }

  export interface DeliveryStats {
    failed: number;

    lastDelivery: string | null;

    successful: number;

    total: number;
  }

  export interface RecentDelivery {
    id: string;

    attempts: number;

    createdAt: string | null;

    deliveryType: string;

    emailId: string | null;

    lastAttemptAt: string | null;

    responseData: unknown;

    status: string;
  }
}

export interface EndpointUpdateResponse {
  id: string;

  config: unknown;

  createdAt: string | null;

  description: string | null;

  groupEmails: Array<string> | null;

  isActive: boolean;

  name: string;

  type: 'webhook' | 'email' | 'email_group';

  updatedAt: string | null;

  userId: string;
}

export interface EndpointListResponse {
  data: Array<EndpointListResponse.Data>;

  pagination: EndpointListResponse.Pagination;
}

export namespace EndpointListResponse {
  export interface Data {
    id: string;

    config: unknown;

    createdAt: string;

    deliveryStats: Data.DeliveryStats;

    description: string | null;

    groupEmails: Array<string> | null;

    isActive: boolean;

    name: string;

    type: 'webhook' | 'email' | 'email_group';

    updatedAt: string;

    userId: string;
  }

  export namespace Data {
    export interface DeliveryStats {
      failed: number;

      lastDelivery: string | null;

      successful: number;

      total: number;
    }
  }

  export interface Pagination {
    hasMore: boolean;

    limit: number;

    offset: number;

    total: number;
  }
}

export interface EndpointDeleteResponse {
  cleanup: EndpointDeleteResponse.Cleanup;

  message: string;
}

export namespace EndpointDeleteResponse {
  export interface Cleanup {
    deliveriesDeleted: number;

    domains: Array<string>;

    domainsUpdated: number;

    emailAddresses: Array<string>;

    emailAddressesUpdated: number;

    groupEmailsDeleted: number;
  }
}

export interface EndpointTestResponse {
  message: string;

  responseTime: number;

  success: boolean;

  error?: string;

  responseBody?: string;

  statusCode?: number;

  testPayload?: unknown;

  urlTested?: string;

  webhookFormat?: 'inbound' | 'discord' | 'slack';
}

export interface EndpointCreateParams {
  config:
    | EndpointCreateParams.WebhookConfig
    | EndpointCreateParams.EmailConfig
    | EndpointCreateParams.EmailGroupConfig;

  name: string;

  type: 'webhook' | 'email' | 'email_group';

  description?: string;
}

export namespace EndpointCreateParams {
  export interface WebhookConfig {
    url: string;

    /**
     * Custom headers to include with webhook requests
     */
    headers?: unknown;

    retryAttempts?: number;

    timeout?: number;
  }

  export interface EmailConfig {
    forwardTo: string;

    preserveHeaders?: boolean;
  }

  export interface EmailGroupConfig {
    emails: Array<string>;

    preserveHeaders?: boolean;
  }
}

export interface EndpointUpdateParams {
  config?:
    | EndpointUpdateParams.WebhookConfig
    | EndpointUpdateParams.EmailConfig
    | EndpointUpdateParams.EmailGroupConfig;

  description?: string;

  isActive?: boolean;

  name?: string;

  webhookFormat?: 'inbound' | 'discord' | 'slack';
}

export namespace EndpointUpdateParams {
  export interface WebhookConfig {
    url: string;

    /**
     * Custom headers to include with webhook requests
     */
    headers?: unknown;

    retryAttempts?: number;

    timeout?: number;
  }

  export interface EmailConfig {
    forwardTo: string;

    preserveHeaders?: boolean;
  }

  export interface EmailGroupConfig {
    emails: Array<string>;

    preserveHeaders?: boolean;
  }
}

export interface EndpointListParams {
  active?: 'true' | 'false';

  limit?: string | number;

  offset?: string | number;

  search?: string;

  sortBy?: 'newest' | 'oldest';

  type?: 'webhook' | 'email' | 'email_group';
}

export interface EndpointTestParams {
  overrideUrl?: string;

  webhookFormat?: 'inbound' | 'discord' | 'slack';
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
