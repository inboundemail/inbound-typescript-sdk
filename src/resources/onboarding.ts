// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Onboarding extends APIResource {
  /**
   * Check if the user has received a reply to their onboarding demo email. Used for
   * polling during the onboarding flow.
   */
  checkReply(options?: RequestOptions): APIPromise<OnboardingCheckReplyResponse> {
    return this._client.get('/v2/onboarding/check-reply', options);
  }

  /**
   * Process webhook events for onboarding demo emails. Updates demo status when
   * replies are received.
   */
  handleWebhook(
    body?: OnboardingHandleWebhookParams | null | undefined,
    options?: RequestOptions,
  ): APIPromise<OnboardingHandleWebhookResponse> {
    return this._client.post('/v2/onboarding/webhook', { body, ...options });
  }

  /**
   * Send a demo email to test the SDK integration during onboarding. The recipient
   * can reply to complete the onboarding flow.
   */
  sendDemo(
    body: OnboardingSendDemoParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OnboardingSendDemoResponse> {
    return this._client.post('/v2/onboarding/demo', { body, ...options });
  }
}

export interface OnboardingCheckReplyResponse {
  hasReply?: boolean;

  reply?: OnboardingCheckReplyResponse.Reply;
}

export namespace OnboardingCheckReplyResponse {
  export interface Reply {
    body?: string;

    from?: string;

    receivedAt?: string;

    subject?: string;
  }
}

export interface OnboardingHandleWebhookResponse {
  success?: boolean;
}

export interface OnboardingSendDemoResponse {
  /**
   * The ID of the sent demo email
   */
  id?: string;
}

export interface OnboardingHandleWebhookParams {}

export interface OnboardingSendDemoParams {
  apiKey?: string;

  to?: string;
}

export declare namespace Onboarding {
  export {
    type OnboardingCheckReplyResponse as OnboardingCheckReplyResponse,
    type OnboardingHandleWebhookResponse as OnboardingHandleWebhookResponse,
    type OnboardingSendDemoResponse as OnboardingSendDemoResponse,
    type OnboardingHandleWebhookParams as OnboardingHandleWebhookParams,
    type OnboardingSendDemoParams as OnboardingSendDemoParams,
  };
}
