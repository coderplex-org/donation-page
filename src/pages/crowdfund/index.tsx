import Link from 'next/link';

import { SEO } from '../../components/SEO';
import { CrowdFundList } from '../../components/CrowdFund';

export default function Crowdfund() {
  return (
    <>
      <SEO title="Crowdfunding by Coderplex" />
      <CrowdFundList />
    </>
  );
}
