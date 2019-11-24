import React, { FunctionComponent } from 'react';
import { Campaign, CampaignWithFundings } from '../../services/airtable';

interface Props {
  campaign: Campaign | CampaignWithFundings;
}

export const CampaignProgress: FunctionComponent<Props> = ({ campaign }) => {
  const amountRaised = Number(campaign.amount_raised);
  const requiredAmount = Number(campaign.required_amount);
  const percentage = (amountRaised / requiredAmount) * 100;
  return (
    <div className="mb-4">
      <div className="w-full relative rounded-full bg-gray-300 h-4 mb-1">
        <div
          className="absolute overflow-hidden left-0 top-0 rounded-full bg-pink-500 h-4"
          style={{ width: `${percentage !== 0 && percentage <= 4 ? 4 : percentage.toFixed(1)}%` }}></div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm text-gray-700">{campaign.donations_count} Donation/s</div>
        <div className="text-sm text-gray-700">
          ₹ {amountRaised} / ₹ {requiredAmount}
        </div>
      </div>
    </div>
  );
};
