// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class EmailAddresses extends APIResource {
  /**
   * POST /email-addresses
   */
  create(body: EmailAddressCreateParams, options?: RequestOptions): APIPromise<EmailAddressCreateResponse> {
    return this._client.post('/api/v2/email-addresses', { body, ...options });
  }

  /**
   * GET /email-addresses/{id}
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<EmailAddressRetrieveResponse> {
    return this._client.get(path`/api/v2/email-addresses/${id}`, options);
  }

  /**
   * PUT /email-addresses/{id}
   */
  update(
    id: string,
    body: EmailAddressUpdateParams,
    options?: RequestOptions,
  ): APIPromise<EmailAddressUpdateResponse> {
    return this._client.put(path`/api/v2/email-addresses/${id}`, { body, ...options });
  }

  /**
   * GET /email-addresses
   */
  list(
    query: EmailAddressListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EmailAddressListResponse> {
    return this._client.get('/api/v2/email-addresses', { query, ...options });
  }

  /**
   * DELETE /email-addresses/{id}
   */
  delete(id: string, options?: RequestOptions): APIPromise<EmailAddressDeleteResponse> {
    return this._client.delete(path`/api/v2/email-addresses/${id}`, options);
  }
}

export interface EmailAddressCreateResponse {
  id: string;

  address: string;

  createdAt: string;

  domain: string;

  domainId: string;

  endpointId: string;

  isActive: boolean;

  isReceiptRuleConfigured: boolean;

  receiptRuleName: string;

  routing: string;

  updatedAt: string;

  userId: string;

  webhookId: string;

  warning?: string;
}

/**
 * GET /api/v2/email-addresses/[id] Gets a specific email address by ID with
 * detailed information Supports both session-based auth and API key auth Has
 * tests? ⏳ Has logging? ✅ Has types? ✅
 */
export interface EmailAddressRetrieveResponse {
  id: string;

  address: string;

  createdAt: string;

  domain: string;

  domainId: string;

  endpointId: string;

  isActive: boolean;

  isReceiptRuleConfigured: boolean;

  receiptRuleName: string;

  routing: string;

  updatedAt: string;

  userId: string;

  webhookId: string;
}

export interface EmailAddressUpdateResponse {
  id: string;

  address: string;

  createdAt: string;

  domain: string;

  domainId: string;

  endpointId: string;

  isActive: boolean;

  isReceiptRuleConfigured: boolean;

  receiptRuleName: string;

  routing: string;

  updatedAt: string;

  userId: string;

  webhookId: string;

  warning?: string;
}

export interface EmailAddressListResponse {
  data: Array<string>;

  pagination: number;
}

/**
 * DELETE /api/v2/email-addresses/[id] Deletes an email address and cleans up SES
 * rules Supports both session-based auth and API key auth Has tests? ⏳ Has
 * logging? ✅ Has types? ✅
 */
export interface EmailAddressDeleteResponse {
  cleanup: string;

  message: string;
}

export interface EmailAddressCreateParams {
  address: string;

  domainId: string;

  endpointId?: string;

  isActive?: boolean;

  webhookId?: string;
}

export interface EmailAddressUpdateParams {
  endpointId?: string;

  isActive?: boolean;

  webhookId?: string;
}

export interface EmailAddressListParams {
  /**
   * domainId parameter
   */
  domainId?: string;

  /**
   * isActive parameter
   */
  isActive?: 'true' | 'false' | 'undefined';

  /**
   * isReceiptRuleConfigured parameter
   */
  isReceiptRuleConfigured?: 'true' | 'false' | 'undefined';

  /**
   * limit parameter
   */
  limit?: number;

  /**
   * offset parameter
   */
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
