import { useState } from 'react';
import isMobile from 'is-mobile';
import QRCode from 'qrcode.react';
import clsx from 'clsx';

import { getURL } from '../utils';

export default function Index() {
  const [showPayModal, togglePayModal] = useState(false);
  return (
    <>
      <header className="py-4 px-4 text-center border-b border-gray-200">
        <div className="max-w-5xl mx-auto w-full md:text-left md:flex items-center md:px-4">
          <div className="w-12 h-12 mx-auto md:mx-0">
            <img
              src="https://res.cloudinary.com/coderplex/image/upload/c_scale,w_45/v1510788480/website__assets/logo.png"
              alt="coderplex logo"
              className="w-full rounded-full"
            />
          </div>
          <div className="text-md font-semibold text-pink-500 text-center md:text-left md:ml-1">
            Coderplex Foundation
          </div>
        </div>
      </header>
      <main className="pb-12 md:flex md:min-h-screen max-w-5xl mx-auto">
        <Section className="py-4 md:w-1/2 md:flex-1">
          <H1>Donate to Coderplex</H1>
          <Paragraph>
            Coderplex Foundation is a registered non-profit organization that is working towards
            improving the state of tech in India.
          </Paragraph>
          <Paragraph>
            We manage one of the largest and most active developer community in India and organize
            free meetups and educational programs on a spectrum of modern technologies. We also help
            our community members get hired by tech companies.
          </Paragraph>
          <Paragraph>
            By making a donation to us, you will be directly supporting our work and help countless
            people from India learn and build their career in tech. You are free to choose whatever
            amount you would like to donate to us!
          </Paragraph>
          <Paragraph>We truly appreciate your generosity :D</Paragraph>
          <H2>Tax exemption details</H2>
          <Paragraph>
            We currently do not provide tax exemption certificate for the amount you donate. But we
            will be able to very soon!
          </Paragraph>
          <H2>Find us on the Internet</H2>
          <ul className="px-4 py-2">
            <li className="my-2 mt-1 text-sm">
              Website:{' '}
              <a className="text-blue-500 underline" href="https://coderplex.org/">
                https://coderplex.org/
              </a>
            </li>
            <li className="my-2 text-sm">
              Meetup group:{' '}
              <a className="text-blue-500 underline" href="https://meetup.com/coderplex">
                https://meetup.com/coderplex
              </a>
            </li>
            <li className="my-2 text-sm">
              Community Chatroom:{' '}
              <a className="text-blue-500 underline" href="https://chat.coderplex.org/">
                https://chat.coderplex.org/
              </a>
            </li>
          </ul>
          <H2>Contact Us:</H2>
          <ul className="px-4">
            <li className="my-2 text-sm">
              <a className="text-blue-500" href="mailto:support@coderplex.org">
                support@coderplex.org
              </a>
            </li>
            <li className="my-2 text-sm">
              <a className="text-blue-500" href="tel:+918125371202">
                +91-8125371202
              </a>
            </li>
          </ul>
        </Section>
        <Section className="md:flex-1 hidden md:block">
          <div className="shadow bg-white p-4 m-4 mt-6 rounded-lg">
            <PaymentForm />
          </div>
        </Section>
      </main>
      <footer
        className={clsx(['fixed bottom-0 left-0 right-0 md:hidden'], {
          'top-0 bg-white': showPayModal,
          'bg-pink-600': !showPayModal,
        })}
      >
        <div
          className={clsx(['bg-white w-0 h-0'], {
            'w-full h-auto py-4 px-4': showPayModal,
          })}
        >
          {showPayModal && <PaymentForm onClose={() => togglePayModal(false)} />}
        </div>
        <button
          onClick={() => togglePayModal(true)}
          className={clsx(['w-full h-12 text-center font-semibold text-white'], {
            hidden: showPayModal,
          })}
        >
          ⚡ Proceed to Pay
        </button>
      </footer>
    </>
  );
}

const H1 = ({ className, ...props }) => (
  <h1 className={clsx(['text-2xl text-pink-400 px-4 py-1', className])} {...props} />
);
const H2 = ({ className, ...props }) => (
  <h2 className={clsx(['text-xl text-pink-400 px-4 py-1 mt-3', className])} {...props} />
);
const Paragraph = ({ className, ...props }) => (
  <p className={clsx(['px-4 py-2 text-sm text-gray-700 leading-normal', className])} {...props} />
);
const Section = ({ className, ...props }) => (
  <section className={clsx(['border-gray-200', className])} {...props} />
);

function PaymentForm({ onClose = () => null }) {
  const [form, setFormValue] = useState({ amount: 0, email: '', phone: '' });
  const [url, setURL] = useState('');
  function onChange(e) {
    e.persist();
    setFormValue(form => ({ ...form, [e.target.name]: e.target.value }));
  }
  function onSubmit(e) {
    e.preventDefault();
    const { amount, email, phone } = form;
    const url = getURL({ amount, email });
    if (!isMobile()) {
      return setURL(`${window.origin}/api/pay?amount=${amount}&email=${email}`);
    }
    window.open(url);
    e.target.reset();
    onClose();
  }
  function onBack() {
    setURL(null);
  }
  if (url) {
    return (
      <>
        <h2 className="text-xl text-pink-400 mb-2 flex items-center">
          <button
            className="mr-4 w-10 h-10 flex justify-center items-center text-base"
            onClick={onBack}
          >
            ←
          </button>
          <span className="text-xs">Scan this QR code to pay using your UPI apps on mobile</span>
        </h2>
        <div className="px-4 py-4">
          <QRCode value={url} />
        </div>
      </>
    );
  }
  return (
    <>
      <h2 className="text-xl text-pink-400 mb-2 flex items-center">
        <button
          className="md:hidden mr-4 w-10 h-10 flex justify-center items-center"
          onClick={onClose}
        >
          ←
        </button>
        Payment Details
      </h2>
      <form name="payment" onSubmit={onSubmit}>
        <div className="mb-4 mt-4">
          <label htmlFor="amount" className="text-sm text-gray-500 mb-1 block">
            Amount <sup className="text-red-500">*</sup>
          </label>
          <div>
            <input
              className="bg-white focus:outline-0 border border-gray-300 rounded py-2 px-2 block w-full appearance-none leading-normal"
              type="number"
              name="amount"
              id="amount"
              value={form.amount}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-500 mb-1 block" htmlFor="email">
            Email <sup className="text-red-500">*</sup>
          </label>
          <div>
            <input
              className="bg-white focus:outline-0 border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal"
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="text-sm text-gray-500 mb-1 block" htmlFor="phone">
            Phone <sup className="text-red-500">*</sup>
          </label>
          <div>
            <input
              className="bg-white focus:outline-0 border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal"
              type="tel"
              name="phone"
              id="phone"
              value={form.phone}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="text-center font-semibold text-white text-sm bg-pink-600 shadow-lg px-4 py-2 rounded">
            ⚡ Pay ₹ {Number(form.amount).toFixed(2)}
          </button>
        </div>
      </form>
    </>
  );
}
