import { http, HttpResponse } from "msw";
import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from "../get-order-details";

export const getOrderDetailMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>("/orders/:orderId", ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "99999999999",
    },
    totalInCents: 5000,
    status: "pending",
    createdAt: new Date().toISOString(),
    orderItems: [
      {
        id: "order-item-1",
        priceInCents: 1000,
        product: { name: "Pizza Pepperoni" },
        quantity: 1,
      },
      {
        id: "order-item-1",
        priceInCents: 2000,
        product: { name: "Pizza Marguerita" },
        quantity: 2,
      },
    ],
  });
});
