// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Auth extends APIResource {
  /**
   * Initializes complete email authentication for a domain by configuring AWS SES
   * identity verification, DKIM signing (3 CNAME tokens), and custom MAIL FROM
   * domain. Generates all required DNS records including SES verification TXT, DKIM
   * CNAME tokens, MAIL FROM MX record, and optional SPF/DMARC records. Stores
   * records in database for verification tracking. Returns comprehensive list of DNS
   * records to add to domain provider. Only domains belonging to the authenticated
   * user can be configured.
   *
   * @example
   * ```ts
   * const auth = await client.v2.domains.auth.create('id');
   * ```
   */
  create(
    id: string,
    body: AuthCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AuthCreateResponse> {
    return this._client.post(path`/api/v2/domains/${id}/auth`, { body, ...options });
  }

  /**
   * Verifies domain authentication by checking DNS records and AWS SES status.
   * Performs real-time DNS lookups for all configured records (TXT, CNAME, MX),
   * validates DKIM tokens, checks SES identity verification, and verifies MAIL FROM
   * domain setup. Updates database with verification results and timestamps. Returns
   * comprehensive verification status with actionable next steps if incomplete.
   * Automatically updates domain status to verified when all requirements met.
   *
   * @example
   * ```ts
   * const response = await client.v2.domains.auth.patchAll(
   *   'id',
   * );
   * ```
   */
  patchAll(id: string, options?: RequestOptions): APIPromise<AuthPatchAllResponse> {
    return this._client.patch(path`/api/v2/domains/${id}/auth`, options);
  }
}

export interface AuthCreateResponse {
  dkimEnabled: boolean;

  dkimTokens: Array<string>;

  domain: string;

  mailFromDomain: string;

  mailFromStatus: string;

  message: string;

  records: Array<AuthCreateResponse.Record>;

  /**
   * SES identity verification status
   */
  sesIdentityStatus: string;

  success: boolean;
}

export namespace AuthCreateResponse {
  export interface Record {
    /**
     * Human-readable description
     */
    description: string;

    /**
     * Whether record is required for verification
     */
    isRequired: boolean;

    /**
     * Current verification status
     */
    isVerified: boolean;

    /**
     * DNS record name
     */
    name: string;

    /**
     * DNS record type
     */
    type: 'TXT' | 'CNAME' | 'MX';

    /**
     * DNS record value
     */
    value: string;

    /**
     * Priority (MX records only)
     */
    priority?: number;
  }
}

export interface AuthPatchAllResponse {
  dnsRecords: Array<unknown>;

  domain: string;

  message: string;

  overallStatus: 'verified' | 'pending' | 'failed';

  sesStatus: AuthPatchAllResponse.SesStatus;

  success: boolean;

  summary: AuthPatchAllResponse.Summary;

  nextSteps?: Array<string>;
}

export namespace AuthPatchAllResponse {
  export interface SesStatus {
    dkimStatus?: string;

    dkimVerified?: boolean;

    identityStatus?: string;

    identityVerified?: boolean;

    mailFromStatus?: string;

    mailFromVerified?: boolean;
  }

  export interface Summary {
    requiredRecords?: number;

    totalRecords?: number;

    verifiedRecords?: number;

    verifiedRequiredRecords?: number;
  }
}

export interface AuthCreateParams {
  /**
   * Generate DMARC policy record
   */
  generateDmarc?: boolean;

  /**
   * Generate SPF record for root domain
   */
  generateSpf?: boolean;

  /**
   * Subdomain prefix for MAIL FROM domain
   */
  mailFromDomain?: string;
}

export declare namespace Auth {
  export {
    type AuthCreateResponse as AuthCreateResponse,
    type AuthPatchAllResponse as AuthPatchAllResponse,
    type AuthCreateParams as AuthCreateParams,
  };
}
