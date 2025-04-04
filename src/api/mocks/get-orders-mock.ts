import { http, HttpResponse } from "msw";
import type { GetOrdersResponse } from "../get-orders";

type Orders = GetOrdersResponse["orders"];

type OrderStatus = GetOrdersResponse["orders"][number]["status"];

const statuses: OrderStatus[] = [
  "canceled",
  "delivered",
  "delivering",
  "pending",
  "processing",
];

const orders: Orders = Array.from({ length: 60 }).map((_, i) => ({
  orderId: `order-${i + 1}`,
  customerName: `Customer ${i + 1}`,
  createdAt: new Date().toISOString(),
  total: 2400,
  status: statuses[i % 5],
}));

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  "/orders",
  ({ request }) => {
    const { searchParams } = new URL(request.url);

    const pageIdenx = searchParams.get("pageIndex")
      ? Number(searchParams.get("pageIndex"))
      : 0;

    const customerName = searchParams.get("customerName");
    const orderId = searchParams.get("orderId");
    const status = searchParams.get("status");

    let filteredOrders = orders;

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.toLowerCase().includes(customerName.toLowerCase()),
      );
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.toLowerCase().includes(orderId.toLowerCase()),
      );
    }

    if (status) {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === status,
      );
    }

    const paginatedOrders = filteredOrders.slice(
      pageIdenx * 10,
      (pageIdenx + 1) * 10,
    );

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        totalCount: filteredOrders.length,
        pageIndex: pageIdenx,
        perPage: 10,
      },
    });
  },
);
