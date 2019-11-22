import React, { useState } from 'react';
import isMobile from 'is-mobile';
import QRCode from 'qrcode.react';
import clsx from 'clsx';

import PaymentSuccess from './Icons/Success';
import IconCards from './Icons/Cards';
import IconBack from './Icons/Back';
import IconUPI from './Icons/UPI';
import Loader from './Loader';
import Modal from './Modal';
import { getURL, getFinalAmount } from '../utils';
import { openRzp } from '../services/rzp';
import { saveUPIStatus } from '../services/upi';

function PaymentForm({
  onClose = () => null,
  onSuccess = () => null,
  collectName = false,
  maxAmount = Number.MAX_SAFE_INTEGER,
  actionName = 'Donate',
}) {
  const amount = 100 > maxAmount ? maxAmount : 100;
  const initialState = { amount, email: '', phone: '', name: '' };
  const [form, setFormValue] = useState(initialState);
  const [url, setURL] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, toggleModal] = useState(false);
  const finalAmount = getFinalAmount(form.amount);
  function onChange(e) {
    e.persist();
    let value = e.target.value;
    if (e.target.name === 'amount') {
      value = value < maxAmount ? value : maxAmount;
    }
    setFormValue(form => ({ ...form, [e.target.name]: value }));
  }
  function onSubmit(e) {
    e.preventDefault();
    const { amount, email, phone } = form;
    saveUPIStatus(form);
    const url = getURL({ amount, email });
    if (!isMobile()) {
      return setURL(`${window.origin}/api/upi?amount=${amount}&email=${email}`);
    }
    window.open(url);
    e.target.reset();
    onClose();
  }
  function onBack() {
    setURL(null);
  }
  async function onRzpSubmit() {
    try {
      const { amount, email, phone, name } = form;
      if (!amount || !email || !phone || (!name && collectName)) {
        return alert(`Please enter all required fields`);
      }
      if (Number(amount) < 1) {
        return alert(`Amount should be greater than or equal to 1`);
      }
      setIsSubmitting(true);
      await openRzp({
        ...form,
        amount: finalAmount,
      });
      onSuccess({ ...form, amount: finalAmount });
      setIsSubmitting(false);
      setFormValue(initialState);

      toggleModal(true);
    } catch (error) {
      alert(error.message || `Some error occured try again!`);
      setIsSubmitting(false);
    }
  }
  if (url) {
    return (
      <>
        <h2 className="text-xl text-pink-400 mb-2 flex items-center">
          <button className="mr-2 w-8 h-8 flex justify-center items-center" onClick={onBack}>
            <IconBack />
          </button>
          <span className="text-sm">Scan this QR Code to open your UPI Payment App</span>
        </h2>
        <div className="px-4 py-4 flex justify-center items-center">
          <QRCode value={url} />
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="text-xl text-pink-400 mb-2 flex items-center">
        <button className="md:hidden mr-1 w-10 h-10 flex items-center" onClick={onClose}>
          <IconBack />
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
              required
              autoFocus
              min="1"
              disabled={isSubmitting}
            />
          </div>
        </div>
        {collectName && (
          <div className="mb-4">
            <label className="text-sm text-gray-500 mb-1 block" htmlFor="name">
              Name <sup className="text-red-500">*</sup>
            </label>
            <div>
              <input
                className="bg-white focus:outline-0 border border-gray-300 rounded py-2 px-2 block w-full appearance-none leading-normal"
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={onChange}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>
        )}
        <div className="mb-4">
          <label className="text-sm text-gray-500 mb-1 block" htmlFor="email">
            Email <sup className="text-red-500">*</sup>
          </label>
          <div>
            <input
              className="bg-white focus:outline-0 border border-gray-300 rounded py-2 px-2 block w-full appearance-none leading-normal"
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={onChange}
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="text-sm text-gray-500 mb-1 block" htmlFor="phone">
            Phone <sup className="text-red-500">*</sup>
          </label>
          <div>
            <input
              className="bg-white focus:outline-0 border border-gray-300 rounded py-2 px-2 block w-full appearance-none leading-normal"
              type="tel"
              name="phone"
              id="phone"
              value={form.phone}
              onChange={onChange}
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <button
            disabled={isSubmitting}
            className={clsx([
              'text-center w-full font-semibold text-white text-md bg-pink-600 shadow-lg px-4 py-3 mb-4 rounded hover:bg-pink-700 flex justify-center items-center',
              {
                'opacity-50 cursor-not-allowed': isSubmitting,
              },
            ])}>
            <IconUPI width={21} height={24} />
            <span className="ml-4">
              {actionName} ₹ {form.amount} using
            </span>{' '}
            <strong className="ml-1">UPI</strong>
          </button>
          <button
            type="button"
            onClick={onRzpSubmit}
            className={clsx([
              'text-center w-full font-semibold text-white md:text-md text-xs bg-gray-600 shadow-lg px-4 py-3 mb-2 rounded hover:bg-gray-700 flex justify-center items-center',
              {
                'opacity-50 cursor-not-allowed': isSubmitting,
              },
            ])}>
            {isSubmitting ? (
              <Loader />
            ) : (
              <>
                <IconCards width={27} height={22} />
                <span className="md:ml-4 ml-2">
                  {actionName} ₹ {finalAmount} using
                </span>
                <strong className="ml-1">Debit/Credit cards</strong>
              </>
            )}
          </button>
        </div>
        <p className="m-2 text-xs text-gray-600 text-center">
          <strong>** 2.36%</strong> is charged as processing fee for Debit/Credit Cards
        </p>
      </form>
      <Modal
        title="Your payment is successfull"
        isOpen={isModalOpen}
        onClose={() => {
          toggleModal(false);
          onClose();
        }}>
        <div className="w-full mb-4">
          <PaymentSuccess />
        </div>
        <p className="text-center py-1 font-semibold text-xl text-pink-600">
          Thanks for your {actionName === 'Donate' ? 'donation' : 'contribution'}.
        </p>
        <p className="text-center text-sm text-gray-600">We truly appreciate your generosity :D</p>
      </Modal>
    </>
  );
}

export default PaymentForm;
