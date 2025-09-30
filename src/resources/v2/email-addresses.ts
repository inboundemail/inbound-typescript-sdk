// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class EmailAddresses extends APIResource {
  /**
   * Retrieves detailed information about a specific email address including domain
   * details, routing configuration (webhook or endpoint with config and active
   * status), SES receipt rule setup, and timestamps. Automatically resolves
   * associated endpoint or webhook routing information. Only email addresses
   * belonging to the authenticated user can be accessed.
   *
   * @example
   * ```ts
   * const emailAddress =
   *   await client.v2.emailAddresses.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<EmailAddressRetrieveResponse> {
    return this._client.get(path`/api/v2/email-addresses/${id}`, options);
  }

  /**
   * Updates an existing email address routing (webhook or endpoint) and active
   * status. Cannot specify both webhook and endpoint simultaneously. SES receipt
   * rules are maintained automatically and do not need reconfiguration when routing
   * changes. Validates endpoint/webhook ownership before updating. Only email
   * addresses belonging to the authenticated user can be updated.
   *
   * @example
   * ```ts
   * const emailAddress = await client.v2.emailAddresses.update(
   *   'id',
   * );
   * ```
   */
  update(
    id: string,
    body: EmailAddressUpdateParams,
    options?: RequestOptions,
  ): APIPromise<EmailAddressUpdateResponse> {
    return this._client.put(path`/api/v2/email-addresses/${id}`, { body, ...options });
  }

  /**
   * Deletes an email address and automatically updates AWS SES receipt rules. If
   * other email addresses exist for the domain, updates SES rule with remaining
   * addresses. If this is the last email address for the domain, removes the SES
   * receipt rule entirely. Deletion is permanent and cannot be undone. Only email
   * addresses belonging to the authenticated user can be deleted.
   *
   * @example
   * ```ts
   * const emailAddress = await client.v2.emailAddresses.delete(
   *   'id',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<EmailAddressDeleteResponse> {
    return this._client.delete(path`/api/v2/email-addresses/${id}`, options);
  }

  /**
   * Creates a new email address for receiving emails and automatically configures
   * AWS SES receipt rules. Validates email format (RFC 5322), checks domain
   * ownership and verification status, prevents duplicate addresses, and optionally
   * associates with webhook or endpoint for routing. Configures SES Lambda
   * integration for email processing. Email address must match the specified domain.
   * Returns receipt rule configuration status and any AWS warnings.
   *
   * @example
   * ```ts
   * const response =
   *   await client.v2.emailAddresses.emailAddresses({
   *     address: 'hello@yourdomain.com',
   *     domainId: 'domain_abc123',
   *   });
   * ```
   */
  emailAddresses(
    body: EmailAddressEmailAddressesParams,
    options?: RequestOptions,
  ): APIPromise<EmailAddressEmailAddressesResponse> {
    return this._client.post('/api/v2/email-addresses', { body, ...options });
  }

  /**
   * Retrieves a paginated list of all email addresses for the authenticated user
   * with filtering by domain, active status, and SES receipt rule configuration.
   * Returns complete email address details including domain information, routing
   * configuration (webhook or endpoint), SES receipt rule status, and creation
   * timestamps. Useful for managing email routing and monitoring setup status.
   *
   * @example
   * ```ts
   * const response =
   *   await client.v2.emailAddresses.retrieveEmailAddresses();
   * ```
   */
  retrieveEmailAddresses(
    query: EmailAddressRetrieveEmailAddressesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EmailAddressRetrieveEmailAddressesResponse> {
    return this._client.get('/api/v2/email-addresses', { query, ...options });
  }
}

export interface EmailAddressRetrieveResponse {
  id: string;

  address: string;

  domain: EmailAddressRetrieveResponse.Domain;

  domainId: string;

  isActive: boolean;

  isReceiptRuleConfigured: boolean;

  routing: EmailAddressRetrieveResponse.Routing;

  userId: string;

  createdAt?: string;

  endpointId?: string | null;

  receiptRuleName?: string | null;

  updatedAt?: string;

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

    isActive?: boolean;

    name?: string | null;

    type?: 'webhook' | 'endpoint' | 'none';
  }
}

export interface EmailAddressUpdateResponse {
  id: string;

  address: string;

  domain: EmailAddressUpdateResponse.Domain;

  domainId: string;

  isActive: boolean;

  isReceiptRuleConfigured: boolean;

  routing: EmailAddressUpdateResponse.Routing;

  userId: string;

  createdAt?: string;

  endpointId?: string | null;

  receiptRuleName?: string | null;

  updatedAt?: string;

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

    isActive?: boolean;

    name?: string | null;

    type?: 'webhook' | 'endpoint' | 'none';
  }
}

export interface EmailAddressDeleteResponse {
  cleanup: EmailAddressDeleteResponse.Cleanup;

  message: string;
}

export namespace EmailAddressDeleteResponse {
  export interface Cleanup {
    /**
     * Domain name
     */
    domain: string;

    /**
     * The deleted email address
     */
    emailAddress: string;

    /**
     * Whether SES receipt rule was updated/deleted
     */
    sesRuleUpdated: boolean;

    /**
     * AWS configuration warning if SES cleanup failed
     */
    warning?: string;
  }
}

export interface EmailAddressEmailAddressesResponse {
  id: string;

  address: string;

  domain: EmailAddressEmailAddressesResponse.Domain;

  domainId: string;

  isActive: boolean;

  isReceiptRuleConfigured: boolean;

  routing: EmailAddressEmailAddressesResponse.Routing;

  userId: string;

  createdAt?: string;

  endpointId?: string | null;

  receiptRuleName?: string | null;

  updatedAt?: string;

  /**
   * AWS configuration warning if SES setup failed
   */
  warning?: string;

  webhookId?: string | null;
}

export namespace EmailAddressEmailAddressesResponse {
  export interface Domain {
    id?: string;

    name?: string;

    status?: string;
  }

  export interface Routing {
    id?: string | null;

    isActive?: boolean;

    name?: string | null;

    type?: 'webhook' | 'endpoint' | 'none';
  }
}

export interface EmailAddressRetrieveEmailAddressesResponse {
  data: Array<EmailAddressRetrieveEmailAddressesResponse.Data>;

  pagination: EmailAddressRetrieveEmailAddressesResponse.Pagination;
}

export namespace EmailAddressRetrieveEmailAddressesResponse {
  export interface Data {
    id: string;

    address: string;

    domain: Data.Domain;

    domainId: string;

    isActive: boolean;

    isReceiptRuleConfigured: boolean;

    routing: Data.Routing;

    userId: string;

    createdAt?: string;

    endpointId?: string | null;

    receiptRuleName?: string | null;

    updatedAt?: string;

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

export interface EmailAddressUpdateParams {
  /**
   * Endpoint ID for routing (set to null to clear)
   */
  endpointId?: string | null;

  /**
   * Active status
   */
  isActive?: boolean;

  /**
   * Webhook ID for routing (set to null to clear)
   */
  webhookId?: string | null;
}

export interface EmailAddressEmailAddressesParams {
  /**
   * Email address (RFC 5322 format). Must match specified domain
   */
  address: string;

  /**
   * Domain ID (must be verified and owned by user)
   */
  domainId: string;

  /**
   * Optional endpoint ID for routing
   */
  endpointId?: string;

  /**
   * Active status
   */
  isActive?: boolean;

  /**
   * Optional webhook ID for routing (cannot use with endpointId)
   */
  webhookId?: string;
}

export interface EmailAddressRetrieveEmailAddressesParams {
  /**
   * Filter by domain ID (nanoid format)
   */
  domainId?: string;

  /**
   * Filter by active status. Values: 'true', 'false'
   */
  isActive?: string;

  /**
   * Filter by SES receipt rule configuration. Values: 'true', 'false'
   */
  isReceiptRuleConfigured?: string;

  /**
   * Maximum number of email addresses to return. Min: 1, Max: 100, Default: 50
   */
  limit?: number;

  /**
   * Number of email addresses to skip for pagination. Min: 0, Default: 0
   */
  offset?: number;
}

export declare namespace EmailAddresses {
  export {
    type EmailAddressRetrieveResponse as EmailAddressRetrieveResponse,
    type EmailAddressUpdateResponse as EmailAddressUpdateResponse,
    type EmailAddressDeleteResponse as EmailAddressDeleteResponse,
    type EmailAddressEmailAddressesResponse as EmailAddressEmailAddressesResponse,
    type EmailAddressRetrieveEmailAddressesResponse as EmailAddressRetrieveEmailAddressesResponse,
    type EmailAddressUpdateParams as EmailAddressUpdateParams,
    type EmailAddressEmailAddressesParams as EmailAddressEmailAddressesParams,
    type EmailAddressRetrieveEmailAddressesParams as EmailAddressRetrieveEmailAddressesParams,
  };
}
