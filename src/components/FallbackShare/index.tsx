import React, { useContext, useEffect, useState } from 'react';
import { toClipboard } from 'copee';

import { ShareContext } from '../../services/share';
import { WhatsappIcon, FacebookIcon, MessangerIcon, TwitterIcon, CopyIcon } from '../Icons/Share';
import { DEFAULT_TITLE, APP_HOST } from '../../constants';
import { useRouter } from 'next/router';

export function FallbackShare() {
  const { closeShareDialog, isOpen } = useContext(ShareContext);
  const [{ title, url }, setShareInfo] = useState({ title: DEFAULT_TITLE, url: APP_HOST });
  const route = useRouter();
  useEffect(() => {
    const title = document.title;
    const url = window.location.href;
    setShareInfo({ title, url });
  }, [route.pathname]);

  const whatsappText = `${title}\n\n${url}`;
  function copy() {
    const success = toClipboard(url);
    if (success) {
      alert(`Successfully copied link to your clipboard`);
    } else {
      alert(`Failed to copied link to your clipboard`);
    }
  }
  return (
    <div className="container" role="button" onClick={closeShareDialog}>
      <div className="popup shadow-2xl bg-white border border-gray-200">
        <h3>Share via</h3>
        <ul>
          <li>
            <a href={`whatsapp://send?text=${encodeURIComponent(whatsappText)}`}>
              <WhatsappIcon style={{ width: 50, height: 50 }} />
              <div className="icon-name">WhatsApp</div>
            </a>
          </li>
          <li>
            <a
              href={`http://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}&p[title]=${encodeURIComponent(
                title
              )}`}>
              <FacebookIcon style={{ width: 40, height: 40 }} />
              <div style={{ position: 'relative', top: 5 }} className="icon-name">
                Facebook
              </div>
            </a>
          </li>
          <li>
            <a href={`fb-messenger://share/?link=${encodeURIComponent(url)}`}>
              <MessangerIcon style={{ width: 45, height: 45 }} />
              <div style={{ position: 'relative', top: 2 }} className="icon-name">
                Messanger
              </div>
            </a>
          </li>
          <li>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(
                url
              )}`}>
              <TwitterIcon style={{ width: 40, height: 40 }} />
              <div style={{ position: 'relative', top: 0 }} className="icon-name">
                Twitter
              </div>
            </a>
          </li>
          <li>
            <button type="button" onClick={copy} className="social-link btn">
              <CopyIcon style={{ width: 36, height: 36 }} />
              <div className="icon-name">Copy to clipboard</div>
            </button>
          </li>
        </ul>
      </div>
      <style jsx>
        {`
          .container {
            width: 100%;
            min-height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: ${isOpen ? 1000 : -1};
          }
          .popup {
            max-width: 380px;
            min-height: 240px;
            bottom: 20px;
            position: absolute;
            z-index: 2;
            padding: 12px 4px;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.6, 1);
            transform: ${isOpen ? `translateY(0)` : `translateY(200%)`};
            opacity: ${isOpen ? 1 : 0};
            margin: 4px;
            left: 10px;
            right: 10px;
            border-radius: 16px;
            z-index: ${isOpen ? 'auto' : -1};
          }
          h3 {
            text-align: center;
          }
          ul {
            display: flex;
            flex-wrap: wrap;
            padding: 0;
            margin: 0;
            list-style: none;
            align-items: center;
          }
          ul li {
            margin: 24px;
          }
          ul li :global(.social-link) {
            display: block;
          }
          ul li :global(.social-link.btn) {
            -webkit-tap-highlight-color: transparent;
            appearence: none;
            outline: none;
            border: none;
            background: transparent;
          }
          .icon-name {
            width: 40px;
            font-size: 10px;
            display: flex;
            align-items: center;
            text-align: center;
            justify-content: center;
            margin: 0 auto;
            color: #888;
          }
          @media (min-height: 720px) {
            .popup {
              left: 50%;
              right: auto;
              bottom: 50%;
            }
          }
        `}
      </style>
    </div>
  );
}
