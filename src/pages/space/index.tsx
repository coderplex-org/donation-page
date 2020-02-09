import React from 'react';
import Link from 'next/link';
import { BackIcon } from '../../components/Icons/common';

import { SEO } from '../../components/SEO';
import { PaymentForm } from '../../components/common/PaymentForm';

export default function PaymentPage() {
  return (
    <>
      <SEO title="Pay to Coderplex Hackerspace" />
      <div className="pb-20 md:pb-0 md:max-w-3xl mx-auto">
        <header>
          <Link href="/">
            <a className="p-4 inline-block">
              <BackIcon />
            </a>
          </Link>
        </header>
        <PaymentForm isPayment={true} />
      </div>
    </>
  );
}
