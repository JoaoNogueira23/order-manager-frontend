// lib/config.ts
import { getGlobalUrls } from "./configs";
import { Table, Order, OrderItem } from "./types";

const {url_api} = getGlobalUrls();

async function getTables(): Promise<Table[]> {
    const url = `${url_api}/api/tables`

    const response = await fetch(url, {
        method: "GET",
        cache:'no-store' 
    }
    )
    if (response.ok) {
        const data: Table[] = await response.json()
        return data
      }
    else {
      throw new Error('Failed to fetch tables');
    }
}

async function getTableById(tableId: string): Promise<Table> {

    const response = await fetch(
      `${url_api}/api/table/${tableId}`,
       {
        method: "GET",
        cache:'no-store' 
      }
    )
    if (response.ok) {
      const data: Table = await response.json()
      return data
    } else {
      throw new Error('Failed to fetch tables');
    }

}

async function getOrders(tableId: string): Promise<Order[]> {
    const response = await fetch(`${url_api}/api/orders/get-orders?id_table=${tableId}`, {
        method: "GET",
        cache:'no-store' 
    }
    )
    if (response.ok) {
      const data: Order[] = await response.json()
      return data
    } else {
      throw new Error('Failed to fetch tables');
    }
}


async function getOrderByTableId(orderId: string): Promise<OrderItem[]> {
    const response = await fetch(`${url_api}/api/ordes/get-orders-itens?id_order=${orderId}`, {
        method: "GET",
        cache:'no-store' 
    }
    )
    if (response.ok) {
      const data: OrderItem[] = await response.json()
      return data
    } else {
      throw new Error('Failed to fetch tables');
    }
}

async function getOrderById(orderId: string): Promise<Order> {
    const response = await fetch(`${url_api}/api/order/get-order-itens/?id_order=${orderId}`, {
        method: "GET",
        cache:'no-store' 
    }
    )

    if (response.ok) {
      const data: Order = await response.json()
      return data
    } else {
      throw new Error('Failed to fetch order');
    }
}

async function getOrderItens(orderId: string): Promise<OrderItem[]> {
    const response = await fetch(`${url_api}/api/order/get-orders-itens/?id_order=${orderId}`, {
        method: "GET",
        cache:'no-store' 
    }
    )

    if (response.ok) {
      const data: OrderItem[] = await response.json()
      return data
    } else {
      throw new Error('Failed to fetch order');
    }
}

async function getOrderItemById(orderItemId: string): Promise<OrderItem> {
    const response = await fetch(`${url_api}/api/order/get-order-item/id_order_item=${orderItemId}`, {  
        method: "GET",
        cache:'no-store' 
    }
    )

    if (response.ok) {
      const data: OrderItem = await response.json()
      return data
    } else {
      throw new Error('Failed to fetch order item');
    }}



export function getHandlesAPI() {
    return {
      getTables: getTables,
      getOrders: getOrders,
      getTableById: getTableById,
      getOrderByTableId: getOrderByTableId,
      getOrderById: getOrderById,
      getOrderItemById: getOrderItemById,
      getOrderItens: getOrderItens,
    };
  }
  