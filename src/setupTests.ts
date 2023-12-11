// UniqueShoppingApp.test.tsx
import { render } from '@testing-library/react';
import UniqueShoppingApp from './UniqueShoppingApp';

test('calculates total price correctly', () => {
  const uniqueProducts = [
    { uniqueId: '1', productName: 'Product 1', price: 10 },
    { uniqueId: '2', productName: 'Product 2', price: 15 },
  ];

  const uniqueCart = {
    '1': 2, // Product 1 with quantity 2
    '2': 1, // Product 2 with quantity 1
  };

  const { getByText } = render(<UniqueShoppingApp uniqueProducts={uniqueProducts} uniqueCart={uniqueCart} />);
  const totalPriceElement = getByText(/Total Price/i);

  // Assuming getTotalPrice multiplies product price by quantity
  const expectedTotalPrice = 10 * 2 + 15 * 1;

  expect(totalPriceElement.textContent).toContain(`$${expectedTotalPrice}`);
});
