/**
 * Main client class for the Inbound Email SDK
 */

import type { 
  // Core response types
  ApiResponse, IdempotencyOptions,
  // Mail API
  GetMailRequest, GetMailResponse, PostMailRequest, PostMailResponse, GetMailByIdResponse,
  // Endpoints API  
  GetEndpointsRequest, GetEndpointsResponse, PostEndpointsRequest, PostEndpointsResponse,
  GetEndpointByIdResponse, PutEndpointByIdRequest, PutEndpointByIdResponse, DeleteEndpointByIdResponse,
  // Domains API
  GetDomainsRequest, GetDomainsResponse, PostDomainsRequest, PostDomainsResponse,
  GetDomainByIdResponse, PutDomainByIdRequest, PutDomainByIdResponse,
  // Email Addresses API
  GetEmailAddressesRequest, GetEmailAddressesResponse, PostEmailAddressesRequest, PostEmailAddressesResponse,
  GetEmailAddressByIdResponse, PutEmailAddressByIdRequest, PutEmailAddressByIdResponse, DeleteEmailAddressByIdResponse,
  // Emails API (sending)
  PostEmailsRequest, PostEmailsResponse, GetEmailByIdResponse,
  // Reply API
  PostEmailReplyRequest, PostEmailReplyResponse,
  // Scheduling API
  PostScheduleEmailRequest, PostScheduleEmailResponse, GetScheduledEmailsRequest, GetScheduledEmailsResponse,
  GetScheduledEmailResponse, DeleteScheduledEmailResponse
} from './types'
import type { InboundWebhookEmail } from './webhook-types'
import { buildQueryString } from './utils'
import { renderReactToHtml, isReactRenderingSupported, getReactRenderingError } from './react-renderer'

export class InboundEmailClient {
  private readonly apiKey: string
  private readonly baseUrl: string

  constructor(apiKey: string, baseUrl?: string) {
    this.apiKey = apiKey
    this.baseUrl = baseUrl || 'https://inbound.new/api/v2'
    
    if (!this.apiKey) {
      throw new Error('API key is required')
    }
  }

  /**
   * Make an authenticated request to the API with { data, error } response pattern
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      let responseData: any = {}
      try {
        responseData = await response.json()
      } catch (jsonError) {
        // If JSON parsing fails, use empty object
        responseData = {}
      }

      if (!response.ok) {
        return {
          error: (responseData && typeof responseData === 'object' && responseData.error) || `HTTP ${response.status}: ${response.statusText}`
        }
      }

      return {
        data: responseData as T
      }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error occurred'
      }
    }
  }

  /**
   * Process React component in email request
   * Converts React component to HTML and adds it to the request
   */
  private async processReactComponent(params: PostEmailsRequest): Promise<PostEmailsRequest> {
    // If no React component provided, return params as-is
    if (!params.react) {
      return params
    }

    // Check if React rendering is supported
    if (!isReactRenderingSupported()) {
      throw new Error(getReactRenderingError())
    }

    try {
      // Render React component to HTML
      const renderedHtml = renderReactToHtml(params.react)
      
      // Create new params object with rendered HTML
      const processedParams: PostEmailsRequest = {
        ...params,
        html: renderedHtml, // Set the rendered HTML
        // Remove the react property as it's not sent to the API
        react: undefined
      }

      // Remove the react property completely
      delete processedParams.react

      return processedParams
    } catch (error) {
      throw new Error(`Failed to process React component: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Mail API - for managing received emails (inbound)
   * @deprecated Use `email.received` instead. This will be removed in a future version.
   */
  mail = {
    /**
     * List all emails in the mailbox
     * @deprecated Use `email.received.list()` instead
     */
    list: async (params?: GetMailRequest): Promise<ApiResponse<GetMailResponse>> => {
      console.warn('⚠️ mail.list() is deprecated. Use email.received.list() instead.')
      const queryString = params ? buildQueryString(params) : ''
      return this.request<GetMailResponse>(`/mail${queryString}`)
    },

    /**
     * Get a specific email by ID
     * @deprecated Use `email.received.get()` instead
     */
    get: async (id: string): Promise<ApiResponse<GetMailByIdResponse>> => {
      console.warn('⚠️ mail.get() is deprecated. Use email.received.get() instead.')
      return this.request<GetMailByIdResponse>(`/mail/${id}`)
    },

    /**
     * Get email thread/conversation by email ID
     * @deprecated Use `email.received.thread()` instead
     */
    thread: async (id: string): Promise<ApiResponse<any>> => {
      console.warn('⚠️ mail.thread() is deprecated. Use email.received.thread() instead.')
      return this.request<any>(`/mail/${id}/thread`)
    },

    /**
     * Mark email as read
     * @deprecated Use `email.received.markRead()` instead
     */
    markRead: async (id: string): Promise<ApiResponse<any>> => {
      console.warn('⚠️ mail.markRead() is deprecated. Use email.received.markRead() instead.')
      return this.request<any>(`/mail/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isRead: true }),
      })
    },

    /**
     * Mark email as unread
     * @deprecated Use `email.received.markUnread()` instead
     */
    markUnread: async (id: string): Promise<ApiResponse<any>> => {
      console.warn('⚠️ mail.markUnread() is deprecated. Use email.received.markUnread() instead.')
      return this.request<any>(`/mail/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isRead: false }),
      })
    },

    /**
     * Archive email
     * @deprecated Use `email.received.archive()` instead
     */
    archive: async (id: string): Promise<ApiResponse<any>> => {
      console.warn('⚠️ mail.archive() is deprecated. Use email.received.archive() instead.')
      return this.request<any>(`/mail/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isArchived: true }),
      })
    },

    /**
     * Unarchive email
     * @deprecated Use `email.received.unarchive()` instead
     */
    unarchive: async (id: string): Promise<ApiResponse<any>> => {
      console.warn('⚠️ mail.unarchive() is deprecated. Use email.received.unarchive() instead.')
      return this.request<any>(`/mail/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isArchived: false }),
      })
    },

    /**
     * Reply to an email
     * @deprecated Use `email.received.reply()` instead
     */
    reply: async (params: PostMailRequest): Promise<ApiResponse<PostMailResponse>> => {
      console.warn('⚠️ mail.reply() is deprecated. Use email.received.reply() instead.')
      return this.request<PostMailResponse>('/mail', {
        method: 'POST',
        body: JSON.stringify(params),
      })
    },

    /**
     * Bulk operations on multiple emails
     * @deprecated Use `email.received.bulk()` instead
     */
    bulk: async (emailIds: string[], updates: { isRead?: boolean; isArchived?: boolean }): Promise<ApiResponse<any>> => {
      console.warn('⚠️ mail.bulk() is deprecated. Use email.received.bulk() instead.')
      return this.request<any>('/mail/bulk', {
        method: 'POST',
        body: JSON.stringify({ emailIds, updates }),
      })
    },
  }

  /**
   * Email API - Unified interface for managing all emails (received and sent)
   */
  email = {
    /**
     * Send an email with optional attachments
     * Supports both remote files (path) and base64 content
     * Also supports React components for email content
     * If scheduled_at is provided, the email will be scheduled for future delivery
     */
    send: async (params: PostEmailsRequest, options?: IdempotencyOptions): Promise<ApiResponse<PostEmailsResponse>> => {
      // Process React component if provided
      const processedParams = await this.processReactComponent(params)
      
      // Determine endpoint based on whether email is scheduled
      const endpoint = processedParams.scheduled_at ? '/emails/schedule' : '/emails'
      
      // Build headers with optional idempotency key
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }
      
      if (options?.idempotencyKey) {
        headers['Idempotency-Key'] = options.idempotencyKey
      }
      
      return this.request<PostEmailsResponse>(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(processedParams),
      })
    },

    /**
     * Get an email by ID - works for both received and sent emails
     * For received emails, use received.get() for better type safety
     * For sent emails, use sent.get() for better type safety
     */
    get: async (id: string): Promise<ApiResponse<GetMailByIdResponse | GetEmailByIdResponse>> => {
      // First try to get as received email
      try {
        const receivedEmail = await this.request<GetMailByIdResponse>(`/mail/${id}`)
        if (receivedEmail.data) {
          return receivedEmail
        }
      } catch (error) {
        // If that fails, try as sent email
        return this.request<GetEmailByIdResponse>(`/emails/${id}`)
      }
      
      // If we get here, try sent email as fallback
      return this.request<GetEmailByIdResponse>(`/emails/${id}`)
    },

    /**
     * Received emails API - for managing inbound emails
     */
    received: {
      /**
       * List all received emails in the mailbox
       */
      list: async (params?: GetMailRequest): Promise<ApiResponse<GetMailResponse>> => {
        const queryString = params ? buildQueryString(params) : ''
        return this.request<GetMailResponse>(`/mail${queryString}`)
      },

      /**
       * Get a specific received email by ID
       */
      get: async (id: string): Promise<ApiResponse<GetMailByIdResponse>> => {
        return this.request<GetMailByIdResponse>(`/mail/${id}`)
      },

      /**
       * Get email thread/conversation by email ID
       */
      thread: async (id: string): Promise<ApiResponse<any>> => {
        return this.request<any>(`/mail/${id}/thread`)
      },

      /**
       * Mark received email as read
       */
      markRead: async (id: string): Promise<ApiResponse<any>> => {
        return this.request<any>(`/mail/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ isRead: true }),
        })
      },

      /**
       * Mark received email as unread
       */
      markUnread: async (id: string): Promise<ApiResponse<any>> => {
        return this.request<any>(`/mail/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ isRead: false }),
        })
      },

      /**
       * Archive received email
       */
      archive: async (id: string): Promise<ApiResponse<any>> => {
        return this.request<any>(`/mail/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ isArchived: true }),
        })
      },

      /**
       * Unarchive received email
       */
      unarchive: async (id: string): Promise<ApiResponse<any>> => {
        return this.request<any>(`/mail/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ isArchived: false }),
        })
      },

      /**
       * Reply to a received email
       */
      reply: async (params: PostMailRequest): Promise<ApiResponse<PostMailResponse>> => {
        return this.request<PostMailResponse>('/mail', {
          method: 'POST',
          body: JSON.stringify(params),
        })
      },

      /**
       * Bulk operations on multiple received emails
       */
      bulk: async (emailIds: string[], updates: { isRead?: boolean; isArchived?: boolean }): Promise<ApiResponse<any>> => {
        return this.request<any>('/mail/bulk', {
          method: 'POST',
          body: JSON.stringify({ emailIds, updates }),
        })
      },
    },

    /**
     * Sent emails API - for managing outbound emails
     */
    sent: {
      /**
       * Get a sent email by ID
       */
      get: async (id: string): Promise<ApiResponse<GetEmailByIdResponse>> => {
        return this.request<GetEmailByIdResponse>(`/emails/${id}`)
      },

      /**
       * Reply to a sent email by ID with optional attachments
       */
      reply: async (id: string, params: PostEmailReplyRequest, options?: IdempotencyOptions): Promise<ApiResponse<PostEmailReplyResponse>> => {
        // Build headers with optional idempotency key
        const headers: Record<string, string> = {
          'Content-Type': 'application/json'
        }
        
        if (options?.idempotencyKey) {
          headers['Idempotency-Key'] = options.idempotencyKey
        }
        
        return this.request<PostEmailReplyResponse>(`/emails/${id}/reply`, {
          method: 'POST',
          headers,
          body: JSON.stringify(params),
        })
      },

      /**
       * List scheduled emails with filtering and pagination
       */
      listScheduled: async (params?: GetScheduledEmailsRequest): Promise<ApiResponse<GetScheduledEmailsResponse>> => {
        const queryString = params ? buildQueryString(params) : ''
        return this.request<GetScheduledEmailsResponse>(`/emails/schedule${queryString}`)
      },

      /**
       * Get details of a specific scheduled email
       */
      getScheduled: async (id: string): Promise<ApiResponse<GetScheduledEmailResponse>> => {
        return this.request<GetScheduledEmailResponse>(`/emails/schedule/${id}`)
      },

      /**
       * Cancel a scheduled email (only works if status is 'scheduled')
       */
      cancel: async (id: string): Promise<ApiResponse<DeleteScheduledEmailResponse>> => {
        return this.request<DeleteScheduledEmailResponse>(`/emails/schedule/${id}`, {
          method: 'DELETE',
        })
      },
    },

    /**
     * Reply to an email by ID with optional attachments (DEPRECATED - use sent.reply() instead)
     * @deprecated Use `sent.reply()` instead
     */
    reply: async (id: string, params: PostEmailReplyRequest, options?: IdempotencyOptions): Promise<ApiResponse<PostEmailReplyResponse>> => {
      console.warn('⚠️ email.reply() is deprecated. Use email.sent.reply() instead.')
      // Build headers with optional idempotency key
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }
      
      if (options?.idempotencyKey) {
        headers['Idempotency-Key'] = options.idempotencyKey
      }
      
      return this.request<PostEmailReplyResponse>(`/emails/${id}/reply`, {
        method: 'POST',
        headers,
        body: JSON.stringify(params),
      })
    },

    /**
     * Schedule an email to be sent at a future time
     * Supports both ISO 8601 dates and natural language (e.g., "in 1 hour", "tomorrow at 9am")
     * @deprecated This method will remain at the top level for backward compatibility
     */
    schedule: async (params: PostScheduleEmailRequest, options?: IdempotencyOptions): Promise<ApiResponse<PostScheduleEmailResponse>> => {
      // Process React component if provided
      const processedParams = await this.processReactComponent(params as any)
      
      // Build headers with optional idempotency key
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }
      
      if (options?.idempotencyKey) {
        headers['Idempotency-Key'] = options.idempotencyKey
      }
      
      return this.request<PostScheduleEmailResponse>('/emails/schedule', {
        method: 'POST',
        headers,
        body: JSON.stringify(processedParams),
      })
    },

    /**
     * List scheduled emails with filtering and pagination
     * @deprecated Use sent.listScheduled() instead
     */
    listScheduled: async (params?: GetScheduledEmailsRequest): Promise<ApiResponse<GetScheduledEmailsResponse>> => {
      console.warn('⚠️ email.listScheduled() is deprecated. Use email.sent.listScheduled() instead.')
      const queryString = params ? buildQueryString(params) : ''
      return this.request<GetScheduledEmailsResponse>(`/emails/schedule${queryString}`)
    },

    /**
     * Get details of a specific scheduled email
     * @deprecated Use sent.getScheduled() instead
     */
    getScheduled: async (id: string): Promise<ApiResponse<GetScheduledEmailResponse>> => {
      console.warn('⚠️ email.getScheduled() is deprecated. Use email.sent.getScheduled() instead.')
      return this.request<GetScheduledEmailResponse>(`/emails/schedule/${id}`)
    },

    /**
     * Cancel a scheduled email (only works if status is 'scheduled')
     * @deprecated Use sent.cancel() instead
     */
    cancel: async (id: string): Promise<ApiResponse<DeleteScheduledEmailResponse>> => {
      console.warn('⚠️ email.cancel() is deprecated. Use email.sent.cancel() instead.')
      return this.request<DeleteScheduledEmailResponse>(`/emails/schedule/${id}`, {
        method: 'DELETE',
      })
    },

    /**
     * @deprecated Use sent.cancel() instead
     * Cancel a scheduled email (only works if status is 'scheduled')
     */
    cancelScheduled: async (id: string): Promise<ApiResponse<DeleteScheduledEmailResponse>> => {
      console.warn('⚠️ email.cancelScheduled() is deprecated. Use email.sent.cancel() instead.')
      return this.request<DeleteScheduledEmailResponse>(`/emails/schedule/${id}`, {
        method: 'DELETE',
      })
    },

    /**
     * Email Address Management - nested under email
     */
    address: {
      /**
       * Create a new email address
       */
      create: async (params: PostEmailAddressesRequest): Promise<ApiResponse<PostEmailAddressesResponse>> => {
        return this.request<PostEmailAddressesResponse>('/email-addresses', {
          method: 'POST',
          body: JSON.stringify(params),
        })
      },

      /**
       * List all email addresses
       */
      list: async (params?: GetEmailAddressesRequest): Promise<ApiResponse<GetEmailAddressesResponse>> => {
        const queryString = params ? buildQueryString(params) : ''
        return this.request<GetEmailAddressesResponse>(`/email-addresses${queryString}`)
      },

      /**
       * Get a specific email address by ID
       */
      get: async (id: string): Promise<ApiResponse<GetEmailAddressByIdResponse>> => {
        return this.request<GetEmailAddressByIdResponse>(`/email-addresses/${id}`)
      },

      /**
       * Update an email address
       */
      update: async (id: string, params: PutEmailAddressByIdRequest): Promise<ApiResponse<PutEmailAddressByIdResponse>> => {
        return this.request<PutEmailAddressByIdResponse>(`/email-addresses/${id}`, {
          method: 'PUT',
          body: JSON.stringify(params),
        })
      },

      /**
       * Delete an email address
       */
      delete: async (id: string): Promise<ApiResponse<DeleteEmailAddressByIdResponse>> => {
        return this.request<DeleteEmailAddressByIdResponse>(`/email-addresses/${id}`, {
          method: 'DELETE',
        })
      },
    }
  }

  /**
   * Domains API - for managing email domains
   */
  domain = {
    /**
     * Create a new domain
     */
    create: async (params: PostDomainsRequest): Promise<ApiResponse<PostDomainsResponse>> => {
      return this.request<PostDomainsResponse>('/domains', {
        method: 'POST',
        body: JSON.stringify(params),
      })
    },

    /**
     * List all domains
     */
    list: async (params?: GetDomainsRequest): Promise<ApiResponse<GetDomainsResponse>> => {
      const queryString = params ? buildQueryString(params) : ''
      return this.request<GetDomainsResponse>(`/domains${queryString}`)
    },

    /**
     * Get a specific domain by ID
     */
    get: async (id: string): Promise<ApiResponse<GetDomainByIdResponse>> => {
      return this.request<GetDomainByIdResponse>(`/domains/${id}`)
    },

    /**
     * Update domain settings (catch-all configuration)
     */
    update: async (id: string, params: PutDomainByIdRequest): Promise<ApiResponse<PutDomainByIdResponse>> => {
      return this.request<PutDomainByIdResponse>(`/domains/${id}`, {
        method: 'PUT',
        body: JSON.stringify(params),
      })
    },

    /**
     * Delete a domain
     */
    delete: async (id: string): Promise<ApiResponse<any>> => {
      return this.request<any>(`/domains/${id}`, {
        method: 'DELETE',
      })
    },

    /**
     * Initiate domain verification
     */
    verify: async (id: string): Promise<ApiResponse<any>> => {
      return this.request<any>(`/domains/${id}/auth`, {
        method: 'POST',
      })
    },

    /**
     * Get DNS records required for domain verification
     */
    getDnsRecords: async (id: string): Promise<ApiResponse<any>> => {
      return this.request<any>(`/domains/${id}/dns-records`)
    },

    /**
     * Check domain verification status
     */
    checkStatus: async (id: string): Promise<ApiResponse<any>> => {
      return this.request<any>(`/domains/${id}/auth`, {
        method: 'PATCH',
      })
    },
  }

  /**
   * Endpoints API - for managing webhook and email endpoints
   */
  endpoint = {
    /**
     * Create a new endpoint
     */
    create: async (params: PostEndpointsRequest): Promise<ApiResponse<PostEndpointsResponse>> => {
      return this.request<PostEndpointsResponse>('/endpoints', {
        method: 'POST',
        body: JSON.stringify(params),
      })
    },

    /**
     * List all endpoints
     */
    list: async (params?: GetEndpointsRequest): Promise<ApiResponse<GetEndpointsResponse>> => {
      const queryString = params ? buildQueryString(params) : ''
      return this.request<GetEndpointsResponse>(`/endpoints${queryString}`)
    },

    /**
     * Get a specific endpoint by ID
     */
    get: async (id: string): Promise<ApiResponse<GetEndpointByIdResponse>> => {
      return this.request<GetEndpointByIdResponse>(`/endpoints/${id}`)
    },

    /**
     * Update an endpoint
     */
    update: async (id: string, params: PutEndpointByIdRequest): Promise<ApiResponse<PutEndpointByIdResponse>> => {
      return this.request<PutEndpointByIdResponse>(`/endpoints/${id}`, {
        method: 'PUT',
        body: JSON.stringify(params),
      })
    },

    /**
     * Delete an endpoint
     */
    delete: async (id: string): Promise<ApiResponse<DeleteEndpointByIdResponse>> => {
      return this.request<DeleteEndpointByIdResponse>(`/endpoints/${id}`, {
        method: 'DELETE',
      })
    },

    /**
     * Test endpoint connectivity
     */
    test: async (id: string): Promise<ApiResponse<any>> => {
      return this.request<any>(`/endpoints/${id}/test`, {
        method: 'POST',
      })
    },
  }

  /**
   * Convenience Methods - Simplified Common Operations
   */

  /**
   * Quick text reply to an email
   */
  quickReply = async (emailId: string, message: string, from: string, options?: IdempotencyOptions): Promise<ApiResponse<PostEmailReplyResponse>> => {
    return this.email.reply(emailId, {
      from,
      text: message
    }, options)
  }

  /**
   * One-step domain setup with webhook
   */
  setupDomain = async (domain: string, webhookUrl?: string): Promise<ApiResponse<any>> => {
    // First create the domain
    const domainResult = await this.domain.create({ domain: domain })
    if (domainResult.error) {
      return domainResult
    }

    // If webhook URL provided, create an endpoint
    if (webhookUrl && domainResult.data) {
      const endpointResult = await this.endpoint.create({
        name: `${domain} Webhook`,
        type: 'webhook',
        config: { 
          url: webhookUrl,
          timeout: 30000,
          retryAttempts: 3
        }
      })
      
      return {
        data: {
          domain: domainResult.data,
          endpoint: endpointResult.data
        }
      }
    }

    return domainResult
  }

  /**
   * Simple email forwarding setup
   */
  createForwarder = async (from: string, to: string): Promise<ApiResponse<any>> => {
    return this.endpoint.create({
      name: `Forward ${from} to ${to}`,
      type: 'email',
      config: { 
        email: to
      }
    })
  }

  /**
   * Quick scheduled email reminder
   */
  scheduleReminder = async (to: string, subject: string, when: string, from: string, options?: IdempotencyOptions): Promise<ApiResponse<PostScheduleEmailResponse>> => {
    return this.email.schedule({
      from,
      to,
      subject,
      text: `Reminder: ${subject}`,
      scheduled_at: when
    }, options)
  }

  /**
   * Legacy compatibility methods
   */

  /**
   * @deprecated Use email.send() instead
   * Legacy send method for backwards compatibility
   */
  send = async (params: PostEmailsRequest, options?: IdempotencyOptions): Promise<ApiResponse<PostEmailsResponse>> => {
    return this.email.send(params, options)
  }

  /**
   * Streamlined reply method for webhook handlers
   * Works directly with webhook email objects for better DX
   * 
   * Usage:
   * - const { data, error } = await inbound.reply("email-id", { from: "support@domain.com", text: "Thanks!" })
   * - const { data, error } = await inbound.reply(email, { from: "support@domain.com", text: "Thanks!" })
   */
  reply = async (
    emailOrId: InboundWebhookEmail | string,
    replyParams: PostEmailReplyRequest,
    options?: IdempotencyOptions
  ): Promise<ApiResponse<PostEmailReplyResponse>> => {
    // Determine email ID
    const emailId = typeof emailOrId === 'string' ? emailOrId : emailOrId.id

    // Validate that we have a from address
    if (!replyParams.from) {
      return {
        error: 'Reply requires a "from" address.'
      }
    }

    return this.email.reply(emailId, replyParams, options)
  }

  // Legacy aliases for backwards compatibility
  domains = this.domain
  endpoints = this.endpoint
  emailAddresses = this.email.address
  emails = this.email
} 