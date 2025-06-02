// lib/config.ts
import { getGlobalUrls } from "./configs";
import type { Table, Order, OrderItem } from "./types";

const {url_api} = getGlobalUrls();

async function getTables(): Promise<Table[]> {
    const url = `${url_api}/api/tables`

    const response = await fetch(url, {
        method: "GET",
        cache:'no-store' 
    } 
    )
    if (response.ok) {
      if(response.status === 200) {
        const data: Table[] = await response.json();
        return data;
      }
      return [];
    } else {
      return [];
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
      if(response.status === 200) {
        const data: Table = await response.json();
        return data;
      }

      return {} as Table;
    } else {
      throw new Error('Failed to fetch tables');
    }

}

async function createTable(table: Table): Promise<Table> {
  try {
    console.log("Creating table with data:", table);

    const response = await fetch(`http://localhost:8080/api/create-table`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(table),
    });

    console.log("Response:", response);
    if (response.ok) {
      const data: Table = await response.json();
      return data;
    }

    // Se não for 2xx
    console.error("API Error:", response.status, await response.text());
    return {} as Table;

  } catch (error) {
    console.error("Fetch error:", error);
    return {} as Table;
  }
}

async function getOrders(tableId: string): Promise<Order[]> {
    const response = await fetch(`${url_api}/api/orders/get-orders?id_table=${tableId}`, {
        method: "GET",
        cache:'no-store' 
    }
    )
    if (response.ok) {
      if(response.status === 200){
        const data: Order[] = await response.json()
        return data
      }

      return []
    } else {
      throw new Error('Failed to fetch tables');
    }
}


async function getOrderByTableId(orderId: string): Promise<OrderItem[]> {
    const response = await fetch(`${url_api}/api/orders/get-orders-itens?id_order=${orderId}`, {
        method: "GET",
        cache:'no-store' 
    }
    )
    if (response.ok) {
      if (response.status === 200) {
          // Assuming the response is an array of OrderItem
        const data: OrderItem[] = await response.json()
        return data
      }

      return [];
    } else {
      throw new Error('Failed to fetch tables');
    }
}

async function getOrderById(orderId: string): Promise<Order> {
    const response = await fetch(`${url_api}/api/orders/get-orders/?id_order=${orderId}`, {
        method: "GET",
        cache:'no-store' 
    }
    )

    if (response.ok) {
      if(response.status === 200){
        const data: Order = await response.json()
        return data
      }

      return {} as Order;
      
    } else {
      throw new Error('Failed to fetch order');
    }
}

async function getOrderItens(orderId: string): Promise<OrderItem[]> {
    const response = await fetch(`${url_api}/api/orders/get-orders-itens/?id_order=${orderId}`, {
        method: "GET",
        cache:'no-store' 
    }
    )

    if (response.ok) {
      if(response.status === 200){
        const data: OrderItem[] = await response.json()
        return data
      }

      return [];
      
    } else {
      throw new Error('Failed to fetch order');
    }
}

async function getOrderItemById(orderItemId: string): Promise<OrderItem> {
    const response = await fetch(`${url_api}/api/orders/get-orders-itens/id_order_item=${orderItemId}`, {  
        method: "GET",
        cache:'no-store' 
    }
    )

    if (response.ok) {
      if (response.status === 201) {
        const data: OrderItem = await response.json()
        return data
      }
      return {} as OrderItem;
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
      createTable: createTable,
    };
  }
  