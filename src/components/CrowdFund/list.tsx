import React, { useContext, FunctionComponent } from 'react';
import Link from 'next/link';
import useSWR from 'swr';

import { Button } from '../common/Button';
import { ShareIcon } from '../Icons/common';
import { CampaignProgress } from './progress';
import { Campaign } from '../../services/airtable';
import { CampaignEmptyState } from '../empty-states/campaign';
import fetch from '../../lib/fetch';
import { ShareContext } from '../../services/share';
import { truncateString } from '../../utils';
import clsx from 'clsx';

interface Props {
  inline?: boolean;
}

export const CampaignList: FunctionComponent<Props> = ({ inline = false }) => {
  const { isOpen, openShareDialog } = useContext(ShareContext);
  const { data, error } = useSWR<Campaign[]>('/api/campaigns', fetch);

  if (error) {
    return (
      <div className="mx-0 my-4 md:mx-4 md:h-64">
        <h3 className="text-lg md:text-xl mb-1 text-red-700">{error.message || 'An error occured. Try again later'}</h3>
      </div>
    );
  }

  if (!data) {
    return <CampaignEmptyState />;
  }

  if (data.length === 0) {
    return (
      <div className="mx-0 my-4 md:mx-4 md:h-64">
        <h3 className="text-lg md:text-xl mb-1 text-gray-700">Sorry, no active campaigns found!</h3>
      </div>
    );
  }

  return (
    <ul className="w-full md:flex md:flex-wrap">
      {data.map(item => {
        return (
          <li key={item.id} className={clsx('mx-0 my-4 md:mx-4', inline && 'inline')}>
            <Link href="/crowdfund/[slug]" as={`/crowdfund/${item.slug}`}>
              <a className="block p-4 px-6 bg-white shadow-lg rounded-lg list-item">
                <h3 className="text-xl mb-1 font-medium text-gray-800">
                  <span className="hidden md:block">{truncateString(item.title, 30)}</span>
                  <span className="md:hidden">{item.title}</span>
                </h3>
                <p className="text-sm mb-4 text-gray-700 md:h-8">
                  <span className="hidden md:block">{truncateString(item.short_description, 91)}</span>
                  <span className="md:hidden">{item.short_description}</span>
                </p>
                <CampaignProgress campaign={item} />
                <div className="flex justify-between items-center">
                  <button
                    disabled={isOpen}
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      openShareDialog(e);
                    }}
                    className="p-4 text-center">
                    <ShareIcon />
                  </button>
                  <Button>Contribute</Button>
                </div>
              </a>
            </Link>
            <style jsx>{`
              li {
                width: calc(50% - 32px);
              }
              @media (max-width: 1224px) {
                li.inline {
                  width: 80%;
                }
              }
              @media (max-width: 1000px) {
                li.inline {
                  width: 100%;
                }
              }
              @media (max-width: 900px) {
                li {
                  width: 100%;
                }
              }
            `}</style>
          </li>
        );
      })}
    </ul>
  );
};
