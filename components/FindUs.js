import React from 'react';

import { H2 } from './Typography';
import { BASE_URL, MEETUP_URL, CHAT_URL } from '../constants';

function FindUs() {
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

export default FindUs;
