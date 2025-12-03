// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

export class EmailAddresses extends APIResource {
  /**
   * Get a specific email address by ID with detailed information including routing
   * configuration
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<EmailAddressRetrieveResponse> {
    return this._client.get(path`/api/e2/email-addresses/${id}`, options);
  }

  /**
   * Update an email address's routing (endpoint/webhook) or active status. Cannot
   * have both endpoint and webhook.
   */
  update(
    id: string,
    body: EmailAddressUpdateParams,
    options?: RequestOptions,
  ): APIPromise<EmailAddressUpdateResponse> {
    return this._client.put(
      path`/api/e2/email-addresses/${id}`,
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Delete an email address and clean up associated SES receipt rules. Returns
   * cleanup status.
   */
  delete(id: string, options?: RequestOptions): APIPromise<EmailAddressDeleteResponse> {
    return this._client.delete(path`/api/e2/email-addresses/${id}`, options);
  }

  /**
   * Create a new email address for an authenticated user's domain. Automatically
   * configures AWS SES receipt rules.
   */
  emailAddresses(
    body: EmailAddressEmailAddressesParams,
    options?: RequestOptions,
  ): APIPromise<EmailAddressEmailAddressesResponse> {
    return this._client.post(
      '/api/e2/email-addresses',
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Get paginated list of email addresses for authenticated user with optional
   * filtering by domain, active status, and receipt rule configuration
   */
  retrieveEmailAddresses(
    query: EmailAddressRetrieveEmailAddressesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EmailAddressRetrieveEmailAddressesResponse> {
    return this._client.get('/api/e2/email-addresses', { query, ...options });
  }
}

export interface EmailAddressRetrieveResponse {
  id: string;

  address: string;

  createdAt: unknown | (string & {}) | (string & {}) | number;

  domain: EmailAddressRetrieveResponse.Domain;

  domainId: string;

  endpointId: string | null;

  isActive: boolean;

  isReceiptRuleConfigured: boolean;

  receiptRuleName: string | null;

  routing: EmailAddressRetrieveResponse.Routing;

  updatedAt: unknown | (string & {}) | (string & {}) | number;

  userId: string;

  webhookId: string | null;
}

export namespace EmailAddressRetrieveResponse {
  export interface Domain {
    id: string;

    name: string;

    status: string;
  }

  export interface Routing {
    id: string | null;

    isActive: boolean;

    name: string | null;

    type: 'webhook' | 'endpoint' | 'none';

    config?: unknown;
  }
}

export interface EmailAddressUpdateResponse {
  id: string;

  address: string;

  createdAt: unknown | (string & {}) | (string & {}) | number;

  domain: EmailAddressUpdateResponse.Domain;

  domainId: string;

  endpointId: string | null;

  isActive: boolean;

  isReceiptRuleConfigured: boolean;

  receiptRuleName: string | null;

  routing: EmailAddressUpdateResponse.Routing;

  updatedAt: unknown | (string & {}) | (string & {}) | number;

  userId: string;

  webhookId: string | null;

  warning?: string;
}

export namespace EmailAddressUpdateResponse {
  export interface Domain {
    id: string;

    name: string;

    status: string;
  }

  export interface Routing {
    id: string | null;

    isActive: boolean;

    name: string | null;

    type: 'webhook' | 'endpoint' | 'none';

    config?: unknown;
  }
}

export interface EmailAddressDeleteResponse {
  cleanup: EmailAddressDeleteResponse.Cleanup;

  message: string;
}

export namespace EmailAddressDeleteResponse {
  export interface Cleanup {
    domain: string;

    emailAddress: string;

    sesRuleUpdated: boolean;

    warning?: string;
  }
}

export interface EmailAddressEmailAddressesResponse {
  id: string;

  address: string;

  createdAt: unknown | (string & {}) | (string & {}) | number;

  domain: EmailAddressEmailAddressesResponse.Domain;

  domainId: string;

  endpointId: string | null;

  isActive: boolean;

  isReceiptRuleConfigured: boolean;

  receiptRuleName: string | null;

  routing: EmailAddressEmailAddressesResponse.Routing;

  updatedAt: unknown | (string & {}) | (string & {}) | number;

  userId: string;

  webhookId: string | null;

  warning?: string;
}

export namespace EmailAddressEmailAddressesResponse {
  export interface Domain {
    id: string;

    name: string;

    status: string;
  }

  export interface Routing {
    id: string | null;

    isActive: boolean;

    name: string | null;

    type: 'webhook' | 'endpoint' | 'none';

    config?: unknown;
  }
}

export interface EmailAddressRetrieveEmailAddressesResponse {
  data: Array<EmailAddressRetrieveEmailAddressesResponse.Data>;

  pagination: EmailAddressRetrieveEmailAddressesResponse.Pagination;
}

export namespace EmailAddressRetrieveEmailAddressesResponse {
  export interface Data {
    id: string;

    address: string;

    createdAt: unknown | (string & {}) | (string & {}) | number;

    domain: Data.Domain;

    domainId: string;

    endpointId: string | null;

    isActive: boolean;

    isReceiptRuleConfigured: boolean;

    receiptRuleName: string | null;

    routing: Data.Routing;

    updatedAt: unknown | (string & {}) | (string & {}) | number;

    userId: string;

    webhookId: string | null;
  }

  export namespace Data {
    export interface Domain {
      id: string;

      name: string;

      status: string;
    }

    export interface Routing {
      id: string | null;

      isActive: boolean;

      name: string | null;

      type: 'webhook' | 'endpoint' | 'none';

      config?: unknown;
    }
  }

  export interface Pagination {
    hasMore: boolean;

    limit: number;

    offset: number;

    total: number;
  }
}

export interface EmailAddressUpdateParams {
  endpointId?: string | null;

  isActive?: boolean;

  webhookId?: string | null;
}

export interface EmailAddressEmailAddressesParams {
  address: string;

  domainId: string;

  endpointId?: string;

  isActive?: boolean;

  webhookId?: string;
}

export interface EmailAddressRetrieveEmailAddressesParams {
  domainId?: string;

  isActive?: 'true' | 'false';

  isReceiptRuleConfigured?: 'true' | 'false';

  limit?: number;

  offset?: number;
}

export declare namespace EmailAddresses {
  export {
    type EmailAddressRetrieveResponse as EmailAddressRetrieveResponse,
    type EmailAddressUpdateResponse as EmailAddressUpdateResponse,
    type EmailAddressDeleteResponse as EmailAddressDeleteResponse,
    type EmailAddressEmailAddressesResponse as EmailAddressEmailAddressesResponse,
    type EmailAddressRetrieveEmailAddressesResponse as EmailAddressRetrieveEmailAddressesResponse,
    type EmailAddressUpdateParams as EmailAddressUpdateParams,
    type EmailAddressEmailAddressesParams as EmailAddressEmailAddressesParams,
    type EmailAddressRetrieveEmailAddressesParams as EmailAddressRetrieveEmailAddressesParams,
  };
}
