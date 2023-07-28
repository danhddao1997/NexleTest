/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';

describe('Sign up flow', () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(<App />);
    });
  });

  test('Sign up component show', async () => {
    const screenByTestId = screen.queryByTestId('signUpScreen');
    expect(screenByTestId).not.toBeNull();
  });

  test('Check email legality', async () => {
    const emailTextInput = screen.getByTestId('form-email');
    const passwordTextInput = screen.getByTestId('form-password');
    const ageCheck = screen.getByTestId('form-age-checkbox');
    const button = screen.getByTestId('form-button');

    await waitFor(() => {
      fireEvent.changeText(emailTextInput, 'abc');
      fireEvent.changeText(passwordTextInput, 'abcd1234');
      fireEvent.press(ageCheck);
    });

    await waitFor(() => expect(button).toBeDisabled());

    await waitFor(() => {
      fireEvent.changeText(emailTextInput, 'abc@yopmail.com');
    });

    await waitFor(() => expect(button).toBeEnabled());
  });

  test('Check password strength', async () => {
    const passwordTextInput = screen.getByTestId('form-password');

    await waitFor(() => {
      fireEvent.changeText(passwordTextInput, 'abcd1');
    });

    await waitFor(() => expect(screen.getByText('Too short')).toBeTruthy());

    await waitFor(() => {
      fireEvent.changeText(passwordTextInput, 'abcdef');
    });

    await waitFor(() => expect(screen.getByText('Weak')).toBeTruthy());

    await waitFor(() => {
      fireEvent.changeText(passwordTextInput, '123456');
    });

    await waitFor(() => expect(screen.getByText('Fair')).toBeTruthy());

    await waitFor(() => {
      fireEvent.changeText(passwordTextInput, 'Aaaaaa');
    });

    await waitFor(() => expect(screen.getByText('Fair')).toBeTruthy());

    await waitFor(() => {
      fireEvent.changeText(passwordTextInput, '!!!!!!');
    });

    await waitFor(() => expect(screen.getByText('Fair')).toBeTruthy());

    await waitFor(() => {
      fireEvent.changeText(passwordTextInput, 'Aa1234');
    });

    await waitFor(() => expect(screen.getByText('Good')).toBeTruthy());

    await waitFor(() => {
      fireEvent.changeText(passwordTextInput, '1234!@');
    });

    await waitFor(() => expect(screen.getByText('Good')).toBeTruthy());

    await waitFor(() => {
      fireEvent.changeText(passwordTextInput, 'aa122!');
    });

    await waitFor(() => expect(screen.getByText('Good')).toBeTruthy());

    await waitFor(() => {
      fireEvent.changeText(passwordTextInput, 'Aa122!');
    });

    await waitFor(() => expect(screen.getByText('Strong')).toBeTruthy());
  });

  test('age check legality', async () => {
    const emailTextInput = screen.getByTestId('form-email');
    const passwordTextInput = screen.getByTestId('form-password');
    const ageCheck = screen.getByTestId('form-age-checkbox');
    const button = screen.getByTestId('form-button');

    await waitFor(() => {
      fireEvent.changeText(emailTextInput, 'abc@gmail.com');
      fireEvent.changeText(passwordTextInput, 'abcd1234');
      fireEvent.press(ageCheck);
    });

    await waitFor(() => expect(button).toBeEnabled());

    await waitFor(() => {
      fireEvent.press(ageCheck);
    });

    await waitFor(() => expect(button).toBeDisabled());
  });
});
