"use client"
import { useEffect, useState } from "react";
import styles from "./countries.module.css";
import { getCountries } from "@/components/db/countries";

export default function Home() {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    
    useEffect(() => {

        async function fetchCountries() {
            const response = await getCountries();
            if (response.success) {
                setCountries(response.countries);
                setFilteredCountries(response.countries);
            } else {
                console.error("Error fetching countries:", response.error);
            }
        }
        
        fetchCountries();
    }, []);
    

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        if (searchValue === "") {
            setFilteredCountries(countries);
        } else {
            const filtered = countries.filter(country => 
                country.short_name.toLowerCase().startsWith(searchValue)
            );
            setFilteredCountries(filtered);
        }
    };

    return(
        <>
            <div className={styles.absoluteObject1}></div>
            <div className={styles.absoluteObject2}></div>
        
            <main className={styles.countriesSection}>
                <div className={styles.searchContainer}>
                    <h1>Choose a country: </h1>
                    <input 
                        type="text" 
                        placeholder="Search a country..." 
                        id="search"
                        onChange={handleSearch}
                    />
                </div>
                <div className={styles.countriesContainer}>
                    {filteredCountries.length > 0 ? (
                        filteredCountries.map((country, index) => (
                            <div key={index} className={styles.country}>
                                <h2>{country.short_name}</h2>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </main>
        </>
    );
}