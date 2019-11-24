import React, { FunctionComponent } from 'react';
import clsx from 'clsx';

import { CODERPLEX_LOGO } from '../constants';

export function Header() {
  return (
    <header className="py-4 px-4">
      <div className="max-w-5xl w-full md:text-left md:flex items-center md:px-4 flex justify-center">
        <div className="w-40 h-40 mx-auto md:mx-0">
          <img src={CODERPLEX_LOGO} alt="coderplex logo" className="w-full rounded-full" />
        </div>
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
