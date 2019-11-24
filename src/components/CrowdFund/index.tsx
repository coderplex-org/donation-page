import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { TerminalIcon, BackIcon } from '../Icons/common';
import { CampaignList } from './list';

interface Props {
  hideHeader?: boolean;
}

export const CrowdFundList: FunctionComponent<Props> = ({ hideHeader = false }) => {
  return (
    <div className={clsx('pb-20 md:pb-0 md:max-w-5xl mx-auto', hideHeader && 'pt-6')}>
      <header className={clsx(hideHeader && 'hidden')}>
        <Link href="/">
          <a className="p-4 inline-block">
            <BackIcon />
          </a>
        </Link>
      </header>
      <div className="px-4">
        <h1 className="text-gray-700 text-2xl md:text-4xl mb-4 text-gray-900 flex items-center">
          <TerminalIcon />
          <span className="inline-block ml-2">Crowdfunding Campaigns</span>
        </h1>
        <CampaignList />
      </div>
    </div>
  );
};
