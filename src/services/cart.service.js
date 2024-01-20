const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");
async function createCart(user) {
    try {
        const cart = new Cart({ user });
        const createdCart = await cart.save();
        return createdCart;
    } catch (error) {
        throw new Error(error.message);
    }
}
async function findUserCart(userId) {
    try {
        let cart = await Cart.findOne({ user: userId });
        let cartItems = await CartItem.find({ cart: cart._id }).populate("product");

        cart.cartItems = cartItems;

        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItems = 0;

        for (let item of cart.cartItems) {

            totalPrice += item.product.price * item.quantity;
            totalDiscountedPrice += item.product.discountedPrice * item.quantity;
            totalItems += item.quantity;

        }
        cart.totalPrice = totalPrice;
        cart.discount = totalPrice - totalDiscountedPrice;
        cart.totalDiscountedPrice = totalDiscountedPrice;
        cart.totalItem = totalItems;

        // console.log("cart from cart:", cart);
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function addCartItem(userId, req) {
    try {
        // Find the cart based on userId
        const cart = await Cart.findOne({ user: userId });
        const product = await Product.findById(req.productId);
        const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId });

        if (!isPresent) {
            const cartItem = new CartItem({
                product: product._id,
                cart: cart._id,
                quantity: 1,
                userId,
                price: product.price,
                size: req.size,
                discountedPrice: product.discountedPrice
            });

            const createdCartItem = await cartItem.save();
            cart.cartItems.push(createdCartItem);
            await cart.save();

            return createdCartItem;
        } else {
            return isPresent;
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createCart, findUserCart, addCartItem };
