// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Domains extends APIResource {
  /**
   * Add a new domain for receiving emails. Automatically detects DNS provider and
   * generates required verification records.
   */
  create(body: DomainCreateParams, options?: RequestOptions): APIPromise<DomainCreateResponse> {
    return this._client.post('/domains', { body, ...options });
  }

  /**
   * Retrieve detailed information about a specific domain including stats, DNS
   * records, and optional real-time verification.
   */
  retrieve(
    id: string,
    query: DomainRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DomainRetrieveResponse> {
    return this._client.get(path`/domains/${id}`, { query, ...options });
  }

  /**
   * Update domain settings including catch-all configuration. Domain must be
   * verified before enabling catch-all.
   */
  update(
    id: string,
    body: DomainUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DomainUpdateResponse> {
    return this._client.patch(path`/domains/${id}`, { body, ...options });
  }

  /**
   * Get a paginated list of domains for the authenticated user with filtering
   * options.
   */
  list(
    query: DomainListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DomainListResponse> {
    return this._client.get('/domains', { query, ...options });
  }

  /**
   * Delete a domain and all associated resources including email addresses, DNS
   * records, and AWS SES configuration. Cannot delete root domains with dependent
   * subdomains.
   */
  delete(
    id: string,
    body?: DomainDeleteParams | null | undefined,
    options?: RequestOptions,
  ): APIPromise<DomainDeleteResponse> {
    return this._client.delete(path`/domains/${id}`, { body, ...options });
  }
}

export interface DomainCreateResponse {
  /**
   * Unique domain identifier
   */
  id: string;

  /**
   * Whether the domain can receive emails
   */
  canReceiveEmails: boolean;

  /**
   * Domain creation timestamp
   */
  createdAt: string;

  /**
   * DNS records to add for domain verification
   */
  dnsRecords: Array<DomainCreateResponse.DNSRecord>;

  /**
   * The domain name
   */
  domain: string;

  /**
   * Detected DNS provider (e.g., Cloudflare, AWS)
   */
  domainProvider: string | null;

  /**
   * Whether the domain has existing MX records
   */
  hasMxRecords: boolean;

  /**
   * Confidence level of provider detection
   */
  providerConfidence: string | null;

  /**
   * Domain verification status
   */
  status: 'pending' | 'verified' | 'failed';

  /**
   * Domain last update timestamp
   */
  updatedAt: string;

  /**
   * Custom MAIL FROM domain for sending
   */
  mailFromDomain?: string;

  /**
   * MAIL FROM domain verification status
   */
  mailFromDomainStatus?: string;

  /**
   * Additional information about the domain setup
   */
  message?: string;

  /**
   * Parent domain if this is a verified subdomain
   */
  parentDomain?: string;
}

export namespace DomainCreateResponse {
  export interface DNSRecord {
    /**
     * Whether this record is required for domain verification
     */
    isRequired: boolean;

    /**
     * DNS record name/hostname
     */
    name: string;

    /**
     * DNS record type (TXT, MX, CNAME, etc.)
     */
    type: string;

    /**
     * DNS record value
     */
    value: string;

    /**
     * Human-readable description of what this record does
     */
    description?: string;
  }
}

export interface DomainRetrieveResponse {
  /**
   * Unique domain identifier
   */
  id: string;

  /**
   * Whether the domain can receive emails
   */
  canReceiveEmails: boolean;

  /**
   * Catch-all endpoint details
   */
  catchAllEndpoint: DomainRetrieveResponse.CatchAllEndpoint | null;

  /**
   * Catch-all endpoint ID if configured
   */
  catchAllEndpointId: string | null;

  /**
   * Domain creation timestamp
   */
  createdAt: string;

  /**
   * DNS records for this domain
   */
  dnsRecords: Array<DomainRetrieveResponse.DNSRecord>;

  /**
   * The domain name
   */
  domain: string;

  /**
   * Detected DNS provider
   */
  domainProvider: string | null;

  /**
   * Whether the domain has MX records
   */
  hasMxRecords: boolean;

  /**
   * Whether catch-all is enabled
   */
  isCatchAllEnabled: boolean;

  /**
   * Last DNS check timestamp
   */
  lastDnsCheck: string | null;

  /**
   * Last SES verification check timestamp
   */
  lastSesCheck: string | null;

  /**
   * Custom MAIL FROM domain
   */
  mailFromDomain: string | null;

  /**
   * MAIL FROM domain status
   */
  mailFromDomainStatus: string | null;

  /**
   * MAIL FROM domain verification timestamp
   */
  mailFromDomainVerifiedAt: string | null;

  /**
   * Confidence level of provider detection
   */
  providerConfidence: string | null;

  /**
   * Whether to receive DMARC emails
   */
  receiveDmarcEmails: boolean;

  /**
   * Domain statistics
   */
  stats: DomainRetrieveResponse.Stats;

  /**
   * Domain verification status
   */
  status: 'pending' | 'verified' | 'failed';

  /**
   * Domain last update timestamp
   */
  updatedAt: string;

  /**
   * User ID who owns this domain
   */
  userId: string;

  /**
   * Recommended SPF/DMARC records
   */
  authRecommendations?: DomainRetrieveResponse.AuthRecommendations;

  /**
   * Real-time verification results (when check=true)
   */
  verificationCheck?: DomainRetrieveResponse.VerificationCheck;
}

export namespace DomainRetrieveResponse {
  /**
   * Catch-all endpoint details
   */
  export interface CatchAllEndpoint {
    /**
     * Endpoint unique identifier
     */
    id: string;

    /**
     * Whether endpoint is active
     */
    isActive: boolean;

    /**
     * Endpoint name
     */
    name: string;

    /**
     * Endpoint type (webhook, email, etc.)
     */
    type: string;
  }

  export interface DNSRecord {
    /**
     * DNS record unique identifier
     */
    id: string;

    /**
     * Record creation timestamp
     */
    createdAt: string;

    /**
     * Human-readable description
     */
    description: string | null;

    /**
     * Whether this record is required
     */
    isRequired: boolean;

    /**
     * Whether this record has been verified
     */
    isVerified: boolean;

    /**
     * Last verification check timestamp
     */
    lastChecked: string | null;

    /**
     * DNS record name/hostname
     */
    name: string;

    /**
     * Priority for MX records
     */
    priority: number | null;

    /**
     * DNS record type (TXT, MX, CNAME, etc.)
     */
    recordType: string;

    /**
     * DNS record value
     */
    value: string;
  }

  /**
   * Domain statistics
   */
  export interface Stats {
    /**
     * Number of active email addresses
     */
    activeEmailAddresses: number;

    /**
     * Emails received in last 24 hours
     */
    emailsLast24h: number;

    /**
     * Emails received in last 30 days
     */
    emailsLast30d: number;

    /**
     * Emails received in last 7 days
     */
    emailsLast7d: number;

    /**
     * Total number of email addresses
     */
    totalEmailAddresses: number;
  }

  /**
   * Recommended SPF/DMARC records
   */
  export interface AuthRecommendations {
    /**
     * DMARC record recommendation
     */
    dmarc?: AuthRecommendations.Dmarc;

    /**
     * SPF record recommendation
     */
    spf?: AuthRecommendations.Spf;
  }

  export namespace AuthRecommendations {
    /**
     * DMARC record recommendation
     */
    export interface Dmarc {
      /**
       * Description
       */
      description: string;

      /**
       * DMARC record name
       */
      name: string;

      /**
       * DMARC record value
       */
      value: string;
    }

    /**
     * SPF record recommendation
     */
    export interface Spf {
      /**
       * Description
       */
      description: string;

      /**
       * SPF record name
       */
      name: string;

      /**
       * SPF record value
       */
      value: string;
    }
  }

  /**
   * Real-time verification results (when check=true)
   */
  export interface VerificationCheck {
    /**
     * DNS record verification results
     */
    dnsRecords: Array<VerificationCheck.DNSRecord>;

    /**
     * Whether domain is fully verified
     */
    isFullyVerified: boolean;

    /**
     * When this check was performed
     */
    lastChecked: string;

    /**
     * SES verification status
     */
    sesStatus: string;

    /**
     * DKIM verification status
     */
    dkimStatus?: string;

    /**
     * DKIM tokens
     */
    dkimTokens?: Array<string>;

    /**
     * Whether DKIM is verified
     */
    dkimVerified?: boolean;

    /**
     * Custom MAIL FROM domain
     */
    mailFromDomain?: string;

    /**
     * MAIL FROM domain status
     */
    mailFromStatus?: string;

    /**
     * Whether MAIL FROM is verified
     */
    mailFromVerified?: boolean;
  }

  export namespace VerificationCheck {
    export interface DNSRecord {
      /**
       * Whether verified
       */
      isVerified: boolean;

      /**
       * Record name
       */
      name: string;

      /**
       * Record type
       */
      type: string;

      /**
       * Expected value
       */
      value: string;

      /**
       * Error message if verification failed
       */
      error?: string;
    }
  }
}

export interface DomainUpdateResponse {
  /**
   * Unique domain identifier
   */
  id: string;

  /**
   * Full endpoint details for catch-all
   */
  catchAllEndpoint: DomainUpdateResponse.CatchAllEndpoint | null;

  /**
   * The endpoint ID for catch-all emails
   */
  catchAllEndpointId: string | null;

  /**
   * The domain name
   */
  domain: string;

  /**
   * Whether catch-all is enabled for this domain
   */
  isCatchAllEnabled: boolean;

  /**
   * Whether DMARC report emails are enabled
   */
  receiveDmarcEmails: boolean;

  /**
   * Domain verification status
   */
  status: 'pending' | 'verified' | 'failed';

  /**
   * Last update timestamp
   */
  updatedAt: string;
}

export namespace DomainUpdateResponse {
  /**
   * Full endpoint details for catch-all
   */
  export interface CatchAllEndpoint {
    /**
     * Endpoint ID
     */
    id: string;

    /**
     * Whether the endpoint is active
     */
    isActive: boolean;

    /**
     * Endpoint name
     */
    name: string;

    /**
     * Endpoint type (webhook, email, etc.)
     */
    type: string;
  }
}

export interface DomainListResponse {
  /**
   * Array of domains
   */
  data: Array<DomainListResponse.Data>;

  /**
   * Additional metadata
   */
  meta: DomainListResponse.Meta;

  /**
   * Pagination information
   */
  pagination: DomainListResponse.Pagination;
}

export namespace DomainListResponse {
  export interface Data {
    /**
     * Unique domain identifier
     */
    id: string;

    /**
     * Whether the domain can receive emails
     */
    canReceiveEmails: boolean;

    /**
     * Catch-all endpoint details
     */
    catchAllEndpoint: Data.CatchAllEndpoint | null;

    /**
     * Catch-all endpoint ID if configured
     */
    catchAllEndpointId: string | null;

    /**
     * Domain creation timestamp
     */
    createdAt: string;

    /**
     * The domain name
     */
    domain: string;

    /**
     * Detected DNS provider
     */
    domainProvider: string | null;

    /**
     * Whether the domain has MX records
     */
    hasMxRecords: boolean;

    /**
     * Whether catch-all is enabled
     */
    isCatchAllEnabled: boolean;

    /**
     * Last DNS check timestamp
     */
    lastDnsCheck: string | null;

    /**
     * Last SES verification check timestamp
     */
    lastSesCheck: string | null;

    /**
     * Custom MAIL FROM domain
     */
    mailFromDomain: string | null;

    /**
     * MAIL FROM domain status
     */
    mailFromDomainStatus: string | null;

    /**
     * MAIL FROM domain verification timestamp
     */
    mailFromDomainVerifiedAt: string | null;

    /**
     * Confidence level of provider detection
     */
    providerConfidence: string | null;

    /**
     * Whether to receive DMARC emails
     */
    receiveDmarcEmails: boolean;

    /**
     * Domain statistics
     */
    stats: Data.Stats;

    /**
     * Domain verification status
     */
    status: 'pending' | 'verified' | 'failed';

    /**
     * Domain last update timestamp
     */
    updatedAt: string;
  }

  export namespace Data {
    /**
     * Catch-all endpoint details
     */
    export interface CatchAllEndpoint {
      /**
       * Endpoint unique identifier
       */
      id: string;

      /**
       * Whether endpoint is active
       */
      isActive: boolean;

      /**
       * Endpoint name
       */
      name: string;

      /**
       * Endpoint type (webhook, email, etc.)
       */
      type: string;
    }

    /**
     * Domain statistics
     */
    export interface Stats {
      /**
       * Number of active email addresses
       */
      activeEmailAddresses: number;

      /**
       * Whether domain has catch-all configured
       */
      hasCatchAll: boolean;

      /**
       * Total number of email addresses
       */
      totalEmailAddresses: number;
    }
  }

  /**
   * Additional metadata
   */
  export interface Meta {
    /**
     * Breakdown by status
     */
    statusBreakdown: Meta.StatusBreakdown;

    /**
     * Total number of domains
     */
    totalCount: number;

    /**
     * Number of verified domains
     */
    verifiedCount: number;

    /**
     * Number of domains with catch-all
     */
    withCatchAllCount: number;
  }

  export namespace Meta {
    /**
     * Breakdown by status
     */
    export interface StatusBreakdown {
      /**
       * Number of failed domains
       */
      failed: number;

      /**
       * Number of pending domains
       */
      pending: number;

      /**
       * Number of verified domains
       */
      verified: number;
    }
  }

  /**
   * Pagination information
   */
  export interface Pagination {
    /**
     * Whether there are more domains
     */
    hasMore: boolean;

    /**
     * Requested limit
     */
    limit: number;

    /**
     * Current offset
     */
    offset: number;

    /**
     * Total number of domains
     */
    total: number;
  }
}

export interface DomainDeleteResponse {
  /**
   * Statistics about deleted resources
   */
  stats: DomainDeleteResponse.Stats;

  /**
   * Whether the deletion was successful
   */
  success: boolean;

  /**
   * Success message with details
   */
  message?: string;
}

export namespace DomainDeleteResponse {
  /**
   * Statistics about deleted resources
   */
  export interface Stats {
    /**
     * Number of blocked emails deleted
     */
    blockedEmails: number;

    /**
     * Number of DNS records deleted
     */
    dnsRecords: number;

    /**
     * The domain name that was deleted
     */
    domain: string;

    /**
     * Number of email addresses deleted
     */
    emailAddresses: number;

    /**
     * Whether SES identity was successfully deleted
     */
    sesIdentity: boolean;

    /**
     * Whether SES receipt rules were successfully deleted
     */
    sesReceiptRules: boolean;
  }
}

export interface DomainCreateParams {
  /**
   * The domain name to add for email receiving
   */
  domain: string;
}

export interface DomainRetrieveParams {
  /**
   * Whether to perform real-time DNS and SES verification checks
   */
  check?: boolean;
}

export interface DomainUpdateParams {
  /**
   * The endpoint ID to route catch-all emails to
   */
  catchAllEndpointId?: string;

  /**
   * Enable or disable catch-all email receiving for this domain
   */
  isCatchAllEnabled?: boolean;

  /**
   * Enable or disable receiving DMARC report emails (dmarc@domain)
   */
  receiveDmarcEmails?: boolean;
}

export interface DomainListParams {
  /**
   * Filter by whether domain can receive emails
   */
  canReceive?: boolean;

  /**
   * Maximum number of domains to return (1-100)
   */
  limit?: number;

  /**
   * Number of domains to skip for pagination
   */
  offset?: number;

  /**
   * Filter by verification status
   */
  status?: 'pending' | 'verified' | 'failed';
}

export interface DomainDeleteParams {}

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
    type DomainDeleteParams as DomainDeleteParams,
  };
}
