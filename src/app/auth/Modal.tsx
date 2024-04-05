'use client';

import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';

import Modal from 'react-modal';
import Web3 from 'web3';
import { toast } from 'sonner';

import { Button } from '../components/ui/buttons/Button';
import { Field } from '../components/ui/fields/Field';
import { MetamaskButton } from '../components/ui/buttons/MetamaskBtn';
import { authService } from '@/app/services/auth.service';

interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#2D2D2D',
    color: '#FFFFFF',
    border: '1px solid #555',
    borderRadius: '8px',
    padding: '0px',
  },

  overlay: {
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
};

type ActiveTab = 'LOGIN' | 'SIGNUP';

export default function ModalComponent({
  isOpen,
  onRequestClose,
}: ModalComponentProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>('LOGIN');
  const [username, setUsername] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);

  async function promptToSignLoginMessage(
    walletAddress: string,
    nonce: string,
  ): Promise<string> {
    const isLogin = activeTab === 'LOGIN';
    try {
      const message = `${isLogin ? 'Sign-in' : 'Sign-up'} to TEST_APP ${nonce}`;
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, walletAddress],
      });
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  }

  async function handleMetaMaskSign() {
    if (username.length < 3 && activeTab === 'SIGNUP') {
      toast.error('Username must be at least 3 characters');
      return;
    }
    const isSignUp = activeTab === 'SIGNUP';
    setIsRequesting(true);
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        const [walletAddress] = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        const nonce = await authService.getNonce(walletAddress);
        const signature = await promptToSignLoginMessage(walletAddress, nonce);

        await authService.sendSignedMessage({
          walletAddress,
          signature,
          ...(isSignUp && { username }),
        });

        toast.success(`MetaMask ${isSignUp ? 'Sign-Up' : 'Login'} successful`);
        router.push('/home');
      } else {
        toast.info('Please install MetaMask');
      }
    } catch (error) {
      console.error('MetaMask login failed:', error);
    } finally {
      setIsRequesting(false);
    }
  }

  return (
    <Modal
      ariaHideApp={false}
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8 dark:bg-gray-800">
        <div className="flex content-center justify-center w-full h-full">
          <Button
            isTab
            active={activeTab === 'LOGIN'}
            onClick={() => setActiveTab('LOGIN')}
          >
            LOGIN
          </Button>
          <Button
            isTab
            active={activeTab === 'SIGNUP'}
            onClick={() => setActiveTab('SIGNUP')}
          >
            SIGNUP
          </Button>
        </div>
        {activeTab === 'LOGIN' ? (
          <div className="mb-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-5 mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100 dark:text-gray-200">
              Login to your account
            </h2>
            <form className="space-y-6" action="#" method="POST">
              <MetamaskButton
                type="submit"
                onClick={handleMetaMaskSign}
                disabled={isRequesting}
              />
            </form>
          </div>
        ) : (
          <div className="mt-5 mb-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mb-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100 dark:text-gray-200">
              Create an account
            </h2>
            <form className="space-y-6" action="#" method="POST">
              <Field
                id="username"
                label="Username"
                name="username"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <MetamaskButton
                type="submit"
                onClick={handleMetaMaskSign}
                disabled={isRequesting}
              />
            </form>
          </div>
        )}
      </div>
    </Modal>
  );
}
