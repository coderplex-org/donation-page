import React, { MouseEvent } from 'react';

export const ShareContext = React.createContext({
  isOpen: false,
  openShareDialog: (e: MouseEvent<HTMLButtonElement>) => null,
  closeShareDialog: (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => null,
});
