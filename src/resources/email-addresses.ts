// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class EmailAddresses extends APIResource {
  /**
   * Create a new email address for receiving emails and configure AWS SES receipt
   * rules automatically.
   *
   * @example
   * ```ts
   * const emailAddress = await client.emailAddresses.create();
   * ```
   */
  create(
    body: EmailAddressCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EmailAddressCreateResponse> {
    return this._client.post('/v2/email-addresses', { body, ...options });
  }

  /**
   * Get detailed information about a specific email address including domain and
   * routing configuration.
   *
   * @example
   * ```ts
   * const emailAddress = await client.emailAddresses.retrieve(
   *   '123',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<EmailAddressRetrieveResponse> {
    return this._client.get(path`/v2/email-addresses/${id}`, options);
  }

  /**
   * Update an email address's routing configuration (endpoint, webhook, or disable
   * routing).
   *
   * @example
   * ```ts
   * const emailAddress = await client.emailAddresses.update(
   *   '123',
   * );
   * ```
   */
  update(
    id: string,
    body: EmailAddressUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EmailAddressUpdateResponse> {
    return this._client.put(path`/v2/email-addresses/${id}`, { body, ...options });
  }

  /**
   * Retrieve all email addresses for the authenticated user with filtering and
   * pagination options.
   *
   * @example
   * ```ts
   * const emailAddresses = await client.emailAddresses.list();
   * ```
   */
  list(
    query: EmailAddressListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EmailAddressListResponse> {
    return this._client.get('/v2/email-addresses', { query, ...options });
  }

  /**
   * Permanently delete an email address and update AWS SES receipt rules
   * accordingly.
   *
   * @example
   * ```ts
   * const emailAddress = await client.emailAddresses.delete(
   *   '123',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<EmailAddressDeleteResponse> {
    return this._client.delete(path`/v2/email-addresses/${id}`, options);
  }
}

export interface EmailAddressCreateResponse {
  id?: string;

  address?: string;

  createdAt?: string;

  domain?: EmailAddressCreateResponse.Domain;

  domainId?: string;

  endpointId?: string | null;

  isActive?: boolean;

  isReceiptRuleConfigured?: boolean;

  receiptRuleName?: string | null;

  routing?: EmailAddressCreateResponse.Routing;

  updatedAt?: string;

  userId?: string;

  warning?: string;

  webhookId?: string | null;
}

export namespace EmailAddressCreateResponse {
  export interface Domain {
    id?: string;

    name?: string;

    status?: string;
  }

  export interface Routing {
    id?: string | null;

    config?: unknown;

    isActive?: boolean;

    name?: string | null;

    type?: 'webhook' | 'endpoint' | 'none';
  }
}

export interface EmailAddressRetrieveResponse {
  id?: string;

  address?: string;

  createdAt?: string;

  domain?: EmailAddressRetrieveResponse.Domain;

  domainId?: string;

  endpointId?: string | null;

  isActive?: boolean;

  isReceiptRuleConfigured?: boolean;

  receiptRuleName?: string | null;

  routing?: EmailAddressRetrieveResponse.Routing;

  updatedAt?: string;

  userId?: string;

  webhookId?: string | null;
}

export namespace EmailAddressRetrieveResponse {
  export interface Domain {
    id?: string;

    name?: string;

    status?: string;
  }

  export interface Routing {
    id?: string | null;

    config?: unknown;

    isActive?: boolean;

    name?: string | null;

    type?: 'webhook' | 'endpoint' | 'none';
  }
}

export interface EmailAddressUpdateResponse {
  id?: string;

  address?: string;

  createdAt?: string;

  domain?: EmailAddressUpdateResponse.Domain;

  domainId?: string;

  endpointId?: string | null;

  isActive?: boolean;

  isReceiptRuleConfigured?: boolean;

  receiptRuleName?: string | null;

  routing?: EmailAddressUpdateResponse.Routing;

  updatedAt?: string;

  userId?: string;

  warning?: string;

  webhookId?: string | null;
}

export namespace EmailAddressUpdateResponse {
  export interface Domain {
    id?: string;

    name?: string;

    status?: string;
  }

  export interface Routing {
    id?: string | null;

    config?: unknown;

    isActive?: boolean;

    name?: string | null;

    type?: 'webhook' | 'endpoint' | 'none';
  }
}

export interface EmailAddressListResponse {
  data?: Array<EmailAddressListResponse.Data>;

  pagination?: EmailAddressListResponse.Pagination;
}

export namespace EmailAddressListResponse {
  export interface Data {
    id?: string;

    address?: string;

    createdAt?: string;

    domain?: Data.Domain;

    domainId?: string;

    endpointId?: string | null;

    isActive?: boolean;

    isReceiptRuleConfigured?: boolean;

    receiptRuleName?: string | null;

    routing?: Data.Routing;

    updatedAt?: string;

    userId?: string;

    webhookId?: string | null;
  }

  export namespace Data {
    export interface Domain {
      id?: string;

      name?: string;

      status?: string;
    }

    export interface Routing {
      id?: string | null;

      config?: unknown;

      isActive?: boolean;

      name?: string | null;

      type?: 'webhook' | 'endpoint' | 'none';
    }
  }

  export interface Pagination {
    hasMore?: boolean;

    limit?: number;

    offset?: number;

    total?: number;
  }
}

export interface EmailAddressDeleteResponse {
  cleanup?: EmailAddressDeleteResponse.Cleanup;

  message?: string;
}

export namespace EmailAddressDeleteResponse {
  export interface Cleanup {
    domain?: string;

    emailAddress?: string;

    sesRuleUpdated?: boolean;

    warning?: string;
  }
}

export interface EmailAddressCreateParams {
  address?: string;

  domainId?: string;

  endpointId?: string | null;

  isActive?: boolean | null;

  webhookId?: string | null;
}

export interface EmailAddressUpdateParams {
  endpointId?: string | null;

  isActive?: boolean | null;

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
