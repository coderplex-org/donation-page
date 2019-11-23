import React from 'react';

import { H2 } from './Typography';
import { EMAIL, PHONE } from '../constants';

export function ContactUs() {
  return (
    <>
      <H2>Contact Us:</H2>
      <ul className="px-4">
        <li className="my-2 text-sm">
          <a className="text-blue-500" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </li>
        <li className="my-2 text-sm">
          <a className="text-blue-500" href={`tel:${PHONE}`}>
            {PHONE}
          </a>
        </li>
      </ul>
    </>
  );
}
