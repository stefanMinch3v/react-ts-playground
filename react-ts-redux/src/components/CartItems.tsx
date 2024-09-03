import { addToCartAction, CartItem, removeFromCartAction } from "../store/cart-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function CartItems() {
  const cartItems = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();
  const totalPrice = cartItems.reduce((val, item) => val  + item.price * item.quantity, 0).toFixed(2);

  function handleAddToCart(item: CartItem): void {
    dispatch(addToCartAction(item));
  }

  function handleRemoveFromCart(id: string): void {
    dispatch(removeFromCartAction(id));
  }

  return (
    <div id="cart">
      { cartItems.length === 0 && <p>No items in cart!</p> }

      { cartItems.length > 0 && <ul id="cart-items">
          {cartItems.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.title}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => handleRemoveFromCart(item.id)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleAddToCart(item)}>+</button>
                </div>
              </li>
            );
          })}
        </ul> }

      <p id="cart-total-price">
        Cart Total: <strong>${totalPrice}</strong>
      </p>
    </div>
  );
}
