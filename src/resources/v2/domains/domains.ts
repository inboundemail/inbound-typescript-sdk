// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as AuthAPI from './auth';
import { Auth, AuthCreateParams, AuthCreateResponse, AuthPatchAllResponse } from './auth';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Domains extends APIResource {
  auth: AuthAPI.Auth = new AuthAPI.Auth(this._client);

  /**
   * Creates a new domain for email receiving and initiates AWS SES verification.
   * Validates domain format (max 253 chars, RFC 1035 compliant), checks for DNS
   * conflicts (MX/CNAME records), prevents duplicate registrations across platform,
   * enforces domain limits via Autumn, generates DKIM tokens, sets up MAIL FROM
   * domain (mail.yourdomain.com), and creates verification DNS records. Returns DNS
   * records to add to domain provider. Supports multi-tenant SES architecture.
   *
   * @example
   * ```ts
   * const domain = await client.v2.domains.create({
   *   domain: 'yourdomain.com',
   * });
   * ```
   */
  create(body: DomainCreateParams, options?: RequestOptions): APIPromise<DomainCreateResponse> {
    return this._client.post('/api/v2/domains', { body, ...options });
  }

  /**
   * Retrieves detailed information about a specific domain including verification
   * status, DNS provider detection, email address statistics, catch-all
   * configuration, MAIL FROM domain status, and recent email activity. Optionally
   * performs real-time DNS and SES verification checks (check=true), DKIM status
   * validation, and generates SPF/DMARC recommendations. Includes automatic MAIL
   * FROM domain retry for pending/failed configs. Only domains belonging to the
   * authenticated user can be accessed.
   *
   * @example
   * ```ts
   * const domain = await client.v2.domains.retrieve('id');
   * ```
   */
  retrieve(
    id: string,
    query: DomainRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DomainRetrieveResponse> {
    return this._client.get(path`/api/v2/domains/${id}`, { query, ...options });
  }

  /**
   * Upgrades existing domain with MAIL FROM domain configuration
   * (mail.yourdomain.com) to eliminate the "via amazonses.com" attribution in sent
   * emails. Configures AWS SES custom MAIL FROM domain, generates required MX and
   * SPF DNS records, and tracks verification status. Returns additional DNS records
   * to add. Automatically checks if already configured and returns existing
   * configuration if successful. Improves email deliverability and sender
   * reputation.
   *
   * @example
   * ```ts
   * const domain = await client.v2.domains.update('id');
   * ```
   */
  update(id: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.patch(path`/api/v2/domains/${id}`, options);
  }

  /**
   * Retrieves a paginated list of all domains for the authenticated user with
   * filtering by status (pending, verified, failed) and email receiving capability.
   * Returns domain configuration, verification status, DNS provider information,
   * email address statistics, catch-all endpoint details, and MAIL FROM domain
   * status. Optionally performs real-time DNS and SES verification checks when
   * check=true parameter is provided.
   *
   * @example
   * ```ts
   * const domains = await client.v2.domains.list();
   * ```
   */
  list(
    query: DomainListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DomainListResponse> {
    return this._client.get('/api/v2/domains', { query, ...options });
  }

  /**
   * Deletes a domain and performs comprehensive cleanup of all associated resources.
   * Removes AWS SES receipt rules (catch-all and individual), deletes AWS SES
   * identity and verification tokens, removes all email addresses, deletes DNS
   * records, removes blocked email entries, and decrements domain usage in Autumn.
   * Deletion is permanent and cannot be undone. Frees up domain slot for user plan.
   * Only domains belonging to the authenticated user can be deleted.
   *
   * @example
   * ```ts
   * const domain = await client.v2.domains.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<DomainDeleteResponse> {
    return this._client.delete(path`/api/v2/domains/${id}`, options);
  }

  /**
   * Retrieves all DNS records required for domain verification and email
   * authentication. Includes SES verification TXT record, DKIM CNAME tokens, MAIL
   * FROM MX record, and optional SPF/DMARC records. Returns verification status and
   * last check timestamp for each record. Useful for troubleshooting domain setup
   * and monitoring DNS propagation. Only domains belonging to the authenticated user
   * can be accessed.
   *
   * @example
   * ```ts
   * const response = await client.v2.domains.retrieveDNSRecords(
   *   'id',
   * );
   * ```
   */
  retrieveDNSRecords(id: string, options?: RequestOptions): APIPromise<DomainRetrieveDNSRecordsResponse> {
    return this._client.get(path`/api/v2/domains/${id}/dns-records`, options);
  }
}

export interface DomainCreateResponse {
  id: string;

  canReceiveEmails: boolean;

  createdAt: string;

  dnsRecords: Array<DomainCreateResponse.DNSRecord>;

  domain: string;

  status: 'pending' | 'verified' | 'failed';

  updatedAt: string;

  domainProvider?: string | null;

  hasMxRecords?: boolean;

  mailFromDomain?: string;

  mailFromDomainStatus?: string;

  providerConfidence?: string | null;
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
  id: string;

  domain: string;

  stats: DomainRetrieveResponse.Stats;

  status: 'pending' | 'verified' | 'failed';

  canReceiveEmails?: boolean;

  isCatchAllEnabled?: boolean;

  mailFromDomain?: string | null;

  mailFromDomainStatus?: string | null;

  verificationCheck?: DomainRetrieveResponse.VerificationCheck;
}

export namespace DomainRetrieveResponse {
  export interface Stats {
    activeEmailAddresses?: number;

    emailsLast24h?: number;

    emailsLast30d?: number;

    emailsLast7d?: number;

    totalEmailAddresses?: number;
  }

  export interface VerificationCheck {
    dkimStatus?: string;

    isFullyVerified?: boolean;

    sesStatus?: string;
  }
}

export type DomainUpdateResponse = unknown;

export interface DomainListResponse {
  data: Array<DomainListResponse.Data>;

  meta: DomainListResponse.Meta;

  pagination: DomainListResponse.Pagination;
}

export namespace DomainListResponse {
  export interface Data {
    id: string;

    canReceiveEmails: boolean;

    domain: string;

    isCatchAllEnabled: boolean;

    stats: Data.Stats;

    status: 'pending' | 'verified' | 'failed';

    catchAllEndpointId?: string | null;

    domainProvider?: string | null;

    hasMxRecords?: boolean;

    mailFromDomain?: string | null;

    mailFromDomainStatus?: string | null;
  }

  export namespace Data {
    export interface Stats {
      activeEmailAddresses?: number;

      hasCatchAll?: boolean;

      totalEmailAddresses?: number;
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
  deletedResources: DomainDeleteResponse.DeletedResources;

  message: string;

  success: boolean;
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
  domain: string;

  domainId: string;

  records: Array<DomainRetrieveDNSRecordsResponse.Record>;
}

export namespace DomainRetrieveDNSRecordsResponse {
  export interface Record {
    id: string;

    createdAt: string;

    domainId: string;

    isRequired: boolean;

    isVerified: boolean;

    name: string;

    recordType: 'TXT' | 'CNAME' | 'MX';

    updatedAt: string;

    value: string;

    lastChecked?: string | null;

    priority?: number | null;
  }
}

export interface DomainCreateParams {
  /**
   * Domain name (RFC 1035 compliant, max 253 chars, lowercase)
   */
  domain: string;
}

export interface DomainRetrieveParams {
  /**
   * Perform real-time DNS and SES verification checks. Values: 'true', 'false'.
   * Default: false
   */
  check?: string;
}

export interface DomainListParams {
  /**
   * Filter by email receiving capability. Values: 'true', 'false'
   */
  canReceive?: string;

  /**
   * Perform real-time DNS and SES verification checks. Values: 'true', 'false'.
   * Default: false
   */
  check?: string;

  /**
   * Maximum number of domains to return. Min: 1, Max: 100, Default: 50
   */
  limit?: number;

  /**
   * Number of domains to skip for pagination. Min: 0, Default: 0
   */
  offset?: number;

  /**
   * Filter by verification status. Values: 'pending', 'verified', 'failed'
   */
  status?: string;
}

Domains.Auth = Auth;

export declare namespace Domains {
  export {
    type DomainCreateResponse as DomainCreateResponse,
    type DomainRetrieveResponse as DomainRetrieveResponse,
    type DomainUpdateResponse as DomainUpdateResponse,
    type DomainListResponse as DomainListResponse,
    type DomainDeleteResponse as DomainDeleteResponse,
    type DomainRetrieveDNSRecordsResponse as DomainRetrieveDNSRecordsResponse,
    type DomainCreateParams as DomainCreateParams,
    type DomainRetrieveParams as DomainRetrieveParams,
    type DomainListParams as DomainListParams,
  };

  export {
    Auth as Auth,
    type AuthCreateResponse as AuthCreateResponse,
    type AuthPatchAllResponse as AuthPatchAllResponse,
    type AuthCreateParams as AuthCreateParams,
  };
}
