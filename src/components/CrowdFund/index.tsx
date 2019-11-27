import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { TerminalIcon, BackIcon } from '../Icons/common';
import { CampaignList } from './list';

interface Props {
  hideHeader?: boolean;
  inline?: boolean;
}

export const CrowdFundList: FunctionComponent<Props> = ({ hideHeader = false, inline = false }) => {
  return (
    <div className={clsx('pb-20 md:pb-0 w-full', hideHeader && 'pt-6', !inline && 'md:max-w-5xl mx-auto')}>
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
        <CampaignList inline={inline} />
      </div>
    </div>
  );
};
