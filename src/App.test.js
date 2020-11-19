import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './core/redux/store';

import App from './App';

describe('e2e tests for the application', () => {
  it('Should add a new DID number', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Define new item to be added
    const newDidNumber = {
      value: '3333333333333',
      monthyPrice: '3.99',
      setupPrice: '0.99',
      currency: 'R$',
    };

    // Get value input and type value
    const valueInputNode = screen.getByLabelText('Value');
    expect(valueInputNode).toBeDefined();

    fireEvent.change(valueInputNode, { target: { value: newDidNumber.value } });
    expect(valueInputNode.value).toEqual('+33 33 33333-3333');

    // Get monthy price input and type monthy price
    const monthyPriceInputNode = screen.getByLabelText('Monthy Price');
    expect(monthyPriceInputNode).toBeDefined();

    fireEvent.change(monthyPriceInputNode, {
      target: { value: newDidNumber.monthyPrice },
    });
    expect(monthyPriceInputNode.value).toEqual(newDidNumber.monthyPrice);

    // Get setup price input and type monthy price
    const setupPriceInputNode = screen.getByLabelText('Setup Price');
    expect(setupPriceInputNode).toBeDefined();

    fireEvent.change(setupPriceInputNode, {
      target: { value: newDidNumber.setupPrice },
    });
    expect(setupPriceInputNode.value).toEqual(newDidNumber.setupPrice);

    // Get currency input and type currency
    const currencyInputNode = screen.getByLabelText('Currency');
    expect(currencyInputNode).toBeDefined();

    fireEvent.change(currencyInputNode, {
      target: { value: newDidNumber.currency },
    });
    expect(currencyInputNode.value).toEqual(newDidNumber.currency);

    // Get save button and click
    const buttonNode = screen.getByText('SAVE ITEM');
    expect(buttonNode).toBeDefined();

    fireEvent.click(buttonNode);

    // Waits for the successfull message
    await waitFor(
      () => {
        const toastNode = screen.getByText('Item successfully added.');
        expect(toastNode).toBeDefined();
      },
      {
        timeout: 2500,
      }
    );
  });

  it('Should update the currency property of the new DID item added', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Get the new item td by value
    const didTableValueNode = screen.getByText('+33 33 33333-3333');
    expect(didTableValueNode).toBeDefined();

    // Get edit icon link and click
    const didUpdateLinkNode = didTableValueNode.parentNode.querySelector(
      '.edit'
    );
    expect(didUpdateLinkNode).toBeDefined();

    fireEvent.click(didUpdateLinkNode);

    // Get the currency input, check if it's correct and type the new currency
    const currencyInputNode = screen.getByLabelText('Currency');
    expect(currencyInputNode).toBeDefined();
    expect(currencyInputNode.value).toEqual('R$');

    fireEvent.change(currencyInputNode, {
      target: { value: 'U$' },
    });
    expect(currencyInputNode.value).toEqual('U$');

    // Get the update button and click
    const buttonNode = screen.getByText('UPDATE ITEM');
    expect(buttonNode).toBeDefined();

    fireEvent.click(buttonNode);

    // Waits for the sucessfull message
    await waitFor(
      () => {
        const toastNode = screen.getByText('Item successfully updated.');
        expect(toastNode).toBeDefined();
      },
      {
        timeout: 2500,
      }
    );
  });

  it('Should remove the did item previously added', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Get new item by td value
    const didTableValueNode = screen.getByText('+33 33 33333-3333');
    expect(didTableValueNode).toBeDefined();

    // Get remove icon link and click
    const didRemoveLinkNode = didTableValueNode.parentNode.querySelector(
      '.delete'
    );
    expect(didRemoveLinkNode).toBeDefined();

    fireEvent.click(didRemoveLinkNode);

    // Waits for the successfull message
    await waitFor(
      () => {
        const toastNode = screen.getByText('item successfully removed.');
        expect(toastNode).toBeDefined();
      },
      {
        timeout: 2500,
      }
    );
  });
});
