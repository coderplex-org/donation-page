import React, { FunctionComponent } from 'react';
import clsx from 'clsx';

import { CODERPLEX_LOGO, DEFAULT_TITLE } from '../constants';

export function Header({ title = DEFAULT_TITLE }) {
  return (
    <header className="py-4 px-4 text-center border-b border-gray-200">
      <div className="max-w-5xl mx-auto w-full md:text-left md:flex items-center md:px-4">
        <div className="w-12 h-12 mx-auto md:mx-0">
          <img src={CODERPLEX_LOGO} alt="coderplex logo" className="w-full rounded-full" />
        </div>
        <div className="text-md font-semibold text-pink-500 text-center md:text-left md:ml-1">{title}</div>
      </div>
    </header>
  );
}

interface Props {
  className?: string;
}

export const Container: FunctionComponent<Props> = ({ className, ...props }) => (
  <main className={clsx(['pb-12 md:flex max-w-5xl mx-auto', className])} {...props} />
);

export const Section: FunctionComponent<Props> = ({ className, ...props }) => (
  <section className={clsx(['border-gray-200', className])} {...props} />
);
