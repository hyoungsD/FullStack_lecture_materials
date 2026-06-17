import { OrderStatus } from "@prisma/client";

// 배송 단계 전진 규칙. "지금 상태 → 다음으로 갈 수 있는 상태" 한 칸씩만 정의한다.
//   PAID → SHIPPED → DONE
// 이 표에 없는 전이는 전부 막힌다 — PAID에서 곧장 DONE으로는 못 간다.
const SHIPPING_TRANSITIONS: Partial<Record<OrderStatus, OrderStatus>> = {
  PAID: "SHIPPED",
  SHIPPED: "DONE",
};

export function nextShippingStatus(current: OrderStatus): OrderStatus | null {
  return SHIPPING_TRANSITIONS[current] ?? null;
}
