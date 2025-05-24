// lib/config.ts
import { getGlobalUrls } from "./configs";
import { Table } from "./types";

async function getTables(): Promise<Table[]> {
    const {url_api} = getGlobalUrls();
    const response = await fetch(`localhost:8080/api/tables`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache:'no-store' }
    )
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      return data
    } else {
      throw new Error('Failed to fetch tables');
    }
  }

export function getHandlesAPI() {
    return {
      getTables: getTables,
    };
  }
  