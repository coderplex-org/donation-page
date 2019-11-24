import React, { useState, ChangeEvent, FormEvent, FunctionComponent } from 'react';

import { getFinalAmount } from '../../utils';
import { Button } from './Button';
import IconCards from '../Icons/Cards';
import PaymentSuccess from '../Icons/Success';
import { CampaignWithFundings } from '../../services/airtable';
import { openRzp } from '../../services/rzp';
import Modal from '../Modal';
import clsx from 'clsx';

interface Props {
  campaign?: CampaignWithFundings;
  inlineForm?: boolean;
}

export const PaymentForm: FunctionComponent<Props> = ({ campaign, inlineForm = false }) => {
  const maxAmount = campaign ? campaign.required_amount : Number.MAX_SAFE_INTEGER;
  const amount = 100 > maxAmount ? maxAmount : 100;
  const initialState = { amount, email: '', phone: '', name: '' };
  const [form, setFormValue] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, toggleModal] = useState(false);
  const finalAmount = getFinalAmount(form.amount);
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    e.persist();
    const value = e.target.value;
    if (e.target.name === 'amount') {
      return setFormValue(form => ({
        ...form,
        [e.target.name]: Number(value) < Number(maxAmount) ? value : maxAmount,
      }));
    }
    setFormValue(form => ({ ...form, [e.target.name]: value }));
  }

  function validateForm(form: { name: string; email: string; phone: string; amount: number }) {
    if (!form.amount || !form.email || !form.phone || !form.name) {
      return alert(`Please enter all required fields`);
    }

    if (form.name.length < 3) {
      return `Please enter a valid name`;
    }
    if (
      !/^[a-z0-9+_-]+(?:\.[a-z0-9+_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(
        form.email
      )
    ) {
      return `Enter a valid email`;
    }

    if (!/^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/.test(form.phone)) {
      return `Enter a valid phone number`;
    }

    if (Number(form.amount) < 1) {
      return alert(`Amount should be greater than or equal to 1`);
    }

    if (!form.amount || Number(form.amount) > Number(maxAmount)) {
      return `Enter a valid amount i.e < ${maxAmount}`;
    }
    setIsSubmitting(true);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const error = validateForm(form);
      if (error) {
        return alert(error);
      }
      setIsSubmitting(true);
      await openRzp({
        ...form,
        amount: Number(finalAmount.toFixed(1)),
        campaign: campaign ? campaign.slug : undefined,
      });
      setIsSubmitting(false);
      setFormValue(initialState);
      toggleModal(true);
    } catch (error) {
      setIsSubmitting(false);
      alert(error.message || 'Failed! Try again.');
    }
  }

  return (
    <div className={clsx(!inlineForm && 'px-4', inlineForm && 'md:px-0')}>
      <p className="text-lg mb-4 text-gray-700 leading-relaxed">We truly appreciate your generosity</p>
      <form name="payment" onSubmit={onSubmit}>
        <div className="mb-4 mt-4">
          <label htmlFor="amount" className="text-sm text-gray-800 mb-1 block">
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
              autoFocus={!inlineForm}
              min="1"
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-800 mb-1 block" htmlFor="name">
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
        <div className="mb-4">
          <label className="text-sm text-gray-800 mb-1 block" htmlFor="email">
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
          <label className="text-sm text-gray-800 mb-1 block" htmlFor="phone">
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
        <div className="flex justify-center mb-3">
          <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
            <IconCards width={27} height={22} />
            <span className="ml-4 inline-block font-bold">Contribute ₹ {finalAmount.toFixed(2)}</span>
          </Button>
        </div>
        <p className="text-xs text-gray-600 text-center">
          <strong>** 2.36%</strong> is charged as processing fee!
        </p>
      </form>
      <Modal
        title="Your payment is successfull"
        isOpen={isModalOpen}
        onClose={() => {
          toggleModal(false);
        }}>
        <div className="w-full mb-4">
          <PaymentSuccess />
        </div>
        <p className="text-center py-1 font-semibold text-xl text-pink-600">
          Thanks for your {campaign ? 'contribution' : 'donation'}.
        </p>
        <p className="text-center text-sm text-gray-600">We truly appreciate your generosity :D</p>
      </Modal>
    </div>
  );
};
