import React, { useState } from 'react';
import clsx from 'clsx';

import PaymentForm from './PaymentForm';

function MobileFooter({ paymentFormProps }) {
  const [showPayModal, togglePayModal] = useState(false);
  return (
    <footer
      className={clsx(['fixed bottom-0 left-0 right-0 md:hidden'], {
        'top-0 bg-white': showPayModal,
        'bg-pink-600': !showPayModal,
      })}>
      <div
        className={clsx(['bg-white w-0 h-0'], {
          'w-full h-auto py-4 px-4': showPayModal,
        })}>
        {showPayModal && <PaymentForm {...paymentFormProps} onClose={() => togglePayModal(false)} />}
      </div>
      <button
        onClick={() => togglePayModal(true)}
        className={clsx(['w-full h-12 text-center font-semibold text-white'], {
          hidden: showPayModal,
        })}>
        ⚡ Proceed to {(paymentFormProps && paymentFormProps.actionName) || 'Donate'}
      </button>
    </footer>
  );
}

export default MobileFooter;
