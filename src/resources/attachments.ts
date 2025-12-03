// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Attachments extends APIResource {
  /**
   * Download an email attachment by email ID and filename. Returns the binary file
   * content with appropriate Content-Type and Content-Disposition headers.
   */
  retrieve(filename: string, params: AttachmentRetrieveParams, options?: RequestOptions): APIPromise<void> {
    const { id } = params;
    return this._client.get(path`/api/e2/attachments/${id}/${filename}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface AttachmentRetrieveParams {
  id: string;
}

export declare namespace Attachments {
  export { type AttachmentRetrieveParams as AttachmentRetrieveParams };
}
