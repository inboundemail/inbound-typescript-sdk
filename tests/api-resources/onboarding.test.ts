// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Inbound from 'inbound';

const client = new Inbound({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource onboarding', () => {
  // Prism tests are disabled
  test.skip('checkReply', async () => {
    const responsePromise = client.onboarding.checkReply();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('handleWebhook', async () => {
    const responsePromise = client.onboarding.handleWebhook();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('handleWebhook: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.onboarding.handleWebhook({}, { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Inbound.NotFoundError,
    );
  });

  // Prism tests are disabled
  test.skip('sendDemo', async () => {
    const responsePromise = client.onboarding.sendDemo();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('sendDemo: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.onboarding.sendDemo({ apiKey: 'apiKey', to: 'to' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Inbound.NotFoundError);
  });
});
