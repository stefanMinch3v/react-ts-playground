import { useState } from 'react';

import Cart from './Cart.tsx';
import { useAppSelector } from '../store/hooks.ts';

export default function Header() {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const cartQuantity = useAppSelector(state => state.cart.items.reduce((prevVal, item) => prevVal + item.quantity, 0)); // sum all quantities

  function handleOpenCartClick() {
    setCartIsVisible(true);
  }

  function handleCloseCartClick() {
    setCartIsVisible(false);
  }

  return (
    <>
      {cartIsVisible && <Cart onClose={handleCloseCartClick} />}
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Redux</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({ cartQuantity })</button>
        </p>
      </header>
    </>
  );
}
