// lib/config.ts
import { getGlobalUrls } from "./configs";
import type { Table, Order, OrderItem, ResponseAPI, CreateOrder } from "./types";

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

async function createTable(table: Table): Promise<ResponseAPI> {
  try {
    const response = await fetch(`${url_api}/api/create-table`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(table),
    });

    return {
      status: response.status,
      message: "Table created successfully",
      data: []
    }

  } catch (error) {
    return {
      status: 500,
      message: "An error occurred while creating the table",
      data: []
    }
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
      if (response.status === 200) {
        const data: OrderItem = await response.json()
        return data
      }
      return {} as OrderItem
    } else {
      throw new Error('Failed to fetch order item')
    }
}

async function createOrder(order: CreateOrder): Promise<ResponseAPI> {
    try {
      const response = await fetch(
        `${url_api}/api/orders/create-orders`,
        {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );

      return {
        status: response.status,
        message: "Order created successfully",
        data: [],
      };

    } catch (error) {
      return {
        status: 500,
        message: "An error occurred while creating the order",
        data: [],
      };
    }
}

async function createSection(id_table: string): Promise<ResponseAPI> {
    try {
      const response = await fetch(
        `${url_api}/api/orders/create-section`,
        {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "id_table": id_table }),
        }
      );

      return {
        status: response.status,
        message: "Section created successfully",
        data: [],
      };

    } catch (error) {
      return {
        status: 500,
        message: "An error occurred while creating the section",
        data: [],
      };
    }
}



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
      createOrder: createOrder,
    };
  }
  