import { Request, Response, Router } from "express";
import Validator from "validatorjs";
import Product from "../products/Product.model";
import Order from "./Order.model";
const router = Router();

router.get("", async (req: Request, res: Response) => {
  return res.json({
    message: "Orders",
  });
});

router.post("", async (req: Request, res: Response) => {
  let validation = new Validator(req.body, {
    product: "required",
    name: "required",
    customer: {
      name: "required",
      phone: "required",
      address: "required",
    },
    payment: {
      method: "required|in:bkash,nagad",
      amount: "required|numeric",
      transaction_id: "required",
    },
    consent: {
      support_club: "required|boolean",
      show_support_amount: "required|boolean",
    },
  });

  const product = await Product.findById(req.body.product);

  if (!product) {
    return res.status(400).json({
      message: "Product not found with given id",
    });
  }
  const _price = product.price as number;
  if (_price > req.body.payment.amount) {
    return res.status(400).json({
      message: "Minimum amount should be equal to " + _price,
    });
  }

  if (validation.fails()) {
    return res.status(400).json({
      errors: validation.errors.all(),
    });
  }

  const order = new Order(req.body);

  await order.save();

  return res.json({
    message: "Order placed successfully",
    order,
  });
});

export default router;
