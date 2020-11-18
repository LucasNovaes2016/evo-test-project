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

    const newDidNumber = {
      value: '1111111111111',
      monthyPrice: '1.99',
      setupPrice: '0.99',
      currency: 'R$',
    };

    // Type value
    const valueInputNode = screen.getByLabelText('Value');
    expect(valueInputNode).toBeDefined();

    fireEvent.change(valueInputNode, { target: { value: newDidNumber.value } });
    expect(valueInputNode.value).toEqual('+11 11 11111-1111');

    // Type monthy price
    const monthyPriceInputNode = screen.getByLabelText('Monthy Price');
    expect(monthyPriceInputNode).toBeDefined();

    fireEvent.change(monthyPriceInputNode, {
      target: { value: newDidNumber.monthyPrice },
    });
    expect(monthyPriceInputNode.value).toEqual(newDidNumber.monthyPrice);

    // Type setup Price
    const setupPriceInputNode = screen.getByLabelText('Setup Price');
    expect(setupPriceInputNode).toBeDefined();

    fireEvent.change(setupPriceInputNode, {
      target: { value: newDidNumber.setupPrice },
    });
    expect(setupPriceInputNode.value).toEqual(newDidNumber.setupPrice);

    // Type currency
    const currencyInputNode = screen.getByLabelText('Currency');
    expect(currencyInputNode).toBeDefined();

    fireEvent.change(currencyInputNode, {
      target: { value: newDidNumber.currency },
    });
    expect(currencyInputNode.value).toEqual(newDidNumber.currency);

    // Click button
    const buttonNode = screen.getByText('SAVE ITEM');
    expect(buttonNode).toBeDefined();

    fireEvent.click(buttonNode);

    // Check if new item was added
    await waitFor(
      () => {
        // Check if new item is on the screen by its unique value
        const didTableValueNode = screen.getByText('+11 11 11111-1111');
        expect(didTableValueNode).toBeDefined();
        // Check if successfull message exists
        const toastNode = screen.getByText('Item successfully added.');
        expect(toastNode).toBeDefined();
      },
      {
        timeout: 3000,
      }
    );
  });

  //   it('Should remove the did item previously added', async () => {
  //     render(
  //       <Provider store={store}>
  //         <App />
  //       </Provider>
  //     );

  //     const didTableValueNode = screen.getByText('+11 11 11111-1111');
  //     expect(didTableValueNode).toBeDefined();
  //   });
});
