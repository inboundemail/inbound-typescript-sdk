// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Inbound from 'inbound';

const client = new Inbound({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource emails', () => {
  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.v2.emails.retrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('reply: only required params', async () => {
    const responsePromise = client.v2.emails.reply('id', { from: 'support@yourdomain.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('reply: required and optional params', async () => {
    const response = await client.v2.emails.reply('id', {
      from: 'support@yourdomain.com',
      attachments: [
        {
          filename: 'invoice.pdf',
          content: 'U3RhaW5sZXNzIHJvY2tz',
          content_id: 'company-logo',
          content_type: 'application/pdf',
          contentType: 'application/pdf',
          path: 'https://example.com/document.pdf',
        },
      ],
      headers: { foo: 'string' },
      html: 'html',
      replyAll: true,
      subject: 'subject',
      tags: [{ name: 'name', value: 'value' }],
      text: 'text',
      to: 'string',
      'API-Version': 'API-Version',
      'Idempotency-Key': 'Idempotency-Key',
    });
  });

  // Prism tests are disabled
  test.skip('resend: only required params', async () => {
    const responsePromise = client.v2.emails.resend('id', { endpointId: 'endpoint_abc123xyz' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('resend: required and optional params', async () => {
    const response = await client.v2.emails.resend('id', { endpointId: 'endpoint_abc123xyz' });
  });

  // Prism tests are disabled
  test.skip('retryDelivery: only required params', async () => {
    const responsePromise = client.v2.emails.retryDelivery('id', { deliveryId: 'delivery_xyz456' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retryDelivery: required and optional params', async () => {
    const response = await client.v2.emails.retryDelivery('id', { deliveryId: 'delivery_xyz456' });
  });

  // Prism tests are disabled
  test.skip('send: only required params', async () => {
    const responsePromise = client.v2.emails.send({
      from: 'Support Team <support@yourdomain.com>',
      subject: 'Welcome to Inbound',
      to: ['customer@example.com'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('send: required and optional params', async () => {
    const response = await client.v2.emails.send({
      from: 'Support Team <support@yourdomain.com>',
      subject: 'Welcome to Inbound',
      to: ['customer@example.com'],
      attachments: [
        {
          filename: 'invoice.pdf',
          content: 'U3RhaW5sZXNzIHJvY2tz',
          content_id: 'company-logo',
          content_type: 'application/pdf',
          contentType: 'application/pdf',
          path: 'https://example.com/document.pdf',
        },
      ],
      bcc: 'string',
      cc: 'string',
      headers: { foo: 'string' },
      html: 'html',
      reply_to: 'string',
      replyTo: 'string',
      tags: [{ name: 'name', value: 'value' }],
      text: 'text',
      'Idempotency-Key': 'Idempotency-Key',
    });
  });
});
