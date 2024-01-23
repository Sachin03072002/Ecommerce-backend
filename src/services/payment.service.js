const Razorpay = require("razorpay");
require("dotenv").config();
const KEY_ID = process.env.KEY_ID;
const SECRET_ID = process.env.SECRET_ID;
var instance = new Razorpay({ key_id: KEY_ID, key_secret: SECRET_ID })


const orderService = require("../services/order.service");
const createPaymentLink = async (orderId) => {
    try {
        const order = await orderService.findOrderById(orderId);
        console.log("order:", order);
        const paymentLinkRequest = {
            amount: order.discountedPrice * 100,
            currency: "INR",
            customer: {
                name: order.user.firstName + " " + order.user.lastName,
                email: order.user.email,
                contact: order.shippingAddress.mobile,
            },
            notify: {
                sms: true,
                email: true
            },
            reminder_enable: true,
            callback_url: `http://localhost:3000/payment/${orderId}`,
            callback_method: 'get'
        };

        const paymentLink = await instance.paymentLink.create(paymentLinkRequest);
        const paymentLinkId = paymentLink.id;
        const payment_link_url = paymentLink.short_url;
        return {
            paymentLinkId,
            payment_link_url,
            message: "Payment link created successfully",
        };
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};



const updatePaymentInformation = async (reqData) => {
    const paymentId = reqData.paymentId_id;
    const orderId = reqData.order_id;
    try {
        const order = await orderService.findOrderById(orderId);
        const payment = await instance.payments.fetch(paymentId); // Change here
        if (payment.status == "captured") {
            order.paymentDetails.paymentId = paymentId;
            order.paymentDetails.status = "COMPLETED";
            order.orderStatus = "PLACED";
            await order.save();
        }
        const resData = { message: "Your order is placed", success: true };
        return resData;
    } catch (error) {
        console.log("Error2:", error);
        throw new Error(error.message);
    }
}



module.exports = {
    createPaymentLink,
    updatePaymentInformation
}










