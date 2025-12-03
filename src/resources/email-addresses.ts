// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class EmailAddresses extends APIResource {
  /**
   * Create a new email address for an authenticated user's domain. Automatically
   * configures AWS SES receipt rules.
   */
  create(body: EmailAddressCreateParams, options?: RequestOptions): APIPromise<EmailAddressCreateResponse> {
    return this._client.post(
      '/api/e2/email-addresses',
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

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
   * Get paginated list of email addresses for authenticated user with optional
   * filtering by domain, active status, and receipt rule configuration
   */
  list(
    query: EmailAddressListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EmailAddressListResponse> {
    return this._client.get('/api/e2/email-addresses', { query, ...options });
  }

  /**
   * Delete an email address and clean up associated SES receipt rules. Returns
   * cleanup status.
   */
  delete(id: string, options?: RequestOptions): APIPromise<EmailAddressDeleteResponse> {
    return this._client.delete(path`/api/e2/email-addresses/${id}`, options);
  }
}

export interface EmailAddressCreateResponse {
  id: string;

  address: string;

  createdAt: string;

  domain: EmailAddressCreateResponse.Domain;

  domainId: string;

  endpointId: string | null;

  isActive: boolean;

  isReceiptRuleConfigured: boolean;

  receiptRuleName: string | null;

  routing: EmailAddressCreateResponse.Routing;

  updatedAt: string;

  userId: string;

  webhookId: string | null;

  warning?: string;
}

export namespace EmailAddressCreateResponse {
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

export interface EmailAddressRetrieveResponse {
  id: string;

  address: string;

  createdAt: string;

  domain: EmailAddressRetrieveResponse.Domain;

  domainId: string;

  endpointId: string | null;

  isActive: boolean;

  isReceiptRuleConfigured: boolean;

  receiptRuleName: string | null;

  routing: EmailAddressRetrieveResponse.Routing;

  updatedAt: string;

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

  createdAt: string;

  domain: EmailAddressUpdateResponse.Domain;

  domainId: string;

  endpointId: string | null;

  isActive: boolean;

  isReceiptRuleConfigured: boolean;

  receiptRuleName: string | null;

  routing: EmailAddressUpdateResponse.Routing;

  updatedAt: string;

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

export interface EmailAddressListResponse {
  data: Array<EmailAddressListResponse.Data>;

  pagination: EmailAddressListResponse.Pagination;
}

export namespace EmailAddressListResponse {
  export interface Data {
    id: string;

    address: string;

    createdAt: string;

    domain: Data.Domain;

    domainId: string;

    endpointId: string | null;

    isActive: boolean;

    isReceiptRuleConfigured: boolean;

    receiptRuleName: string | null;

    routing: Data.Routing;

    updatedAt: string;

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

export interface EmailAddressCreateParams {
  address: string;

  domainId: string;

  endpointId?: string;

  isActive?: boolean;

  webhookId?: string;
}

export interface EmailAddressUpdateParams {
  endpointId?: string | null;

  isActive?: boolean;

  webhookId?: string | null;
}

export interface EmailAddressListParams {
  domainId?: string;

  isActive?: 'true' | 'false';

  isReceiptRuleConfigured?: 'true' | 'false';

  limit?: number;

  offset?: number;
}

export declare namespace EmailAddresses {
  export {
    type EmailAddressCreateResponse as EmailAddressCreateResponse,
    type EmailAddressRetrieveResponse as EmailAddressRetrieveResponse,
    type EmailAddressUpdateResponse as EmailAddressUpdateResponse,
    type EmailAddressListResponse as EmailAddressListResponse,
    type EmailAddressDeleteResponse as EmailAddressDeleteResponse,
    type EmailAddressCreateParams as EmailAddressCreateParams,
    type EmailAddressUpdateParams as EmailAddressUpdateParams,
    type EmailAddressListParams as EmailAddressListParams,
  };
}
