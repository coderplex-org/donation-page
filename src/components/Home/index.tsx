import React from 'react';

import { Button } from '../common/Button';
import { EmojiIcon } from '../Icons/common';

export const HomeContent = () => {
  return (
    <div className="py-4 pb-6 pb-20 md:pb-0 xs:max-w-xs sm:xs-auto sm:max-w-md sm:mx-auto">
      <p className="px-6 mb-4 md:mb-6 text-sm md:text-base font-medium leading-relaxed">
        <span className="text-base font-bold text-purple-700">Coderplex Foundation</span> is a registered non-profit
        organization that is working towards improving the state of tech in India.
      </p>
      <p className="px-6 mb-4 md:mb-6 md:pl-6 text-sm md:text-base font-medium leading-relaxed">
        We manage one of the{' '}
        <span className="text-purple-700">
          largest and most active developer community in India and organize free meetups and educational programs
        </span>{' '}
        on a spectrum of modern technologies. We also help our community members get hired by tech companies.
      </p>
      <p className="px-6 mb-4 md:mb-6 md:pl-6 text-sm md:text-base font-medium leading-relaxed">
        By making a donation to us, you will be directly{' '}
        <span className="text-purple-700">
          supporting our work and help countless people from India learn and build their career
        </span>{' '}
        in tech.
      </p>
      <div className="p-4 flex justify-center">
        <Button href="/donate">
          <EmojiIcon />
          <span className="inline-block ml-2">Make A Donation</span>
        </Button>
      </div>
    </div>
  );
};
