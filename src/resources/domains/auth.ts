// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Auth extends APIResource {
  /**
   * Initialize AWS SES authentication for a domain including DKIM, MAIL FROM domain,
   * and optional SPF/DMARC records.
   *
   * @example
   * ```ts
   * const response = await client.domains.auth.initialize(
   *   '123',
   * );
   * ```
   */
  initialize(
    id: string,
    body: AuthInitializeParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AuthInitializeResponse> {
    return this._client.post(path`/v2/domains/${id}/auth`, { body, ...options });
  }

  /**
   * Verify DNS records and check AWS SES authentication status for a domain. Updates
   * verification status in the database.
   *
   * @example
   * ```ts
   * const response = await client.domains.auth.verify('123');
   * ```
   */
  verify(
    id: string,
    params: AuthVerifyParams | null | undefined = undefined,
    options?: RequestOptions,
  ): APIPromise<AuthVerifyResponse> {
    const { body } = params ?? {};
    return this._client.patch(path`/v2/domains/${id}/auth`, { body: body, ...options });
  }
}

export interface AuthInitializeResponse {
  dkimEnabled?: boolean;

  dkimTokens?: Array<string>;

  domain?: string;

  mailFromDomain?: string;

  mailFromStatus?: string;

  message?: string;

  records?: Array<AuthInitializeResponse.Record>;

  sesIdentityStatus?: string;

  success?: boolean;
}

export namespace AuthInitializeResponse {
  export interface Record {
    description?: string;

    isRequired?: boolean;

    isVerified?: boolean;

    name?: string;

    priority?: number;

    type?: 'TXT' | 'CNAME' | 'MX';

    value?: string;
  }
}

export interface AuthVerifyResponse {
  dnsRecords?: Array<AuthVerifyResponse.DNSRecord>;

  domain?: string;

  message?: string;

  nextSteps?: Array<string>;

  overallStatus?: 'verified' | 'pending' | 'failed';

  sesStatus?: AuthVerifyResponse.SesStatus;

  success?: boolean;

  summary?: AuthVerifyResponse.Summary;
}

export namespace AuthVerifyResponse {
  export interface DNSRecord {
    description?: string;

    error?: string;

    isRequired?: boolean;

    isVerified?: boolean;

    lastChecked?: string;

    name?: string;

    type?: string;

    value?: string;
  }

  export interface SesStatus {
    dkimStatus?: string;

    dkimTokens?: Array<string>;

    dkimVerified?: boolean;

    identityStatus?: string;

    identityVerified?: boolean;

    mailFromDomain?: string;

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

export interface AuthInitializeParams {
  generateDmarc?: boolean | null;

  generateSpf?: boolean | null;

  mailFromDomain?: string | null;
}

export interface AuthVerifyParams {
  body?: unknown;
}

export declare namespace Auth {
  export {
    type AuthInitializeResponse as AuthInitializeResponse,
    type AuthVerifyResponse as AuthVerifyResponse,
    type AuthInitializeParams as AuthInitializeParams,
    type AuthVerifyParams as AuthVerifyParams,
  };
}
