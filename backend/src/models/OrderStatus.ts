export const OrderStatus = {
  NEW: "new",
  PROCESSING: "processing",
  SHIPPED: "on the way",
  DELIVERED: "delivered",
} as const;

export type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus];
