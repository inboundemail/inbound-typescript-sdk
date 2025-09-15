// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Inbound from 'inbnd';

const client = new Inbound({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource emails', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.v2.emails.create({ from: 'from', subject: 'subject', to: 'to' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.v2.emails.create({
      from: 'from',
      subject: 'subject',
      to: 'to',
      attachments: ['string'],
      bcc: 'bcc',
      cc: 'cc',
      headers: 'headers',
      html: 'html',
      reply_to: 'reply_to',
      replyTo: 'replyTo',
      tags: 'tags',
      text: 'text',
    });
  });

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
    const responsePromise = client.v2.emails.reply('id', { from: 'from' });
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
      from: 'from',
      attachments: ['string'],
      bcc: 'bcc',
      cc: 'cc',
      from_name: 'from_name',
      headers: 'headers',
      html: 'html',
      include_original: true,
      includeOriginal: true,
      reply_to: 'reply_to',
      replyTo: 'replyTo',
      simple: true,
      subject: 'subject',
      tags: 'tags',
      text: 'text',
      to: 'to',
    });
  });
});
