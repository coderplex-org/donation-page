import React from 'react';
import Link from 'next/link';
import { H1, Paragraph } from './Typography';

export default function CampaignItem({ short_description, title, req_amount, slug, organizer }) {
  return (
    <div className="shadow-md text-left m-6">
      <span className="flex flex-row justify-between">
        <H1 className="mt-2">
          <Link href="/crowdfund/[slug]" as={`/crowdfund/${slug}`}>
            <a>{title}</a>
          </Link>
        </H1>
        <Paragraph className="text-right my-auto text-base text-gray-900">
          <span className="text-gray-500">Required funds: </span>₹ {req_amount}
        </Paragraph>
      </span>

      <Paragraph className="-py-1">{short_description}</Paragraph>
      <Paragraph className="-mt-1 text-pink-500">
        <span className="text-gray-500">Organised by: </span>
        {organizer}
      </Paragraph>
    </div>
  );
}
