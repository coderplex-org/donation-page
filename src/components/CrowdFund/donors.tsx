import React, { FunctionComponent, useState } from 'react';
import fromnow from 'fromnow';

import { AwardIcon } from '../Icons/common';
import { CampaignWithFundings, Funding } from '../../services/airtable';
import { truncateString } from '../../utils';

interface Props {
  campaign: CampaignWithFundings;
}

export const DonorsList: FunctionComponent<Props> = ({ campaign }) => {
  const { fundings } = campaign;
  const [showRecent, setShowRecent] = useState(true);
  const sortedFundings = () =>
    showRecent
      ? fundings.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
      : fundings.sort((a, b) => b.donated_amount - a.donated_amount);

  if (fundings.length === 0) {
    return (
      <div className="bg-white shadow my-4 py-2 rounded-lg px-4">
        <h3 className="text-sm mb-1 text-gray-700">
          No contributions yet. <br />
          <strong>You can be the first to contribute 🎉</strong>
        </h3>
      </div>
    );
  }
  const tabCommonClass = 'bg-white inline-block py-2 px-4 hover:text-pink-800 font-semibold';
  const tabClass = `${tabCommonClass} text-pink-500`;
  const tabActiveClass = `${tabCommonClass} text-pink-700 border-b border-pink-500`;
  return (
    <>
      <h2 className="text-xl mb-1 font-medium text-gray-800">Contributions</h2>
      <p className="text-sm text-gray-700">A special thanks to all who raised the funds for this campaign.</p>
      <ul className="flex border-b mt-2 justify-center">
        <li className="-mb-px mr-1 cursor-pointer whitespace-no-wrap" onClick={() => setShowRecent(true)}>
          <a className={showRecent ? tabActiveClass : tabClass}>Most Recent</a>
        </li>
        <li className="mr-1 cursor-pointer whitespace-no-wrap" onClick={() => setShowRecent(false)}>
          <a className={showRecent ? tabClass : tabActiveClass}>Top Contributions</a>
        </li>
      </ul>
      <ul className="w-full overflow-y-scroll" style={{ height: 500 }}>
        {sortedFundings().map(item => (
          <li key={item.id} className="flex items-center bg-white shadow my-4 py-2 rounded-lg">
            <div className="px-4 text-center">
              <AwardIcon />
            </div>
            <div className="flex-1">
              <h6 className="font-medium text-gray-800" title={item.name}>
                {truncateString(item.name, 15)}
              </h6>
              <p className="text-xs text-gray-600">{fromnow(new Date(item.created_at), { max: 2, suffix: true })}</p>
              <p className="text-xs text-gray-600">{item.message}</p>
            </div>
            <div className="px-4">
              <span className="inline-block bg-pink-600 text-xs rounded-full px-3 py-1 text-white">
                ₹ {item.donated_amount}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
