// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Auth extends APIResource {
  /**
   * POST /domains/{id}/auth
   */
  create(id: string, body: AuthCreateParams, options?: RequestOptions): APIPromise<AuthCreateResponse> {
    return this._client.post(path`/api/v2/domains/${id}/auth`, { body, ...options });
  }

  /**
   * PATCH /domains/{id}/auth
   */
  update(id: string, options?: RequestOptions): APIPromise<AuthUpdateResponse> {
    return this._client.patch(path`/api/v2/domains/${id}/auth`, options);
  }
}

export interface AuthCreateResponse {
  dkimEnabled: boolean;

  dkimTokens: string;

  domain: string;

  mailFromDomain: string;

  mailFromStatus: string;

  message: string;

  records: Array<string>;

  sesIdentityStatus: string;

  success: boolean;
}

export interface AuthUpdateResponse {
  dnsRecords: Array<string>;

  domain: string;

  message: string;

  overallStatus: 'pending' | 'verified' | 'failed';

  sesStatus: string;

  success: boolean;

  summary: number;

  nextSteps?: string;
}

export interface AuthCreateParams {
  generateDmarc?: boolean;

  generateSpf?: boolean;

  mailFromDomain?: string;
}

export declare namespace Auth {
  export {
    type AuthCreateResponse as AuthCreateResponse,
    type AuthUpdateResponse as AuthUpdateResponse,
    type AuthCreateParams as AuthCreateParams,
  };
}
