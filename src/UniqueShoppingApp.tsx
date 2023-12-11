import React, { useState, useEffect } from 'react';
import UniqueProductList from './UniqueProductList';

import './App.css';
import './index.css';

const UniqueShoppingApp: React.FC = () => {
  const [uniqueCart, setUniqueCart] = useState<{ [uniqueKey: string]: number }>({});
  const [discountCode, setDiscountCode] = useState<string>('');
  const [uniqueProducts, setUniqueProducts] = useState<
    { uniqueId: string; productName: string; price: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddToUniqueCart = (productId: string) => {
    setUniqueCart((prevUniqueCart) => ({
      ...prevUniqueCart,
      [productId]: (prevUniqueCart[productId] || 0) + 1,
    }));
  };

  const handleRemoveFromUniqueCart = (productId: string) => {
    setUniqueCart((prevUniqueCart) => {
      const newUniqueCart = { ...prevUniqueCart };
      delete newUniqueCart[productId];
      return newUniqueCart;
    });
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setUniqueCart((prevUniqueCart) => ({
      ...prevUniqueCart,
      [productId]: quantity,
    }));
  };

  const handleApplyDiscountCode = () => {
    if (discountCode === 'UNIQUEWEB3COHORTx') {
      // Apply 10% discount
      alert('Discount code applied! 10% discount has been added.');
    } else {
      alert('Invalid discount code');
    }
  };

  const getTotalPrice = () => {
    return Object.keys(uniqueCart).reduce((total, productId) => {
      const product = uniqueProducts.find((p) => p.uniqueId === productId);
      if (product) {
        return total + product.price * uniqueCart[productId];
      }
      return total;
    }, 0);
  };

  useEffect(() => {
    // Fetch product data
    fetch('https://api.example.com/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        return response.json();
      })
      .then((data) => {
        setUniqueProducts(data);
      })
      .catch((fetchError) => {
        setError(fetchError.message);
      });
  }, []); // Only run on mount

  useEffect(() => {
    // Load cart data from localStorage on component mount
    const savedUniqueCart = localStorage.getItem('uniqueCart');
    if (savedUniqueCart) {
      setUniqueCart(JSON.parse(savedUniqueCart));
    }
  }, []);

  useEffect(() => {
    // Save cart data to localStorage whenever it changes
    localStorage.setItem('uniqueCart', JSON.stringify(uniqueCart));
  }, [uniqueCart]);

  return (
    <div>
      <h1>Unique Shopping Cart</h1>
      {/* Pass the error state to UniqueProductList */}
      <UniqueProductList
        uniqueProducts={uniqueProducts}
        uniqueCart={uniqueCart}
        onAddToUniqueCart={handleAddToUniqueCart}
        onRemoveFromUniqueCart={handleRemoveFromUniqueCart}
        onQuantityChange={handleQuantityChange}
        error={error}
      />
      <div>
        <input
          type="text"
          placeholder="Enter discount code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
        <button onClick={handleApplyDiscountCode}>Apply Discount Code</button>
      </div>
      <div>
        <h2>Total Price: ${getTotalPrice()}</h2>
      </div>
    </div>
  );
};

export default UniqueShoppingApp;

