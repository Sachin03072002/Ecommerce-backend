const express = require("express");
const router = express.Router();

const orderController = require("../controller/adminOrderController");
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, orderController.getAllOrders);
router.put("/:orderId/confirmed", authenticate, orderController.confirmOrder);
router.put("/:orderId/ship", authenticate, orderController.shippOrders);
router.put("/:orderId/deliver", authenticate, orderController.deliverOrders);
router.put("/:orderId/cancel", authenticate, orderController.cancelOrders);
router.delete("/:orderId/delete", authenticate, orderController.deleteOrders);

module.exports = router;

