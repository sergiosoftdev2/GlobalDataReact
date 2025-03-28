"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./countries.module.css";
import { getCountries, getCountryCode } from "@/components/db/countries";
import { getCountrySeries } from "@/components/db/series";

export default function Home() {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    
    useEffect(() => {

        async function fetchCountries() {
            const response = await getCountries();
            if (response.success) {
                setCountries(response.countries);
                setFilteredCountries(response.countries);
                setIsLoading(false);
            } else {
                console.error("Error fetching countries:", response.error);
            }
        }
        
        fetchCountries();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            let countries = document.querySelectorAll(".countrySelect");
    
            const handleClick = async (event) => {
                let countryName = event.currentTarget.dataset.value
                let countryCodeFetch = await getCountryCode(countryName);
                let countrycode = countryCodeFetch.countryCode[0].country_Code
                router.push(`/countries/${countrycode}`);
            };
    
            countries.forEach(country => {
                country.addEventListener("click", handleClick);
            });
    
            return () => {
                countries.forEach(country => {
                    country.removeEventListener("click", handleClick);
                });
            };
        }
    }, [filteredCountries]);

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
                        autoComplete="off" 
                        placeholder="Search a country..." 
                        id="search"
                        onChange={handleSearch}
                    />
                </div>
                <div className={styles.countriesContainer}>
                    {   isLoading ? (
                            <>
                                <div className={styles.ghostResult}></div>
                                <div className={styles.ghostResult}></div>
                                <div className={styles.ghostResult}></div>
                                <div className={styles.ghostResult}></div>
                                <div className={styles.ghostResult}></div>
                                <div className={styles.ghostResult}></div>
                                <div className={styles.ghostResult}></div>
                                <div className={styles.ghostResult}></div>
                            </>
                        ) : filteredCountries.length > 0 ? (
                                filteredCountries.map((country, index) => (
                                    <div key={index} className="countrySelect" data-value={country.short_name}>
                                        <h2>{country.short_name}</h2>
                                    </div>
                                ))
                        ) : (
                                <p>No countries named like this...</p>
                        )
                    }
                </div>
            </main>
        </>
    );
}