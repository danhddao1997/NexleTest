/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

import {render, waitFor} from '@testing-library/react-native';

test('render app', async () => {
  await waitFor(() => {
    render(<App />);
  });
});
