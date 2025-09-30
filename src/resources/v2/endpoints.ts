// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Endpoints extends APIResource {
  /**
   * Creates a new endpoint for receiving and routing emails. Supports three types:
   * webhook (POST to URL), email (forward to single address), and email_group
   * (forward to multiple addresses). Webhooks support custom headers, timeout
   * configuration (1-300s), and retry attempts (0-10). Email groups support up to 50
   * recipients with automatic deduplication. All endpoints start as active by
   * default and can be toggled later.
   *
   * @example
   * ```ts
   * const endpoint = await client.v2.endpoints.create({
   *   config: {},
   *   name: 'Production Webhook',
   *   type: 'webhook',
   * });
   * ```
   */
  create(body: EndpointCreateParams, options?: RequestOptions): APIPromise<EndpointCreateResponse> {
    return this._client.post('/api/v2/endpoints', { body, ...options });
  }

  /**
   * Retrieves detailed information about a specific endpoint including
   * configuration, delivery statistics (total/successful/failed deliveries, last
   * delivery time), recent delivery history (last 10 deliveries), associated email
   * addresses, and catch-all domains using this endpoint. Returns parsed
   * configuration with type-specific settings (webhook URL/headers, forwarding
   * addresses, group emails). Only endpoints belonging to the authenticated user can
   * be accessed.
   *
   * @example
   * ```ts
   * const endpoint = await client.v2.endpoints.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<EndpointRetrieveResponse> {
    return this._client.get(path`/api/v2/endpoints/${id}`, options);
  }

  /**
   * Updates an existing endpoint's configuration, name, description, or active
   * status. Supports updating webhook URLs/headers/timeout, email forwarding
   * addresses, and email group recipients. When updating email_group config,
   * automatically manages group entries (deletes old, creates new). Validates
   * configuration based on endpoint type. Only endpoints belonging to the
   * authenticated user can be updated.
   *
   * @example
   * ```ts
   * const endpoint = await client.v2.endpoints.update('id');
   * ```
   */
  update(
    id: string,
    body: EndpointUpdateParams,
    options?: RequestOptions,
  ): APIPromise<EndpointUpdateResponse> {
    return this._client.put(path`/api/v2/endpoints/${id}`, { body, ...options });
  }

  /**
   * Retrieves a paginated list of all endpoints for the authenticated user with
   * filtering by type (webhook, email, email_group) and active status. Returns
   * endpoint configuration, delivery statistics (total deliveries, successful/failed
   * counts, last delivery time), and group email lists for email_group endpoints.
   * Supports sorting by creation date (newest or oldest first).
   *
   * @example
   * ```ts
   * const endpoints = await client.v2.endpoints.list();
   * ```
   */
  list(
    query: EndpointListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EndpointListResponse> {
    return this._client.get('/api/v2/endpoints', { query, ...options });
  }

  /**
   * Deletes an endpoint and performs comprehensive cleanup. Updates associated email
   * addresses to store-only mode (clears endpointId), removes endpoint from
   * catch-all domain configurations, deletes email group entries (for email_group
   * type), and removes all delivery history records. Deletion is permanent and
   * cannot be undone. Only endpoints belonging to the authenticated user can be
   * deleted.
   *
   * @example
   * ```ts
   * const endpoint = await client.v2.endpoints.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<EndpointDeleteResponse> {
    return this._client.delete(path`/api/v2/endpoints/${id}`, options);
  }
}

export interface EndpointCreateResponse {
  /**
   * Unique endpoint identifier
   */
  id: string;

  /**
   * Parsed configuration object
   */
  config: unknown;

  /**
   * Creation timestamp
   */
  createdAt: string;

  deliveryStats: EndpointCreateResponse.DeliveryStats;

  /**
   * Active status (always true for new endpoints)
   */
  isActive: boolean;

  /**
   * Endpoint display name
   */
  name: string;

  /**
   * Endpoint type
   */
  type: 'webhook' | 'email' | 'email_group';

  /**
   * Last update timestamp
   */
  updatedAt: string;

  /**
   * Owner user ID
   */
  userId: string;

  /**
   * Endpoint description
   */
  description?: string | null;

  /**
   * Group emails (only for email_group type)
   */
  groupEmails?: Array<string> | null;
}

export namespace EndpointCreateResponse {
  export interface DeliveryStats {
    /**
     * Failed deliveries
     */
    failed: number;

    /**
     * Successful deliveries
     */
    successful: number;

    /**
     * Total deliveries (always 0 for new endpoints)
     */
    total: number;

    /**
     * Last delivery timestamp
     */
    lastDelivery?: string | null;
  }
}

export interface EndpointRetrieveResponse {
  /**
   * Unique endpoint identifier
   */
  id: string;

  /**
   * Email addresses using this endpoint
   */
  associatedEmails: Array<unknown>;

  /**
   * Domains using this as catch-all
   */
  catchAllDomains: Array<unknown>;

  /**
   * Parsed configuration
   */
  config: unknown;

  deliveryStats: EndpointRetrieveResponse.DeliveryStats;

  isActive: boolean;

  /**
   * Endpoint display name
   */
  name: string;

  /**
   * Last 10 delivery attempts
   */
  recentDeliveries: Array<unknown>;

  type: 'webhook' | 'email' | 'email_group';

  userId: string;

  createdAt?: string | null;

  description?: string | null;

  groupEmails?: Array<string> | null;

  updatedAt?: string | null;
}

export namespace EndpointRetrieveResponse {
  export interface DeliveryStats {
    failed?: number;

    lastDelivery?: string | null;

    successful?: number;

    total?: number;
  }
}

export interface EndpointUpdateResponse {
  /**
   * Endpoint identifier
   */
  id: string;

  /**
   * Parsed configuration
   */
  config: unknown;

  isActive: boolean;

  /**
   * Endpoint name
   */
  name: string;

  type: 'webhook' | 'email' | 'email_group';

  userId: string;

  createdAt?: string | null;

  description?: string | null;

  groupEmails?: Array<string> | null;

  updatedAt?: string | null;
}

export interface EndpointListResponse {
  /**
   * Array of endpoint objects with statistics
   */
  data: Array<EndpointListResponse.Data>;

  pagination: EndpointListResponse.Pagination;
}

export namespace EndpointListResponse {
  export interface Data {
    /**
     * Unique endpoint identifier
     */
    id: string;

    /**
     * Type-specific configuration (webhook URL, forwarding email, or group emails)
     */
    config: unknown;

    /**
     * Creation timestamp
     */
    createdAt: string;

    deliveryStats: Data.DeliveryStats;

    /**
     * Whether endpoint is active
     */
    isActive: boolean;

    /**
     * Endpoint display name
     */
    name: string;

    /**
     * Endpoint type
     */
    type: 'webhook' | 'email' | 'email_group';

    /**
     * Last update timestamp
     */
    updatedAt: string;

    /**
     * Owner user ID
     */
    userId: string;

    /**
     * Optional endpoint description
     */
    description?: string | null;

    /**
     * List of group emails (only for email_group type)
     */
    groupEmails?: Array<string> | null;
  }

  export namespace Data {
    export interface DeliveryStats {
      /**
       * Failed deliveries
       */
      failed: number;

      /**
       * Successful deliveries
       */
      successful: number;

      /**
       * Total delivery attempts
       */
      total: number;

      /**
       * Timestamp of last delivery
       */
      lastDelivery?: string | null;
    }
  }

  export interface Pagination {
    /**
     * Whether more pages exist
     */
    hasMore: boolean;

    /**
     * Items per page
     */
    limit: number;

    /**
     * Items skipped
     */
    offset: number;

    /**
     * Total endpoints count
     */
    total: number;
  }
}

export interface EndpointDeleteResponse {
  cleanup: EndpointDeleteResponse.Cleanup;

  /**
   * Success message
   */
  message: string;
}

export namespace EndpointDeleteResponse {
  export interface Cleanup {
    /**
     * Number of delivery records deleted
     */
    deliveriesDeleted: number;

    /**
     * List of affected domains
     */
    domains: Array<string>;

    /**
     * Number of domains with catch-all removed
     */
    domainsUpdated: number;

    /**
     * List of affected email addresses
     */
    emailAddresses: Array<string>;

    /**
     * Number of email addresses updated to store-only
     */
    emailAddressesUpdated: number;

    /**
     * Number of group email entries deleted
     */
    groupEmailsDeleted: number;
  }
}

export interface EndpointCreateParams {
  /**
   * Type-specific configuration object
   */
  config: unknown;

  /**
   * Endpoint display name
   */
  name: string;

  /**
   * Endpoint type
   */
  type: 'webhook' | 'email' | 'email_group';

  /**
   * Optional endpoint description
   */
  description?: string;
}

export interface EndpointUpdateParams {
  /**
   * Updated endpoint configuration
   */
  config?: unknown;

  /**
   * Updated endpoint description
   */
  description?: string;

  /**
   * Updated active status
   */
  isActive?: boolean;

  /**
   * Updated endpoint name
   */
  name?: string;

  /**
   * Webhook format (only for webhook type)
   */
  webhookFormat?: 'inbound' | 'discord' | 'slack';
}

export interface EndpointListParams {
  /**
   * Filter by active status. Values: 'true', 'false'
   */
  active?: string;

  /**
   * Maximum number of endpoints to return. Min: 1, Max: 100, Default: 50
   */
  limit?: number;

  /**
   * Number of endpoints to skip for pagination. Min: 0, Default: 0
   */
  offset?: number;

  /**
   * Sort order. Values: 'newest', 'oldest'. Default: newest
   */
  sortBy?: string;

  /**
   * Filter by endpoint type. Values: 'webhook', 'email', 'email_group'
   */
  type?: string;
}

export declare namespace Endpoints {
  export {
    type EndpointCreateResponse as EndpointCreateResponse,
    type EndpointRetrieveResponse as EndpointRetrieveResponse,
    type EndpointUpdateResponse as EndpointUpdateResponse,
    type EndpointListResponse as EndpointListResponse,
    type EndpointDeleteResponse as EndpointDeleteResponse,
    type EndpointCreateParams as EndpointCreateParams,
    type EndpointUpdateParams as EndpointUpdateParams,
    type EndpointListParams as EndpointListParams,
  };
}
