"use server"

import { createClient } from "@libsql/client"

const client = createClient({
    url: process.env.DB_URL,
    authToken: process.env.DB_KEY,
});

export async function getCountrySeries(countryCode) {
    try {
        
        const result = await client.execute(`
            SELECT s.series_code, s.topic 
            FROM wdi_series s
            INNER JOIN wdi_country_series c ON s.series_code = c.seriescode
            WHERE c.countrycode = ?
        `, [countryCode]);

        // CONVERTING THE ROWS INTO PLAIN OBJECTS
        let series = result.rows.map(row => ({ series_code: row.series_code, topic: row.topic }));
        return { success: true, series: series};

    }catch (error) {
        console.error('Error al consultar actividades:', error);
        return { success: false, error: error.message };
    }
}

export async function getSeriesMetaData(seriesCode) {
    try {

        const result = await client.execute(`
            SELECT * FROM wdi_series WHERE series_code = ?
        `, [seriesCode]);

        // CONVERTING THE ROWS INTO PLAIN OBJECTS
        let seriesData = result.rows.map(row => ({ series_topic: row.topic, series_code: row.series_code, indicator_name: row.indicator_name, long_definition: row.long_definition}));
        return { success: true, seriesData: seriesData};

    }catch (error) {
        console.error('Error al consultar actividades:', error);
        return { success: false, error: error.message };
    }

}

export async function getSeriesData(seriesCode, countryCode) {
    try {

        const result = await client.execute(`
            SELECT * FROM wdi_data WHERE indicator_code = ? AND country_code  = ?
        `, [seriesCode, countryCode]);

        // CONVERTING THE ROWS INTO PLAIN OBJECTS
        let seriesData = result.rows.map(row => ({ countryCode: row.countrycode, year: row.year, value: row.value }));
        return { success: true, seriesData: seriesData};

    }catch (error) {
        console.error('Error al consultar actividades:', error);
        return { success: false, error: error.message };
    }

}