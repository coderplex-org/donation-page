import React, { Children, FunctionComponent } from 'react';

import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';

interface Props {
  href: string;
  activeClassName: string;
  className?: string;
}

export const ActiveLink: FunctionComponent<Props> = ({ children, activeClassName, href, ...props }) => {
  const { pathname } = useRouter();
  const child = Children.only(children);

  if (!React.isValidElement<Props>(child)) {
    return null;
  }

  const className = pathname === href ? `${child.props.className} ${activeClassName}` : child.props.className;

  return (
    <Link href={href} {...props}>
      {React.cloneElement(child, { className })}
    </Link>
  );
};
