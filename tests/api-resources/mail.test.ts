// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Inbound from 'inbound';

const client = new Inbound({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource mail', () => {
  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.mail.retrieve('123');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.mail.update('123');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.mail.update('123', { isArchived: true, isRead: true }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Inbound.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.mail.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.mail.list(
        {
          domain: 'domain',
          emailAddress: 'emailAddress',
          emailId: 'emailId',
          includeArchived: true,
          limit: 0,
          offset: 0,
          search: 'search',
          status: 'all',
          timeRange: '24h',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Inbound.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('bulkUpdate', async () => {
    const responsePromise = client.mail.bulkUpdate();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('bulkUpdate: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.mail.bulkUpdate(
        { emailIds: ['string'], updates: { isArchived: true, isRead: true } },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Inbound.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('getThread', async () => {
    const responsePromise = client.mail.getThread('123');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getThreadCounts', async () => {
    const responsePromise = client.mail.getThreadCounts();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getThreadCounts: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.mail.getThreadCounts({ emailIds: ['string'] }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Inbound.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('reply', async () => {
    const responsePromise = client.mail.reply();
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
      client.mail.reply(
        {
          attachments: [{ content: 'content', contentType: 'contentType', filename: 'filename' }],
          emailId: 'emailId',
          htmlBody: 'htmlBody',
          subject: 'subject',
          textBody: 'textBody',
          to: 'to',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Inbound.NotFoundError);
  });
});
