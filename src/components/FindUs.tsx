import React from 'react';
import { BASE_URL, CHAT_URL, CROWDFUND_URL, MEETUP_URL } from '../constants';
import { H2 } from './Typography';

export function FindUs() {
  return (
    <>
      <H2>Find us on the Internet</H2>
      <ul className="px-4 py-2">
        <li className="my-2 mt-1 text-sm">
          Website:{' '}
          <a className="text-blue-500 underline" href={BASE_URL}>
            {BASE_URL}
          </a>
        </li>
        <li className="my-2 text-sm">
          Crowdfunding:{' '}
          <a className="text-blue-500 underline" href={CROWDFUND_URL}>
            {CROWDFUND_URL}
          </a>
        </li>
        <li className="my-2 text-sm">
          Meetup group:{' '}
          <a className="text-blue-500 underline" href={MEETUP_URL}>
            {MEETUP_URL}
          </a>
        </li>
        <li className="my-2 text-sm">
          Community Chatroom:{' '}
          <a className="text-blue-500 underline" href={CHAT_URL}>
            {CHAT_URL}
          </a>
        </li>
      </ul>
    </>
  );
}
