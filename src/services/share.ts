import React from 'react';

export const ShareContext = React.createContext({
  isOpen: false,
  openShareDialog: () => null,
  closeShareDialog: () => null,
});
