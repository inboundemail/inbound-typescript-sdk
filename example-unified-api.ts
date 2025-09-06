// Example: Using the new unified email API
import { Inbound } from './dist/index.js'

const inbound = new Inbound('your-api-key')

async function demonstrateUnifiedAPI() {
  console.log('🚀 Demonstrating the new unified email API\n')
  
  // ===== NEW UNIFIED APPROACH =====
  
  console.log('1. 📧 Working with received emails (NEW)')
  
  // List received emails - now under email.received
  const { data: receivedEmails, error: listError } = await inbound.email.received.list()
  if (!listError && receivedEmails?.length > 0) {
    const firstEmail = receivedEmails[0]
    console.log(`   Found ${receivedEmails.length} received emails`)
    
    // Get specific received email
    const { data: email, error: getError } = await inbound.email.received.get(firstEmail.id)
    if (!getError && email) {
      console.log(`   ✅ Retrieved email: ${email.subject}`)
      
      // Mark as read using new API
      await inbound.email.received.markRead(firstEmail.id)
      console.log(`   ✅ Marked email as read`)
    }
  }
  
  console.log('\n2. 📤 Working with sent emails (NEW)')
  
  // Send email (still at top level for convenience)
  const { data: sentEmail, error: sendError } = await inbound.email.send({
    from: 'test@example.com',
    to: 'recipient@example.com',
    subject: 'Test Email',
    html: '<p>This is a test email</p>'
  })
  
  if (!sendError && sentEmail) {
    console.log(`   ✅ Email sent with ID: ${sentEmail.id}`)
    
    // Get sent email details using new API
    const { data: sentDetails, error: sentError } = await inbound.email.sent.get(sentEmail.id)
    if (!sentError && sentDetails) {
      console.log(`   ✅ Retrieved sent email: ${sentDetails.subject}`)
    }
  }
  
  console.log('\n3. 🔄 Universal email access (NEW)')
  
  // The new universal get method can retrieve ANY email (received or sent)
  const emailId = 'Pquw-Puw3CCtCutPEuOn2' // From your original example
  const { data: anyEmail, error: universalError } = await inbound.email.get(emailId)
  if (!universalError && anyEmail) {
    console.log(`   ✅ Universal get found email: ${emailId}`)
    console.log(`   📧 Subject: ${anyEmail.subject}`)
  } else {
    console.log(`   ❌ Email ${emailId} not found`)
  }
  
  // ===== DEPRECATED BUT STILL WORKING =====
  
  console.log('\n⚠️  Using deprecated mail.* methods (still works, but shows warnings):')
  
  // These will work but show deprecation warnings
  const { data: deprecatedEmails } = await inbound.mail.list()
  if (deprecatedEmails?.length > 0) {
    const { data: deprecatedEmail } = await inbound.mail.get(deprecatedEmails[0].id)
    console.log(`   📧 Deprecated mail.get() still works: ${deprecatedEmail?.subject}`)
  }
  
  console.log('\n🎉 Migration complete! Use email.received.* and email.sent.* going forward.')
}

// Uncomment to run (make sure you have a valid API key)
// demonstrateUnifiedAPI().catch(console.error)

export { demonstrateUnifiedAPI }
