// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class Domains extends APIResource {
  /**
   * Add a new domain for email receiving. Automatically initiates verification and
   * returns required DNS records. Subdomains inherit verification from their
   * verified parent domain.
   */
  create(body: DomainCreateParams, options?: RequestOptions): APIPromise<DomainCreateResponse> {
    return this._client.post(
      '/api/e2/domains',
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Get detailed information about a specific domain including DNS records. Use
   * `?check=true` for a live verification check.
   */
  retrieve(
    id: string,
    query: DomainRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DomainRetrieveResponse> {
    return this._client.get(path`/api/e2/domains/${id}`, { query, ...options });
  }

  /**
   * Update catch-all email settings for a domain. Catch-all receives emails sent to
   * any address on your domain. Domain must be verified first.
   */
  update(id: string, body: DomainUpdateParams, options?: RequestOptions): APIPromise<DomainUpdateResponse> {
    return this._client.patch(
      path`/api/e2/domains/${id}`,
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Get paginated list of domains for authenticated user with optional filtering.
   */
  list(
    query: DomainListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DomainListResponse> {
    return this._client.get('/api/e2/domains', { query, ...options });
  }

  /**
   * Delete a domain and all associated resources including email addresses, DNS
   * records, and SES configurations. Root domains with subdomains must have
   * subdomains deleted first.
   */
  delete(id: string, options?: RequestOptions): APIPromise<DomainDeleteResponse> {
    return this._client.delete(path`/api/e2/domains/${id}`, options);
  }
}

export interface DomainCreateResponse {
  id: string;

  canReceiveEmails: boolean;

  createdAt: string;

  dnsRecords: Array<DomainCreateResponse.DNSRecord>;

  domain: string;

  domainProvider: string | null;

  hasMxRecords: boolean;

  providerConfidence: string | null;

  status: 'pending' | 'verified' | 'failed';

  updatedAt: string;

  dnsConflict?: DomainCreateResponse.DNSConflict;

  mailFromDomain?: string;

  mailFromDomainStatus?: string;

  message?: string;

  parentDomain?: string;
}

export namespace DomainCreateResponse {
  export interface DNSRecord {
    isRequired: boolean;

    name: string;

    type: string;

    value: string;

    description?: string;
  }

  export interface DNSConflict {
    hasConflict: boolean;

    message: string;

    conflictType?: 'mx' | 'cname' | 'both';

    existingRecords?: Array<DNSConflict.ExistingRecord>;
  }

  export namespace DNSConflict {
    export interface ExistingRecord {
      type: string;

      value: string;
    }
  }
}

export interface DomainRetrieveResponse {
  id: string;

  canReceiveEmails: boolean;

  catchAllEndpointId: string | null;

  createdAt: string;

  dnsRecords: Array<DomainRetrieveResponse.DNSRecord>;

  domain: string;

  domainProvider: string | null;

  hasMxRecords: boolean;

  isCatchAllEnabled: boolean;

  lastDnsCheck: string | null;

  lastSesCheck: string | null;

  mailFromDomain: string | null;

  mailFromDomainStatus: string | null;

  mailFromDomainVerifiedAt: string | null;

  providerConfidence: string | null;

  receiveDmarcEmails: boolean;

  stats: DomainRetrieveResponse.Stats;

  status: string;

  updatedAt: string;

  userId: string;

  authRecommendations?: DomainRetrieveResponse.AuthRecommendations;

  catchAllEndpoint?: DomainRetrieveResponse.CatchAllEndpoint | null;

  inheritsFromParent?: boolean;

  parentDomain?: string | null;

  verificationCheck?: DomainRetrieveResponse.VerificationCheck;
}

export namespace DomainRetrieveResponse {
  export interface DNSRecord {
    id: string;

    createdAt: string;

    domainId: string;

    isRequired: boolean;

    isVerified: boolean;

    lastChecked: string | null;

    name: string;

    recordType: string;

    value: string;
  }

  export interface Stats {
    activeEmailAddresses: number;

    emailsLast24h: number;

    emailsLast30d: number;

    emailsLast7d: number;

    totalEmailAddresses: number;
  }

  export interface AuthRecommendations {
    dmarc?: AuthRecommendations.Dmarc;

    spf?: AuthRecommendations.Spf;
  }

  export namespace AuthRecommendations {
    export interface Dmarc {
      description: string;

      name: string;

      value: string;
    }

    export interface Spf {
      description: string;

      name: string;

      value: string;
    }
  }

  export interface CatchAllEndpoint {
    id: string;

    isActive: boolean;

    name: string;

    type: string;
  }

  export interface VerificationCheck {
    dnsRecords: Array<VerificationCheck.DNSRecord>;

    isFullyVerified: boolean;

    lastChecked: string;

    sesStatus: string;

    dkimStatus?: string;

    dkimTokens?: Array<string>;

    dkimVerified?: boolean;

    mailFromDomain?: string;

    mailFromStatus?: string;

    mailFromVerified?: boolean;
  }

  export namespace VerificationCheck {
    export interface DNSRecord {
      isVerified: boolean;

      name: string;

      type: string;

      value: string;

      error?: string;
    }
  }
}

export interface DomainUpdateResponse {
  id: string;

  catchAllEndpointId: string | null;

  domain: string;

  isCatchAllEnabled: boolean;

  status: string;

  updatedAt: string;

  catchAllEndpoint?: DomainUpdateResponse.CatchAllEndpoint | null;
}

export namespace DomainUpdateResponse {
  export interface CatchAllEndpoint {
    id: string;

    isActive: boolean;

    name: string;

    type: string;
  }
}

export interface DomainListResponse {
  data: Array<DomainListResponse.Data>;

  pagination: DomainListResponse.Pagination;
}

export namespace DomainListResponse {
  export interface Data {
    id: string;

    canReceiveEmails: boolean;

    catchAllEndpointId: string | null;

    createdAt: string;

    domain: string;

    domainProvider: string | null;

    hasMxRecords: boolean;

    isCatchAllEnabled: boolean;

    lastDnsCheck: string | null;

    lastSesCheck: string | null;

    mailFromDomain: string | null;

    mailFromDomainStatus: string | null;

    mailFromDomainVerifiedAt: string | null;

    providerConfidence: string | null;

    receiveDmarcEmails: boolean;

    stats: Data.Stats;

    status: string;

    updatedAt: string;

    userId: string;

    catchAllEndpoint?: Data.CatchAllEndpoint | null;

    verificationCheck?: Data.VerificationCheck;
  }

  export namespace Data {
    export interface Stats {
      activeEmailAddresses: number;

      hasCatchAll: boolean;

      totalEmailAddresses: number;
    }

    export interface CatchAllEndpoint {
      id: string;

      isActive: boolean;

      name: string;

      type: string;
    }

    export interface VerificationCheck {
      dnsRecords: Array<VerificationCheck.DNSRecord>;

      isFullyVerified: boolean;

      lastChecked: string;

      sesStatus: string;
    }

    export namespace VerificationCheck {
      export interface DNSRecord {
        isVerified: boolean;

        name: string;

        type: string;

        value: string;

        error?: string;
      }
    }
  }

  export interface Pagination {
    hasMore: boolean;

    limit: number;

    offset: number;

    total: number;
  }
}

export interface DomainDeleteResponse {
  deletedResources: DomainDeleteResponse.DeletedResources;

  message: string;

  success: boolean;
}

export namespace DomainDeleteResponse {
  export interface DeletedResources {
    blockedEmails: number;

    dnsRecords: number;

    domain: string;

    emailAddresses: number;

    sesIdentity: boolean;

    sesReceiptRules: boolean;
  }
}

export interface DomainCreateParams {
  domain: string;
}

export interface DomainRetrieveParams {
  check?: 'true';
}

export interface DomainUpdateParams {
  isCatchAllEnabled: boolean;

  catchAllEndpointId?: string | null;
}

export interface DomainListParams {
  canReceive?: 'true' | 'false';

  check?: 'true';

  limit?: number;

  offset?: number;

  status?: 'pending' | 'verified' | 'failed';
}

export declare namespace Domains {
  export {
    type DomainCreateResponse as DomainCreateResponse,
    type DomainRetrieveResponse as DomainRetrieveResponse,
    type DomainUpdateResponse as DomainUpdateResponse,
    type DomainListResponse as DomainListResponse,
    type DomainDeleteResponse as DomainDeleteResponse,
    type DomainCreateParams as DomainCreateParams,
    type DomainRetrieveParams as DomainRetrieveParams,
    type DomainUpdateParams as DomainUpdateParams,
    type DomainListParams as DomainListParams,
  };
}
