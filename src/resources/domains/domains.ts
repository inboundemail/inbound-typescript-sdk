// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AuthAPI from './auth';
import { Auth, AuthCreateParams, AuthCreateResponse, AuthUpdateResponse } from './auth';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Domains extends APIResource {
  auth: AuthAPI.Auth = new AuthAPI.Auth(this._client);

  /**
   * POST /domains
   */
  create(body: DomainCreateParams, options?: RequestOptions): APIPromise<DomainCreateResponse> {
    return this._client.post('/api/v2/domains', { body, ...options });
  }

  /**
   * GET /domains/{id}
   */
  retrieve(
    pathID: string,
    query: DomainRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<DomainRetrieveResponse> {
    return this._client.get(path`/api/v2/domains/${pathID}`, { query, ...options });
  }

  /**
   * PATCH /domains/{id}
   */
  update(id: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.patch(path`/api/v2/domains/${id}`, options);
  }

  /**
   * GET /domains
   */
  list(
    query: DomainListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DomainListResponse> {
    return this._client.get('/api/v2/domains', { query, ...options });
  }

  /**
   * DELETE /domains/{id}
   */
  delete(id: string, options?: RequestOptions): APIPromise<DomainDeleteResponse> {
    return this._client.delete(path`/api/v2/domains/${id}`, options);
  }

  /**
   * GET /domains/{id}/dns-records
   */
  listDNSRecords(id: string, options?: RequestOptions): APIPromise<DomainListDNSRecordsResponse> {
    return this._client.get(path`/api/v2/domains/${id}/dns-records`, options);
  }
}

export interface DomainCreateResponse {
  id: string;

  canReceiveEmails: boolean;

  createdAt: string;

  dnsRecords: string;

  domain: string;

  domainProvider: string;

  hasMxRecords: boolean;

  providerConfidence: string;

  status: 'pending' | 'verified' | 'failed';

  updatedAt: string;

  mailFromDomain?: string;

  mailFromDomainStatus?: string;
}

export interface DomainRetrieveResponse {
  id: string;

  canReceiveEmails: boolean;

  catchAllEndpointId: string;

  createdAt: string;

  domain: string;

  domainProvider: string;

  hasMxRecords: boolean;

  isCatchAllEnabled: boolean;

  lastDnsCheck: 'Date' | 'null';

  lastSesCheck: 'Date' | 'null';

  mailFromDomain: string;

  mailFromDomainStatus: string;

  mailFromDomainVerifiedAt: 'Date' | 'null';

  providerConfidence: string;

  stats: string;

  status: string;

  updatedAt: string;

  userId: string;

  authRecommendations?: string;

  catchAllEndpoint?: string;

  verificationCheck?: string;
}

export type DomainUpdateResponse = unknown;

export interface DomainListResponse {
  data: Array<string>;

  meta: number;

  pagination: number;
}

/**
 * DELETE /api/v2/domains/{id} Deletes a domain and all associated resources
 * Supports both session-based auth and API key auth Has tests? ⏳ Has logging? ✅
 * Has types? ✅
 */
export interface DomainDeleteResponse {
  deletedResources: string;

  message: string;

  success: boolean;
}

export interface DomainListDNSRecordsResponse {
  domain: string;

  domainId: string;

  records: Array<string>;
}

export interface DomainCreateParams {
  domain: string;
}

export interface DomainRetrieveParams {
  /**
   * id parameter
   */
  query_id: string;
}

export interface DomainListParams {
  /**
   * canReceive parameter
   */
  canReceive?: 'true' | 'false' | 'undefined';

  /**
   * check parameter
   */
  check?: 'true' | 'false' | 'undefined';

  /**
   * limit parameter
   */
  limit?: number;

  /**
   * offset parameter
   */
  offset?: number;

  /**
   * status parameter
   */
  status?: 'pending' | 'verified' | 'failed' | 'undefined';
}

Domains.Auth = Auth;

export declare namespace Domains {
  export {
    type DomainCreateResponse as DomainCreateResponse,
    type DomainRetrieveResponse as DomainRetrieveResponse,
    type DomainUpdateResponse as DomainUpdateResponse,
    type DomainListResponse as DomainListResponse,
    type DomainDeleteResponse as DomainDeleteResponse,
    type DomainListDNSRecordsResponse as DomainListDNSRecordsResponse,
    type DomainCreateParams as DomainCreateParams,
    type DomainRetrieveParams as DomainRetrieveParams,
    type DomainListParams as DomainListParams,
  };

  export {
    Auth as Auth,
    type AuthCreateResponse as AuthCreateResponse,
    type AuthUpdateResponse as AuthUpdateResponse,
    type AuthCreateParams as AuthCreateParams,
  };
}
