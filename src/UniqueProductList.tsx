
import React from 'react';

interface UniqueProductListProps {
  uniqueProducts: { uniqueId: string; productName: string; price: number }[];
  uniqueCart: { [uniqueKey: string]: number };
  onAddToUniqueCart: (productId: string) => void;
  onRemoveFromUniqueCart: (productId: string) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
  error: string | null; // Add error prop
}

const UniqueProductList: React.FC<UniqueProductListProps> = ({
  uniqueProducts,
  uniqueCart,
  onAddToUniqueCart,
  onRemoveFromUniqueCart,
  onQuantityChange,
  error,
}) => {
  return (
    <div>
      <h2>Unique Product List</h2>
      {/* Display error if there's any */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {uniqueProducts.map((product) => (
          <li key={product.uniqueId}>
            {product.productName} - ${product.price}
            <button onClick={() => onAddToUniqueCart(product.uniqueId)}>Add to Cart</button>
            {uniqueCart[product.uniqueId] && (
              <div>
                <button onClick={() => onQuantityChange(product.uniqueId, uniqueCart[product.uniqueId] - 1)}>
                  -
                </button>
                {uniqueCart[product.uniqueId]}
                <button onClick={() => onQuantityChange(product.uniqueId, uniqueCart[product.uniqueId] + 1)}>
                  +
                </button>
                <button onClick={() => onRemoveFromUniqueCart(product.uniqueId)}>Remove</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UniqueProductList;

