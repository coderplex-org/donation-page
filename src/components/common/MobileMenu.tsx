import React, { useContext } from 'react';

import { ActiveLink } from './ActiveLink';
import { AboutIcon, CrowdFundIcon, HelpIcon, ShareIcon } from '../Icons/common';
import { ShareContext } from '../../services/share';

export const MobileMenu = () => {
  const { openShareDialog, isOpen } = useContext(ShareContext);
  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-gray-100 shadow-xl z-10 md:hidden">
      <div className="shadow-xl flex items-center w-full h-16 text-gray-600">
        <ActiveLink activeClassName="text-pink-700" href="/">
          <a className="px-6 text-center flex flex-col items-center flex-1">
            <AboutIcon />
            <span className="text-sm mt-1">About</span>
          </a>
        </ActiveLink>
        <ActiveLink activeClassName="text-pink-700" href="/crowdfund">
          <a className="px-6 text-center flex flex-col items-center flex-1">
            <CrowdFundIcon />
            <span className="text-sm mt-1">CrowdFund</span>
          </a>
        </ActiveLink>
        <ActiveLink activeClassName="text-pink-700" href="/help">
          <a className="px-6 text-center flex flex-col items-center flex-1">
            <HelpIcon />
            <span className="text-sm mt-1">Help</span>
          </a>
        </ActiveLink>
        <button
          onClick={openShareDialog}
          disabled={isOpen}
          className="px-6 text-center flex flex-col items-center flex-1">
          <ShareIcon />
          <span className="text-sm mt-1">Share</span>
        </button>
      </div>
    </div>
  );
};
