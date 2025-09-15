// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import create_v2_domains from './v2/domains/create-v2-domains';
import retrieve_v2_domains from './v2/domains/retrieve-v2-domains';
import update_v2_domains from './v2/domains/update-v2-domains';
import list_v2_domains from './v2/domains/list-v2-domains';
import delete_v2_domains from './v2/domains/delete-v2-domains';
import list_dns_records_v2_domains from './v2/domains/list-dns-records-v2-domains';
import create_domains_v2_auth from './v2/domains/auth/create-domains-v2-auth';
import update_domains_v2_auth from './v2/domains/auth/update-domains-v2-auth';
import create_v2_email_addresses from './v2/email-addresses/create-v2-email-addresses';
import retrieve_v2_email_addresses from './v2/email-addresses/retrieve-v2-email-addresses';
import update_v2_email_addresses from './v2/email-addresses/update-v2-email-addresses';
import list_v2_email_addresses from './v2/email-addresses/list-v2-email-addresses';
import delete_v2_email_addresses from './v2/email-addresses/delete-v2-email-addresses';
import create_v2_emails from './v2/emails/create-v2-emails';
import retrieve_v2_emails from './v2/emails/retrieve-v2-emails';
import reply_v2_emails from './v2/emails/reply-v2-emails';
import create_emails_v2_schedule from './v2/emails/schedule/create-emails-v2-schedule';
import retrieve_emails_v2_schedule from './v2/emails/schedule/retrieve-emails-v2-schedule';
import list_emails_v2_schedule from './v2/emails/schedule/list-emails-v2-schedule';
import delete_emails_v2_schedule from './v2/emails/schedule/delete-emails-v2-schedule';
import create_v2_endpoints from './v2/endpoints/create-v2-endpoints';
import retrieve_v2_endpoints from './v2/endpoints/retrieve-v2-endpoints';
import update_v2_endpoints from './v2/endpoints/update-v2-endpoints';
import list_v2_endpoints from './v2/endpoints/list-v2-endpoints';
import delete_v2_endpoints from './v2/endpoints/delete-v2-endpoints';
import test_v2_endpoints from './v2/endpoints/test-v2-endpoints';
import create_v2_mail from './v2/mail/create-v2-mail';
import retrieve_v2_mail from './v2/mail/retrieve-v2-mail';
import update_v2_mail from './v2/mail/update-v2-mail';
import list_v2_mail from './v2/mail/list-v2-mail';
import bulk_create_v2_mail from './v2/mail/bulk-create-v2-mail';
import retrieve_thread_v2_mail from './v2/mail/retrieve-thread-v2-mail';
import thread_counts_v2_mail from './v2/mail/thread-counts-v2-mail';
import check_reply_v2_onboarding from './v2/onboarding/check-reply-v2-onboarding';
import demo_v2_onboarding from './v2/onboarding/demo-v2-onboarding';
import webhook_v2_onboarding from './v2/onboarding/webhook-v2-onboarding';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(create_v2_domains);
addEndpoint(retrieve_v2_domains);
addEndpoint(update_v2_domains);
addEndpoint(list_v2_domains);
addEndpoint(delete_v2_domains);
addEndpoint(list_dns_records_v2_domains);
addEndpoint(create_domains_v2_auth);
addEndpoint(update_domains_v2_auth);
addEndpoint(create_v2_email_addresses);
addEndpoint(retrieve_v2_email_addresses);
addEndpoint(update_v2_email_addresses);
addEndpoint(list_v2_email_addresses);
addEndpoint(delete_v2_email_addresses);
addEndpoint(create_v2_emails);
addEndpoint(retrieve_v2_emails);
addEndpoint(reply_v2_emails);
addEndpoint(create_emails_v2_schedule);
addEndpoint(retrieve_emails_v2_schedule);
addEndpoint(list_emails_v2_schedule);
addEndpoint(delete_emails_v2_schedule);
addEndpoint(create_v2_endpoints);
addEndpoint(retrieve_v2_endpoints);
addEndpoint(update_v2_endpoints);
addEndpoint(list_v2_endpoints);
addEndpoint(delete_v2_endpoints);
addEndpoint(test_v2_endpoints);
addEndpoint(create_v2_mail);
addEndpoint(retrieve_v2_mail);
addEndpoint(update_v2_mail);
addEndpoint(list_v2_mail);
addEndpoint(bulk_create_v2_mail);
addEndpoint(retrieve_thread_v2_mail);
addEndpoint(thread_counts_v2_mail);
addEndpoint(check_reply_v2_onboarding);
addEndpoint(demo_v2_onboarding);
addEndpoint(webhook_v2_onboarding);

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
