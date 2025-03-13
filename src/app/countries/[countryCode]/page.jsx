"use client"
import { useEffect, useState } from "react";
import styles from "./countryCode.module.css";
import { getCountrySeries } from "@/components/db/series";
import { useParams, useRouter } from "next/navigation";

export default function Home({params}) {

    const router = useRouter();
    const { countryCode } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [series, setSeries] = useState([]);
    const [filteredSeries, setFilteredSeries] = useState([]);
    
    useEffect(() => {

        async function fetchSeries() {
            const response = await getCountrySeries(countryCode);
            if (response.success) {
                setSeries(response.series);
                setFilteredSeries(response.series);
                setIsLoading(false);
            } else {
                console.error("Error fetching series:", response.error);
            }
        }
        
        fetchSeries();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            
            let seriesDiv = document.querySelectorAll(".countrySelect");
    
            const handleClick = async (event) => {
                let seriesCode = event.currentTarget.dataset.value
                router.push(`/countries/${countryCode}/${seriesCode}`);
            };
    
            seriesDiv.forEach(serie => {
                serie.addEventListener("click", handleClick);
            });
    
            return () => {
                seriesDiv.forEach(serie => {
                    serie.removeEventListener("click", handleClick);
                });
            };
        }
    }, [filteredSeries]);

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        if (searchValue === "") {
            setFilteredSeries(series);
        } else {
            const filtered = series.filter(serie => 
                serie.topic.toLowerCase().includes(searchValue)
            );
            setFilteredSeries(filtered);
        }
    };

    return(
        <>
            <div className={styles.absoluteObject1}></div>
            <div className={styles.absoluteObject2}></div>
        
            <main className={styles.countriesSection}>
                <div className={styles.searchContainer}>
                    <h1>Choose a series of data: </h1>
                    <input 
                        type="text"
                        autoComplete="off" 
                        placeholder="Search a series here..." 
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
                        ) : filteredSeries.length > 0 ? (
                            filteredSeries.map((serie, index) => (
                                    <div key={index} className="countrySelect" data-value={serie.series_code}>
                                        <h2>{serie.topic}</h2>
                                    </div>
                                ))
                        ) : (
                                <p>No series like that one...</p>
                        )
                    }
                </div>
            </main>
        </>
    );
}