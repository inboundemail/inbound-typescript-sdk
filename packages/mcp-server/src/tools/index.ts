// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import retrieve_attachments from './attachments/retrieve-attachments';
import create_domains from './domains/create-domains';
import retrieve_domains from './domains/retrieve-domains';
import update_domains from './domains/update-domains';
import list_domains from './domains/list-domains';
import delete_domains from './domains/delete-domains';
import create_endpoints from './endpoints/create-endpoints';
import retrieve_endpoints from './endpoints/retrieve-endpoints';
import update_endpoints from './endpoints/update-endpoints';
import list_endpoints from './endpoints/list-endpoints';
import delete_endpoints from './endpoints/delete-endpoints';
import test_endpoints from './endpoints/test-endpoints';
import create_email_addresses from './email-addresses/create-email-addresses';
import retrieve_email_addresses from './email-addresses/retrieve-email-addresses';
import update_email_addresses from './email-addresses/update-email-addresses';
import list_email_addresses from './email-addresses/list-email-addresses';
import delete_email_addresses from './email-addresses/delete-email-addresses';
import retrieve_emails from './emails/retrieve-emails';
import list_emails from './emails/list-emails';
import delete_emails from './emails/delete-emails';
import reply_emails from './emails/reply-emails';
import retry_emails from './emails/retry-emails';
import send_emails from './emails/send-emails';
import retrieve_mail from './mail/retrieve-mail';
import list_mail from './mail/list-mail';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(retrieve_attachments);
addEndpoint(create_domains);
addEndpoint(retrieve_domains);
addEndpoint(update_domains);
addEndpoint(list_domains);
addEndpoint(delete_domains);
addEndpoint(create_endpoints);
addEndpoint(retrieve_endpoints);
addEndpoint(update_endpoints);
addEndpoint(list_endpoints);
addEndpoint(delete_endpoints);
addEndpoint(test_endpoints);
addEndpoint(create_email_addresses);
addEndpoint(retrieve_email_addresses);
addEndpoint(update_email_addresses);
addEndpoint(list_email_addresses);
addEndpoint(delete_email_addresses);
addEndpoint(retrieve_emails);
addEndpoint(list_emails);
addEndpoint(delete_emails);
addEndpoint(reply_emails);
addEndpoint(retry_emails);
addEndpoint(send_emails);
addEndpoint(retrieve_mail);
addEndpoint(list_mail);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
