import React from 'react';

import { HelpIcon, ChatIcon, InboxIcon, PhoneIcon, FacebookIcon, TwitterIcon } from '../Icons/common';
import { EMAIL, PHONE, CHAT_URL, FACEBOOK, TWITTER } from '../../constants';

export const HelpInfo = () => {
  return (
    <div className="w-full pt-6 p-4 pb-20 md:pb-0">
      <h1 className="text-gray-700 text-2xl md:text-4xl mb-6 text-gray-900 flex items-center">
        <HelpIcon />
        <span className="inline-block ml-2">Help</span>
      </h1>
      <p className="mb-6 text-lg font-medium text-gray-800">
        If you have a question or a comment, please use below channels to contact us.
      </p>
      <ul>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 font-bold text-base mb-6 flex items-center"
            href={CHAT_URL}>
            <ChatIcon />
            <span className="inline-block ml-2">Community Chatroom</span>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 font-bold text-base mb-6 flex items-center"
            href={`mailto:${EMAIL}`}>
            <InboxIcon />
            <span className="inline-block ml-2">{EMAIL}</span>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 font-bold text-base mb-6 flex items-center"
            href={`tel:${PHONE}`}>
            <PhoneIcon />
            <span className="inline-block ml-2">{PHONE}</span>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 font-bold text-base mb-6 flex items-center"
            href={FACEBOOK}>
            <FacebookIcon />
            <span className="inline-block ml-2">Facebook</span>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 font-bold text-base mb-6 flex items-center"
            href={TWITTER}>
            <TwitterIcon />
            <span className="inline-block ml-2">Twitter</span>
          </a>
        </li>
      </ul>
    </div>
  );
};
