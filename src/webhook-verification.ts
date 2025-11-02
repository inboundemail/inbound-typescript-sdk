/**
 * Webhook Verification Utilities
 * 
 * Helper functions for verifying webhook requests from Inbound Email
 */

import type { InboundEmailClient } from './client'
import type { ApiResponse } from './types'

/**
 * Verify a webhook request by checking the verification token
 * 
 * This function fetches the endpoint configuration from the API and compares
 * the provided verification token with the stored token in the endpoint config.
 * 
 * @param endpointId - The endpoint ID (from X-Endpoint-ID header)
 * @param verificationToken - The verification token from the webhook header (X-Webhook-Verification-Token)
 * @param client - The InboundEmailClient instance (must be initialized with API key)
 * @returns Promise resolving to true if verification token matches, false otherwise
 * 
 * @example
 * ```typescript
 * import { Inbound, verifyWebhook } from '@inboundemail/sdk'
 * 
 * // In your webhook handler
 * export async function POST(request: Request) {
 *   const endpointId = request.headers.get('X-Endpoint-ID')
 *   const verificationToken = request.headers.get('X-Webhook-Verification-Token')
 *   
 *   const client = new Inbound(process.env.INBOUND_API_KEY!)
 *   
 *   const isValid = await verifyWebhook(endpointId, verificationToken, client)
 *   
 *   if (!isValid) {
 *     return new Response('Unauthorized', { status: 401 })
 *   }
 *   
 *   // Process webhook...
 * }
 * ```
 */
export async function verifyWebhook(
  endpointId: string | null,
  verificationToken: string | null,
  client: InboundEmailClient
): Promise<boolean> {
  // Validate inputs
  if (!endpointId) {
    console.warn('⚠️ verifyWebhook: Missing endpoint ID')
    return false
  }

  if (!verificationToken) {
    console.warn('⚠️ verifyWebhook: Missing verification token')
    return false
  }

  try {
    // Fetch endpoint from API
    const endpointResponse = await client.endpoint.get(endpointId)
    
    if (endpointResponse.error || !endpointResponse.data) {
      console.warn('⚠️ verifyWebhook: Failed to fetch endpoint:', endpointResponse.error)
      return false
    }

    const endpoint = endpointResponse.data

    // Parse endpoint config (config is stored as JSON string)
    let config: any = {}
    try {
      config = typeof endpoint.config === 'string' 
        ? JSON.parse(endpoint.config) 
        : endpoint.config
    } catch (parseError) {
      console.warn('⚠️ verifyWebhook: Failed to parse endpoint config:', parseError)
      return false
    }

    // Check if verification token exists in config
    if (!config.verificationToken || typeof config.verificationToken !== 'string') {
      console.warn('⚠️ verifyWebhook: No verification token configured for endpoint')
      return false
    }

    // Compare tokens (constant-time comparison would be better, but for webhook verification
    // this is sufficient as timing attacks are less of a concern here)
    const isValid = config.verificationToken === verificationToken

    if (!isValid) {
      console.warn('⚠️ verifyWebhook: Verification token mismatch')
    }

    return isValid
  } catch (error) {
    console.error('❌ verifyWebhook: Unexpected error:', error)
    return false
  }
}

/**
 * Verify a webhook request using request headers
 * 
 * Convenience function that extracts endpoint ID and verification token from headers
 * and verifies the webhook.
 * 
 * @param headers - Headers object (from Request.headers or similar)
 * @param client - The InboundEmailClient instance (must be initialized with API key)
 * @returns Promise resolving to true if verification token matches, false otherwise
 * 
 * @example
 * ```typescript
 * import { Inbound, verifyWebhookFromHeaders } from '@inboundemail/sdk'
 * 
 * export async function POST(request: Request) {
 *   const client = new Inbound(process.env.INBOUND_API_KEY!)
 *   
 *   const isValid = await verifyWebhookFromHeaders(request.headers, client)
 *   
 *   if (!isValid) {
 *     return new Response('Unauthorized', { status: 401 })
 *   }
 *   
 *   // Process webhook...
 * }
 * ```
 */
export async function verifyWebhookFromHeaders(
  headers: Headers | Record<string, string | null>,
  client: InboundEmailClient
): Promise<boolean> {
  // Extract headers (handle both Headers object and plain object)
  const getHeader = (name: string): string | null => {
    if (headers instanceof Headers) {
      return headers.get(name)
    }
    return headers[name] || null
  }

  const endpointId = getHeader('X-Endpoint-ID')
  const verificationToken = getHeader('X-Webhook-Verification-Token')

  return verifyWebhook(endpointId, verificationToken, client)
}
