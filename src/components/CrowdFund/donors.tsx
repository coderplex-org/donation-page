import React, { FunctionComponent } from 'react';
import fromnow from 'fromnow';

import { AwardIcon } from '../Icons/common';
import { CampaignWithFundings } from '../../services/airtable';
import { truncateString } from '../../utils';

interface Props {
  campaign: CampaignWithFundings;
}

export const DonorsList: FunctionComponent<Props> = ({ campaign }) => {
  const { fundings } = campaign;
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
  return (
    <ul className="w-full overflow-y-scroll" style={{ height: 500 }}>
      {fundings.map(item => (
        <li key={item.id} className="flex items-center bg-white shadow my-4 py-2 rounded-lg">
          <div className="px-4">
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
            <span className="inline-block bg-green-600 text-xs rounded-full px-3 py-1 text-white">
              ₹ {item.donated_amount}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};
