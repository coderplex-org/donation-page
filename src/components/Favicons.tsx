import React from 'react';
import { CLOUDINARY_BASE, LOGO_PUBLIC_ID } from '../constants';

export function Favicons() {
  const icons = getIcons();
  return (
    <>
      {icons.map(icon => (
        <link key={`icon-${icon.sizes}`} {...icon} />
      ))}
    </>
  );
}

export const getIconUrl = (size: number) => {
  return `${CLOUDINARY_BASE}/c_scale,w_${size}/${LOGO_PUBLIC_ID}`;
};

const getIcons = () => {
  const APPLE_ICON_SIZES = [180, 152, 144, 120, 114, 76, 72, 60, 57];
  const APPLE_ICONS = APPLE_ICON_SIZES.map(size => ({
    sizes: `${size}x${size}`,
    rel: 'apple-touch-icon',
    href: getIconUrl(size),
  }));

  const FAVICONS_SIZES = [96, 32, 16];
  const FAVICONS = FAVICONS_SIZES.map(size => ({
    rel: 'icon',
    type: 'image/png',
    sizes: `${size}x${size}`,
    href: getIconUrl(size),
  }));

  const ANDROID_SIZES = [192, 512];
  const ANDROID_ICONS = ANDROID_SIZES.map(size => ({
    rel: 'icon',
    type: 'image/png',
    sizes: `${size}x${size}`,
    href: getIconUrl(size),
  }));

  return [...APPLE_ICONS, ...FAVICONS, ...ANDROID_ICONS];
};
