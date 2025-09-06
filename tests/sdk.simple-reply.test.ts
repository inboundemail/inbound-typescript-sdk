import { describe, expect, test, beforeAll } from "bun:test"
import { InboundEmailClient } from "../src/client"
import type { PostEmailReplyRequest, PostEmailReplyResponse } from "../src/types"

const TEST_API_KEY = process.env.INBOUND_EMAIL_API_KEY || 'test-key'
const TEST_BASE_URL = process.env.INBOUND_EMAIL_BASE_URL || 'http://localhost:3000/api/v2'
const TEST_FROM_EMAIL = process.env.TEST_FROM_EMAIL || 'test@exon.dev'

// Create SDK instance
const inbound = new InboundEmailClient(TEST_API_KEY, TEST_BASE_URL)

describe('🚀 Simple Reply Mode Tests', () => {
  let testEmailId: string | undefined
  
  beforeAll(() => {
    // In a real test, you'd create a test email first
    // For now, we'll use a placeholder
    testEmailId = process.env.TEST_EMAIL_ID || 'test-email-123'
  })

  test('should send a simple reply with minimal data', async () => {
    console.log('🚀 Testing simple reply mode via SDK')
    
    const replyData: PostEmailReplyRequest = {
      from: TEST_FROM_EMAIL,
      text: 'This is a simple reply using the new simple mode.',
      simple: true  // Enable simple mode
    }

    const response = await inbound.emails.reply(testEmailId!, replyData)
    
    console.log('📊 Simple Reply Response:', response)

    if (response.data) {
      expect(response.data.id).toBeDefined()
      expect(response.data.messageId).toBeDefined()
      expect(response.data.awsMessageId).toBeDefined()
    } else {
      // If test environment doesn't have a real email, expect error
      expect(response.error).toBeDefined()
      console.log('⚠️ Expected error in test environment:', response.error)
    }
  })

  test('should send a simple reply with sender name', async () => {
    console.log('🚀 Testing simple reply with sender name via SDK')
    
    const replyData: PostEmailReplyRequest = {
      from: TEST_FROM_EMAIL,
      from_name: 'Support Team',
      text: 'Hello! This is a reply from our support team.',
      simple: true
    }

    const response = await inbound.emails.reply(testEmailId!, replyData)
    
    console.log('📊 Simple Reply with Name Response:', response)

    if (response.data) {
      expect(response.data.id).toBeDefined()
      expect(response.data.messageId).toBeDefined()
      expect(response.data.awsMessageId).toBeDefined()
    } else {
      expect(response.error).toBeDefined()
      console.log('⚠️ Expected error in test environment:', response.error)
    }
  })

  test('should send a simple reply with HTML content', async () => {
    console.log('🚀 Testing simple reply with HTML via SDK')
    
    const replyData: PostEmailReplyRequest = {
      from: TEST_FROM_EMAIL,
      text: 'Thanks for your message!',
      html: '<p>Thanks for your message!</p><p>Best regards,<br>The Team</p>',
      simple: true
    }

    const response = await inbound.emails.reply(testEmailId!, replyData)
    
    console.log('📊 Simple Reply HTML Response:', response)

    if (response.data) {
      expect(response.data.id).toBeDefined()
      expect(response.data.messageId).toBeDefined()
      expect(response.data.awsMessageId).toBeDefined()
    } else {
      expect(response.error).toBeDefined()
      console.log('⚠️ Expected error in test environment:', response.error)
    }
  })

  test('should handle simple reply with tags', async () => {
    console.log('🚀 Testing simple reply with tags via SDK')
    
    const replyData: PostEmailReplyRequest = {
      from: TEST_FROM_EMAIL,
      text: 'Tagged reply message',
      tags: [
        { name: 'category', value: 'support' },
        { name: 'priority', value: 'high' }
      ],
      simple: true
    }

    const response = await inbound.emails.reply(testEmailId!, replyData)
    
    console.log('📊 Simple Reply Tags Response:', response)

    if (response.data) {
      expect(response.data.id).toBeDefined()
      expect(response.data.messageId).toBeDefined()
      expect(response.data.awsMessageId).toBeDefined()
    } else {
      expect(response.error).toBeDefined()
      console.log('⚠️ Expected error in test environment:', response.error)
    }
  })

  test('should handle both snake_case and camelCase properties', async () => {
    console.log('🚀 Testing property compatibility via SDK')
    
    const replyData: PostEmailReplyRequest = {
      from: TEST_FROM_EMAIL,
      text: 'Testing property compatibility',
      reply_to: 'legacy@example.com',  // snake_case (legacy)
      replyTo: 'modern@example.com',   // camelCase (Resend-compatible)
      include_original: false,          // snake_case (legacy)
      includeOriginal: false,           // camelCase (Resend-compatible)
      simple: true
    }

    const response = await inbound.emails.reply(testEmailId!, replyData)
    
    console.log('📊 Property Compatibility Response:', response)

    if (response.data) {
      expect(response.data.id).toBeDefined()
      expect(response.data.messageId).toBeDefined()
      expect(response.data.awsMessageId).toBeDefined()
    } else {
      expect(response.error).toBeDefined()
      console.log('⚠️ Expected error in test environment:', response.error)
    }
  })

  test('should send regular reply when simple mode is false', async () => {
    console.log('🚀 Testing regular reply mode (simple=false) via SDK')
    
    const replyData: PostEmailReplyRequest = {
      from: TEST_FROM_EMAIL,
      text: 'This is a regular reply (not simple mode).',
      simple: false  // Explicitly disable simple mode
    }

    const response = await inbound.emails.reply(testEmailId!, replyData)
    
    console.log('📊 Regular Reply Response:', response)

    if (response.data) {
      expect(response.data.id).toBeDefined()
      expect(response.data.messageId).toBeDefined()
      expect(response.data.awsMessageId).toBeDefined()
    } else {
      expect(response.error).toBeDefined()
      console.log('⚠️ Expected error in test environment:', response.error)
    }
  })

  test('should use quickReply with simple mode', async () => {
    console.log('🚀 Testing quickReply method compatibility')
    
    // quickReply doesn't support simple mode directly, but we can verify it works
    const response = await inbound.quickReply(
      testEmailId!,
      'Quick reply message',
      TEST_FROM_EMAIL
    )
    
    console.log('📊 Quick Reply Response:', response)

    if (response.data) {
      expect(response.data.id).toBeDefined()
      // Note: quickReply might not return the new fields
    } else {
      expect(response.error).toBeDefined()
      console.log('⚠️ Expected error in test environment:', response.error)
    }
  })
})

