const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const cartService = require("../services/cart.service");
async function findUserCart(req, res) {
    const user = req.user;
    try {
        const cart = await cartService.findUserCart(user.id);
        return res.status(200).send(cart);
    } catch (error) {
        throw new Error(error.message);
    }
}

const addItemToCart = async (req, res) => {
    const user = req.user;
    try {
        const cartItem = await cartService.addCartItem(user.id, req.body);
        return res.status(200).send(cartItem);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

// cartController.js

const findOrCreateUserCart = async (req, res) => {
    try {
        const user = await req.user;

        if (!user) {
            return res.status(400).send({ error: "User not found in the request." });
        }

        let cart = await cartService.findUserCart(user.id);

        if (!cart) {
            // If the cart doesn't exist, create an empty cart
            cart = await cartService.createCart(user.id);
        }

        return res.status(200).send(cart);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = { findUserCart, addItemToCart, findOrCreateUserCart };

// module.exports = { findUserCart, addItemToCart }