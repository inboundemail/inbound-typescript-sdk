// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.attachments.retrieve',
    fullyQualifiedName: 'attachments.retrieve',
    httpMethod: 'get',
    httpPath: '/api/e2/attachments/{id}/{filename}',
  },
  {
    clientCallName: 'client.domains.create',
    fullyQualifiedName: 'domains.create',
    httpMethod: 'post',
    httpPath: '/api/e2/domains',
  },
  {
    clientCallName: 'client.domains.retrieve',
    fullyQualifiedName: 'domains.retrieve',
    httpMethod: 'get',
    httpPath: '/api/e2/domains/{id}',
  },
  {
    clientCallName: 'client.domains.update',
    fullyQualifiedName: 'domains.update',
    httpMethod: 'patch',
    httpPath: '/api/e2/domains/{id}',
  },
  {
    clientCallName: 'client.domains.list',
    fullyQualifiedName: 'domains.list',
    httpMethod: 'get',
    httpPath: '/api/e2/domains',
  },
  {
    clientCallName: 'client.domains.delete',
    fullyQualifiedName: 'domains.delete',
    httpMethod: 'delete',
    httpPath: '/api/e2/domains/{id}',
  },
  {
    clientCallName: 'client.endpoints.create',
    fullyQualifiedName: 'endpoints.create',
    httpMethod: 'post',
    httpPath: '/api/e2/endpoints',
  },
  {
    clientCallName: 'client.endpoints.retrieve',
    fullyQualifiedName: 'endpoints.retrieve',
    httpMethod: 'get',
    httpPath: '/api/e2/endpoints/{id}',
  },
  {
    clientCallName: 'client.endpoints.update',
    fullyQualifiedName: 'endpoints.update',
    httpMethod: 'put',
    httpPath: '/api/e2/endpoints/{id}',
  },
  {
    clientCallName: 'client.endpoints.list',
    fullyQualifiedName: 'endpoints.list',
    httpMethod: 'get',
    httpPath: '/api/e2/endpoints',
  },
  {
    clientCallName: 'client.endpoints.delete',
    fullyQualifiedName: 'endpoints.delete',
    httpMethod: 'delete',
    httpPath: '/api/e2/endpoints/{id}',
  },
  {
    clientCallName: 'client.endpoints.test',
    fullyQualifiedName: 'endpoints.test',
    httpMethod: 'post',
    httpPath: '/api/e2/endpoints/{id}/test',
  },
  {
    clientCallName: 'client.emailAddresses.create',
    fullyQualifiedName: 'emailAddresses.create',
    httpMethod: 'post',
    httpPath: '/api/e2/email-addresses',
  },
  {
    clientCallName: 'client.emailAddresses.retrieve',
    fullyQualifiedName: 'emailAddresses.retrieve',
    httpMethod: 'get',
    httpPath: '/api/e2/email-addresses/{id}',
  },
  {
    clientCallName: 'client.emailAddresses.update',
    fullyQualifiedName: 'emailAddresses.update',
    httpMethod: 'put',
    httpPath: '/api/e2/email-addresses/{id}',
  },
  {
    clientCallName: 'client.emailAddresses.list',
    fullyQualifiedName: 'emailAddresses.list',
    httpMethod: 'get',
    httpPath: '/api/e2/email-addresses',
  },
  {
    clientCallName: 'client.emailAddresses.delete',
    fullyQualifiedName: 'emailAddresses.delete',
    httpMethod: 'delete',
    httpPath: '/api/e2/email-addresses/{id}',
  },
  {
    clientCallName: 'client.emails.retrieve',
    fullyQualifiedName: 'emails.retrieve',
    httpMethod: 'get',
    httpPath: '/api/e2/emails/{id}',
  },
  {
    clientCallName: 'client.emails.list',
    fullyQualifiedName: 'emails.list',
    httpMethod: 'get',
    httpPath: '/api/e2/emails',
  },
  {
    clientCallName: 'client.emails.delete',
    fullyQualifiedName: 'emails.delete',
    httpMethod: 'delete',
    httpPath: '/api/e2/emails/{id}',
  },
  {
    clientCallName: 'client.emails.reply',
    fullyQualifiedName: 'emails.reply',
    httpMethod: 'post',
    httpPath: '/api/e2/emails/{id}/reply',
  },
  {
    clientCallName: 'client.emails.retry',
    fullyQualifiedName: 'emails.retry',
    httpMethod: 'post',
    httpPath: '/api/e2/emails/{id}/retry',
  },
  {
    clientCallName: 'client.emails.send',
    fullyQualifiedName: 'emails.send',
    httpMethod: 'post',
    httpPath: '/api/e2/emails',
  },
  {
    clientCallName: 'client.mail.retrieve',
    fullyQualifiedName: 'mail.retrieve',
    httpMethod: 'get',
    httpPath: '/api/e2/mail/threads/{id}',
  },
  {
    clientCallName: 'client.mail.list',
    fullyQualifiedName: 'mail.list',
    httpMethod: 'get',
    httpPath: '/api/e2/mail/threads',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
