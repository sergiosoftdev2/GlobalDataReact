"use server"

import { createClient } from "@libsql/client"

const client = createClient({
    url: process.env.DB_URL,
    authToken: process.env.DB_KEY,
});

export async function getCountries(){
    try {
        
        const result = await client.execute(`
            SELECT short_name FROM wdi_country
            ORDER BY short_name ASC;
        `);

        // CONVERTING THE ROWS INTO PLAIN OBJECTS
        const countries = result.rows.map(row => ({ short_name: row.short_name }));
        return { success: true, countries };

    }catch (error) {
        console.error('Error al consultar actividades:', error);
        return { success: false, error: error.message };
    }
}