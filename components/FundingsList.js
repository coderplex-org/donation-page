import React from 'react';
import { Paragraph } from './Typography';

const Funding = ({ name, amount }) => (
  <Paragraph className="border-b border-t border-solid border-gray-300">
    <span className="text-base text-pink-500">{name} </span>
    <span className="text-gray-500">raised </span>
    <span className="text-gray-900">₹ {amount}</span>
  </Paragraph>
);

export default function({ fundings }) {
  return (
    <div className="flex flex-col">
      <Paragraph className="mx-0 px-0">A special thanks to all who raised the funds for this campaign.</Paragraph>
      <div className="h-64 relative">
        <div className="max-h-full overflow-auto">
          {fundings.length !== 0 ? (
            fundings.map(({ name, amount }, index) => <Funding key={index} name={name} amount={amount} />)
          ) : (
            <Paragraph>No funds raised so far. Be the first one to raise. :D</Paragraph>
          )}
        </div>
      </div>
    </div>
  );
}
