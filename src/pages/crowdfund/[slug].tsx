import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import snarkdown from 'md.js';

import { NextPageContext, NextComponentType } from 'next';
import { SEO } from '../../components/SEO';
import { PaymentForm } from '../../components/common/PaymentForm';
import { BackIcon } from '../../components/Icons/common';
import fetch from '../../lib/fetch';
import { APP_HOST } from '../../constants';
import { CampaignWithFundings } from '../../services/airtable';
import { redirect } from '../../utils';
import { CampaignProgress } from '../../components/CrowdFund/progress';
import { DonorsList } from '../../components/CrowdFund/donors';

interface Props {
  initialData?: CampaignWithFundings;
  slug: string;
}

type NextPage<P = {}> = NextComponentType<NextPageContext, Props, P & Props>;

const CampaignPage: NextPage = ({ initialData, slug }) => {
  const { data } = useSWR<CampaignWithFundings>(`/api/campaigns/${slug}`, fetch, { initialData });
  return (
    <>
      <SEO title={`${data.title} | Campaign | Coderplex Foundation`} description={data.meta_description} />
      <div className="pb-20 md:pb-0 md:max-w-5xl mx-auto">
        <header>
          <Link href="/crowdfund">
            <a className="p-4 inline-block">
              <BackIcon />
            </a>
          </Link>
        </header>
        <div className="p-4 pt-0 lg:flex">
          <div className="md:mx-2 md:mr-8 lg:flex-1">
            <h1 className="text-2xl mb-2 font-medium text-gray-800">{data.title}</h1>
            <div
              className="text-lg mb-4 text-gray-700 leading-relaxed markdown"
              dangerouslySetInnerHTML={{ __html: snarkdown(data.description) }}
            />
            <CampaignProgress campaign={data} />
            {data.is_active && (
              <div className="mt-6 md:mt-0">
                <PaymentForm campaign={data} inlineForm />
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-col overflow-y-hidden max-h-screen md:-mt-12 md:mx-2 md:w-1/3 md:bg-white md:p-4 md:shadow md:rounded-lg">
            <DonorsList campaign={data} />
          </div>
        </div>
      </div>
    </>
  );
};

CampaignPage.getInitialProps = async ctx => {
  const { slug } = ctx.query;
  try {
    if (!slug) {
      throw new Error(`Campaign not found`);
    }
    let url = `/api/campaigns/${slug}`;
    if (ctx.req) {
      url = `${APP_HOST}${url}`;
    }
    const data: CampaignWithFundings = await fetch(url);
    if (!data) {
      throw new Error(`Campaign not found`);
    }
    return { initialData: data, slug: String(slug) };
  } catch (error) {
    // redirect
    redirect(ctx, `/404`);
    return { slug: String(slug), initialData: undefined };
  }
};

export default CampaignPage;
