'use client';

import { useState } from 'react';
import ModalComponent from './Modal';
import { Button } from '../components/ui/buttons/Button';

export function Auth() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);

  return (
    <div className="flex align-middle justify-center w-full">
      <Button onClick={openModal}>Login/Register</Button>
      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </div>
  );
}
