// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AuthAPI from './auth';
import {
  Auth,
  AuthInitializeParams,
  AuthInitializeResponse,
  AuthVerifyParams,
  AuthVerifyResponse,
} from './auth';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Domains extends APIResource {
  auth: AuthAPI.Auth = new AuthAPI.Auth(this._client);

  /**
   * Add a new domain for email receiving. Validates domain ownership and sets up DNS
   * verification records.
   *
   * @example
   * ```ts
   * const domain = await client.domains.create();
   * ```
   */
  create(
    body: DomainCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DomainCreateResponse> {
    return this._client.post('/v2/domains', { body, ...options });
  }

  /**
   * Get detailed information about a specific domain including verification status,
   * statistics, and optional DNS/SES checks.
   *
   * @example
   * ```ts
   * const domain = await client.domains.retrieve('123');
   * ```
   */
  retrieve(
    pathID: string,
    query: DomainRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DomainRetrieveResponse> {
    return this._client.get(path`/v2/domains/${pathID}`, { query, ...options });
  }

  /**
   * Retrieve all domains for the authenticated user with filtering, pagination, and
   * optional DNS/SES verification checks.
   *
   * @example
   * ```ts
   * const domains = await client.domains.list();
   * ```
   */
  list(
    query: DomainListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DomainListResponse> {
    return this._client.get('/v2/domains', { query, ...options });
  }

  /**
   * Permanently delete a domain and all its associated resources (email addresses,
   * DNS records, AWS SES configuration).
   *
   * @example
   * ```ts
   * const domain = await client.domains.delete('123');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<DomainDeleteResponse> {
    return this._client.delete(path`/v2/domains/${id}`, options);
  }

  /**
   * Retrieve all DNS records associated with a domain, including verification status
   * for each record.
   *
   * @example
   * ```ts
   * const response = await client.domains.retrieveDNSRecords(
   *   '123',
   * );
   * ```
   */
  retrieveDNSRecords(id: string, options?: RequestOptions): APIPromise<DomainRetrieveDNSRecordsResponse> {
    return this._client.get(path`/v2/domains/${id}/dns-records`, options);
  }

  /**
   * Configure catch-all email routing for a domain. Enable or disable catch-all
   * functionality with endpoint configuration.
   *
   * @example
   * ```ts
   * const response = await client.domains.updateCatchAll('123');
   * ```
   */
  updateCatchAll(
    id: string,
    body: DomainUpdateCatchAllParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DomainUpdateCatchAllResponse> {
    return this._client.put(path`/v2/domains/${id}`, { body, ...options });
  }

  /**
   * Upgrade an existing domain with MAIL FROM domain configuration to eliminate the
   * "via amazonses.com" attribution in emails.
   *
   * @example
   * ```ts
   * const response = await client.domains.upgradeMailFrom(
   *   '123',
   * );
   * ```
   */
  upgradeMailFrom(
    id: string,
    params: DomainUpgradeMailFromParams | null | undefined = undefined,
    options?: RequestOptions,
  ): APIPromise<DomainUpgradeMailFromResponse> {
    const { body } = params ?? {};
    return this._client.patch(path`/v2/domains/${id}`, { body: body, ...options });
  }
}

export interface DomainCreateResponse {
  id?: string;

  canReceiveEmails?: boolean;

  createdAt?: string;

  dnsRecords?: Array<DomainCreateResponse.DNSRecord>;

  domain?: string;

  domainProvider?: string | null;

  hasMxRecords?: boolean;

  mailFromDomain?: string;

  mailFromDomainStatus?: string;

  providerConfidence?: string | null;

  status?: 'pending' | 'verified' | 'failed';

  updatedAt?: string;
}

export namespace DomainCreateResponse {
  export interface DNSRecord {
    description?: string;

    isRequired?: boolean;

    name?: string;

    type?: string;

    value?: string;
  }
}

export interface DomainRetrieveResponse {
  id?: string;

  authRecommendations?: DomainRetrieveResponse.AuthRecommendations;

  canReceiveEmails?: boolean;

  /**
   * Additional fields when check=true
   */
  catchAllEndpoint?: DomainRetrieveResponse.CatchAllEndpoint | null;

  catchAllEndpointId?: string | null;

  createdAt?: string;

  domain?: string;

  domainProvider?: string | null;

  hasMxRecords?: boolean;

  isCatchAllEnabled?: boolean;

  lastDnsCheck?: string | null;

  lastSesCheck?: string | null;

  mailFromDomain?: string | null;

  mailFromDomainStatus?: string | null;

  mailFromDomainVerifiedAt?: string | null;

  providerConfidence?: string | null;

  stats?: DomainRetrieveResponse.Stats;

  status?: string;

  updatedAt?: string;

  userId?: string;

  /**
   * Recommendations when records are missing
   */
  verificationCheck?: DomainRetrieveResponse.VerificationCheck;
}

export namespace DomainRetrieveResponse {
  export interface AuthRecommendations {
    dmarc?: AuthRecommendations.Dmarc;

    spf?: AuthRecommendations.Spf;
  }

  export namespace AuthRecommendations {
    export interface Dmarc {
      description?: string;

      name?: string;

      value?: string;
    }

    export interface Spf {
      description?: string;

      name?: string;

      value?: string;
    }
  }

  /**
   * Additional fields when check=true
   */
  export interface CatchAllEndpoint {
    id?: string;

    isActive?: boolean;

    name?: string;

    type?: string;
  }

  export interface Stats {
    activeEmailAddresses?: number;

    emailsLast24h?: number;

    emailsLast30d?: number;

    emailsLast7d?: number;

    totalEmailAddresses?: number;
  }

  /**
   * Recommendations when records are missing
   */
  export interface VerificationCheck {
    dkimStatus?: string;

    dkimTokens?: Array<string>;

    dkimVerified?: boolean;

    dnsRecords?: Array<VerificationCheck.DNSRecord>;

    isFullyVerified?: boolean;

    lastChecked?: string;

    mailFromDomain?: string;

    mailFromStatus?: string;

    mailFromVerified?: boolean;

    sesStatus?: string;
  }

  export namespace VerificationCheck {
    export interface DNSRecord {
      error?: string;

      isVerified?: boolean;

      name?: string;

      type?: string;

      value?: string;
    }
  }
}

export interface DomainListResponse {
  data?: Array<DomainListResponse.Data>;

  meta?: DomainListResponse.Meta;

  pagination?: DomainListResponse.Pagination;
}

export namespace DomainListResponse {
  export interface Data {
    id?: string;

    canReceiveEmails?: boolean;

    /**
     * Additional fields when check=true
     */
    catchAllEndpoint?: Data.CatchAllEndpoint | null;

    catchAllEndpointId?: string | null;

    createdAt?: string;

    domain?: string;

    domainProvider?: string | null;

    hasMxRecords?: boolean;

    isCatchAllEnabled?: boolean;

    lastDnsCheck?: string | null;

    lastSesCheck?: string | null;

    mailFromDomain?: string | null;

    mailFromDomainStatus?: string | null;

    mailFromDomainVerifiedAt?: string | null;

    providerConfidence?: string | null;

    receiveDmarcEmails?: boolean;

    stats?: Data.Stats;

    status?: string;

    updatedAt?: string;

    userId?: string;

    verificationCheck?: Data.VerificationCheck;
  }

  export namespace Data {
    /**
     * Additional fields when check=true
     */
    export interface CatchAllEndpoint {
      id?: string;

      isActive?: boolean;

      name?: string;

      type?: string;
    }

    export interface Stats {
      activeEmailAddresses?: number;

      hasCatchAll?: boolean;

      totalEmailAddresses?: number;
    }

    export interface VerificationCheck {
      dnsRecords?: Array<VerificationCheck.DNSRecord>;

      isFullyVerified?: boolean;

      lastChecked?: string;

      sesStatus?: string;
    }

    export namespace VerificationCheck {
      export interface DNSRecord {
        error?: string;

        isVerified?: boolean;

        name?: string;

        type?: string;

        value?: string;
      }
    }
  }

  export interface Meta {
    statusBreakdown?: Meta.StatusBreakdown;

    totalCount?: number;

    verifiedCount?: number;

    withCatchAllCount?: number;
  }

  export namespace Meta {
    export interface StatusBreakdown {
      failed?: number;

      pending?: number;

      verified?: number;
    }
  }

  export interface Pagination {
    hasMore?: boolean;

    limit?: number;

    offset?: number;

    total?: number;
  }
}

export interface DomainDeleteResponse {
  deletedResources?: DomainDeleteResponse.DeletedResources;

  message?: string;

  success?: boolean;
}

export namespace DomainDeleteResponse {
  export interface DeletedResources {
    blockedEmails?: number;

    dnsRecords?: number;

    domain?: string;

    emailAddresses?: number;

    sesIdentity?: boolean;

    sesReceiptRules?: boolean;
  }
}

export interface DomainRetrieveDNSRecordsResponse {
  domain?: string;

  domainId?: string;

  records?: Array<DomainRetrieveDNSRecordsResponse.Record>;
}

export namespace DomainRetrieveDNSRecordsResponse {
  export interface Record {
    id?: string;

    createdAt?: string;

    domainId?: string;

    isRequired?: boolean;

    isVerified?: boolean;

    lastChecked?: string | null;

    name?: string;

    priority?: number | null;

    recordType?: string;

    updatedAt?: string;

    value?: string;
  }
}

export interface DomainUpdateCatchAllResponse {
  id?: string;

  awsConfigurationWarning?: string;

  catchAllEndpoint?: DomainUpdateCatchAllResponse.CatchAllEndpoint | null;

  catchAllEndpointId?: string | null;

  domain?: string;

  isCatchAllEnabled?: boolean;

  receiptRuleName?: string | null;

  status?: string;

  updatedAt?: string;
}

export namespace DomainUpdateCatchAllResponse {
  export interface CatchAllEndpoint {
    id?: string;

    isActive?: boolean;

    name?: string;

    type?: string;
  }
}

export interface DomainUpgradeMailFromResponse {
  additionalDnsRecords?: Array<DomainUpgradeMailFromResponse.AdditionalDNSRecord>;

  mailFromDomain?: string;

  mailFromDomainStatus?: string;

  message?: string;

  success?: boolean;
}

export namespace DomainUpgradeMailFromResponse {
  export interface AdditionalDNSRecord {
    description?: string;

    isRequired?: boolean;

    name?: string;

    type?: string;

    value?: string;
  }
}

export interface DomainCreateParams {
  domain?: string;
}

export interface DomainRetrieveParams {
  /**
   * from params
   */
  query_id?: string;
}

export interface DomainListParams {
  canReceive?: 'true' | 'false';

  check?: 'true' | 'false';

  limit?: number;

  offset?: number;

  status?: 'pending' | 'verified' | 'failed';
}

export interface DomainUpdateCatchAllParams {
  catchAllEndpointId?: string | null;

  isCatchAllEnabled?: boolean;
}

export interface DomainUpgradeMailFromParams {
  body?: unknown;
}

Domains.Auth = Auth;

export declare namespace Domains {
  export {
    type DomainCreateResponse as DomainCreateResponse,
    type DomainRetrieveResponse as DomainRetrieveResponse,
    type DomainListResponse as DomainListResponse,
    type DomainDeleteResponse as DomainDeleteResponse,
    type DomainRetrieveDNSRecordsResponse as DomainRetrieveDNSRecordsResponse,
    type DomainUpdateCatchAllResponse as DomainUpdateCatchAllResponse,
    type DomainUpgradeMailFromResponse as DomainUpgradeMailFromResponse,
    type DomainCreateParams as DomainCreateParams,
    type DomainRetrieveParams as DomainRetrieveParams,
    type DomainListParams as DomainListParams,
    type DomainUpdateCatchAllParams as DomainUpdateCatchAllParams,
    type DomainUpgradeMailFromParams as DomainUpgradeMailFromParams,
  };

  export {
    Auth as Auth,
    type AuthInitializeResponse as AuthInitializeResponse,
    type AuthVerifyResponse as AuthVerifyResponse,
    type AuthInitializeParams as AuthInitializeParams,
    type AuthVerifyParams as AuthVerifyParams,
  };
}
