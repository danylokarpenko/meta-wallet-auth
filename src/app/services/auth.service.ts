import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import crypto from 'crypto';

function generateNonce(walletAddress: string): string {
  return crypto
    .createHash('sha256')
    .update(walletAddress + Date.now())
    .digest('hex');
}

var mock = new MockAdapter(axios);

mock.onGet('/test.api/eth/nonce').reply((config) => {
  const walletAddress = config.params['walletAddress'];

  if (walletAddress) {
    const nonce = generateNonce(walletAddress);
    return [200, { nonce }];
  } else {
    return [400, { message: 'Invalid request' }];
  }
});

mock.onPost('/test.api/auth/metamask/sign-in').reply((config) => {
  const { walletAddress, signature, username } = JSON.parse(config.data);
  if (walletAddress && signature) {
    return [
      200,
      {
        message: `Mocked response: Authenticated ${walletAddress} with signature ${signature}`,
      },
    ];
  } else {
    return [400, { message: 'Invalid request' }];
  }
});

export const authService = {
  async getNonce(walletAddress: string) {
    const response = await axios
      .get('/test.api/eth/nonce', { params: { walletAddress } })
      .then(function (response) {
        return response.data.nonce;
      });
    return response;
  },

  async sendSignedMessage(body: {
    walletAddress: string;
    signature: string;
    username?: string;
  }) {
    const response = await axios.post('/test.api/auth/metamask/sign-in', body);
    return response;
  },
};
