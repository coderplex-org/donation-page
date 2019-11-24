import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

type InputProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  isLoading?: boolean;
  type?: string;
  href?: string;
  as?: string;
};

export const Button: FunctionComponent<InputProps> = ({
  className = 'bg-pink-600 text-white px-8 py-3 shadow-lg hover:bg-pink-700',
  href,
  as,
  children,
  isLoading,
  ...props
}) => {
  const classes = clsx('rounded text-lg flex items-center', className, isLoading && 'btn-loader');
  if (href) {
    if (href) {
      return (
        <Link href={href} as={as}>
          <a className={classes}>{children}</a>
        </Link>
      );
    }
  }
  return <button className={classes} {...props} children={children} />;
};
