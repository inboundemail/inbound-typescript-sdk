// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Inbound from 'inbound';

const client = new Inbound({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource emails', () => {
  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.emails.retrieve('123');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('reply', async () => {
    const responsePromise = client.emails.reply('123');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('reply: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.emails.reply(
        '123',
        {
          attachments: [
            {
              content: 'content',
              content_id: 'content_id',
              content_type: 'content_type',
              contentType: 'contentType',
              filename: 'filename',
              path: 'path',
            },
          ],
          bcc: 'string',
          cc: 'string',
          from: 'from',
          from_name: 'from_name',
          headers: { foo: 'string' },
          html: 'html',
          include_original: true,
          includeOriginal: true,
          reply_to: 'string',
          replyTo: 'string',
          simple: true,
          subject: 'subject',
          tags: [{ name: 'name', value: 'value' }],
          text: 'text',
          to: 'string',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Inbound.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('send', async () => {
    const responsePromise = client.emails.send();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('send: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.emails.send(
        {
          attachments: [
            {
              content: 'content',
              content_id: 'content_id',
              content_type: 'content_type',
              contentType: 'contentType',
              filename: 'filename',
              path: 'path',
            },
          ],
          bcc: 'string',
          cc: 'string',
          from: 'from',
          headers: { foo: 'string' },
          html: 'html',
          reply_to: 'string',
          replyTo: 'string',
          subject: 'subject',
          tags: [{ name: 'name', value: 'value' }],
          text: 'text',
          to: 'string',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Inbound.NotFoundError);
  });
});
