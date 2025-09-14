// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Onboarding extends APIResource {
  /**
   * GET /onboarding/check-reply
   */
  checkReply(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/api/v2/onboarding/check-reply', options);
  }

  /**
   * POST /onboarding/demo
   */
  demo(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/api/v2/onboarding/demo', options);
  }

  /**
   * POST /onboarding/webhook
   */
  webhook(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/api/v2/onboarding/webhook', options);
  }
}

export type OnboardingCheckReplyResponse = unknown;

export type OnboardingDemoResponse = unknown;

export type OnboardingWebhookResponse = unknown;

export declare namespace Onboarding {
  export {
    type OnboardingCheckReplyResponse as OnboardingCheckReplyResponse,
    type OnboardingDemoResponse as OnboardingDemoResponse,
    type OnboardingWebhookResponse as OnboardingWebhookResponse,
  };
}
