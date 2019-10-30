import React from 'react';

import { H1, H2, Paragraph } from '../components/Typography';
import { Loading, ErrorComponent } from './common';

export default function(props) {
  const { campaign, error, loading, raised } = props;
  const { description, req_amount, title, organizer } = campaign;
  return (
    <div className="flex flex-col shadow bg-white m-2 pb-4 rounded-lg">
      {loading ? (
        <div className="text-center w-100 my-8 mx-auto">
          <Loading />
        </div>
      ) : error ? (
        <div className="text-center w-100 my-8 mx-auto">
          <ErrorComponent />
        </div>
      ) : (
        <>
          <H1 className="mt-4">{title}</H1>
          {req_amount && (
            <div className="flex flex-col">
              <H2>Fundings raised: </H2>
              <div className="w-100 border rounded border-pink-700 my-2 mx-4 pt-1 pb-1 h-6">
                <div
                  style={{ width: `${(100 * raised) / req_amount}%` }}
                  className="mx-1 bg-pink-400 h-4 p-0 border rounded"></div>
              </div>
              <div className="w-100 text-right text-base mr-4">
                <span className="text-gray-600">₹ {raised}/</span>
                <span className="text-pink-500">{req_amount}</span>
              </div>
            </div>
          )}
          {description && <H2 className="text-sm">Details: </H2>}
          <Paragraph>{description}</Paragraph>
          <Paragraph className="-mt-1 text-pink-500">
            {organizer && <span className="text-gray-500">Organised by: </span>}
            {organizer}
          </Paragraph>
        </>
      )}
    </div>
  );
}
