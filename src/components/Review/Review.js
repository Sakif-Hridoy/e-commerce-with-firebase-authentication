import React, { useEffect, useState } from 'react';
import { getDatabaseCart,removeFromDatabaseCart,processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';
const Review = (props) => {
    const [cart,setCart] = useState([]);
    const[orderPlaced,setOrderPlaced] = useState(false);
    const history = useHistory();
    
    const handleProceedCheckout = ()=>{
        history.push('/shipment')
    }
    const handleRemoveProduct = (productKey)=>{
        const newCart = cart.filter(pd=>
            pd.key !== productKey
        )
        setCart(newCart);
        removeFromDatabaseCart(productKey);
        
    }

    useEffect(()=> {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map( key=> {
           const product = fakeData.find(pd=>pd.key === key);
           product.quantity = savedCart[key];
           return product;
        });
        // console.log(cartProducts);
        setCart(cartProducts);
    },[]);

    let thankYou;
    if(orderPlaced){
        thankYou= <img src={happyImage} alt="" />;
    }
    return (
        <div className="shop-container">
            <div className="product-container">
            
            {
                cart.map(pd=><ReviewItem product={pd} handleRemoveProduct={handleRemoveProduct}></ReviewItem>)
            }
            {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout}className="main-button">Proceed Checkout</button>
                    
                </Cart>
                
            </div>
        </div>
    );
};

export default Review;