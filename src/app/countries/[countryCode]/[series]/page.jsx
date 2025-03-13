"use client"
import { useEffect, useState, useRef } from "react";
import styles from "./series.module.css";
import { useParams, useRouter } from "next/navigation";
import { getCountry } from "@/components/db/countries";
import { getSeriesData, getSeriesMetaData } from "@/components/db/series";
import { Chart, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale);

export default function Home() {

    const router = useRouter();
    const params = useParams();
    const [countryName, setCountryName] = useState("");
    const [seriesMetaData, setSeriesMetaData] = useState({});
    const [IsLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const chartRef = useRef(null);  // Use useRef for the chart canvas

    useEffect(() => {
        let countryCode = params.countryCode;
        let seriesCode = params.series;

        const fetchCountryName = async () => {
            let cname = await getCountry(countryCode).then(data => {
                return data.countries[0].short_name
            });
            setCountryName(cname);
            setIsLoading(false);
        };

        const fetchSeriesMetaData = async () => {
            let sname = await getSeriesMetaData(seriesCode).then(data => {
                return data.seriesData[0]
            });
            setSeriesMetaData(sname);
        };

        const fetchSeriesData = async () => {
            let seriesData = await getSeriesData(seriesCode, countryCode).then(data => {
                return data.seriesData
            });
            setData(seriesData);
        };

        fetchSeriesMetaData();
        fetchCountryName();
        fetchSeriesData();
    }, [params]);

    // CHART
    useEffect(() => {
        if (data.length > 0) {
          // Destroy the previous chart if it exists
          if (chartRef.current && chartRef.current.chart) {
            chartRef.current.chart.destroy();
          }
      
          // Create a properly configured chart
          const backgroundColor = '#5f43b2';
          const borderColor = '#5f43b2';
          
          chartRef.current.chart = new Chart(chartRef.current, {
            type: 'bar',
            data: {
              labels: data.map(row => row.year),
              datasets: [{
                label: seriesMetaData.series_topic,
                data: data.map(row => row.value),
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Value'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Year'
                  }
                }
              }
            }
          });
        }
        
        // Clean up function to destroy chart when component unmounts
        return () => {
          if (chartRef.current && chartRef.current.chart) {
            chartRef.current.chart.destroy();
          }
        };
    }, [data]);

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    };

    const handleDownload = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${seriesMetaData.series_topic}.json`);
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return(
        <>
            <div className={styles.absoluteObject1}></div>
            <div className={styles.absoluteObject2}></div>
        
            <main className={styles.countriesSection}>
                <div className={styles.searchContainer}>
                    {IsLoading ? (
                        <div className={styles.ghostTitle}></div>
                    ) : (
                        <>
                            <h1>{countryName + " | " + seriesMetaData.series_topic}</h1>
                            <p>{seriesMetaData.long_definition}</p>
                        </>
                    )}
                </div>
                <div className={styles.chartContainer}>
                    <canvas ref={chartRef} id="acquisitions"></canvas>
                </div>
                <section className={styles.dataContainer}>
                    
                    <div className={styles.flexContainer}>
                      <div className={styles.flexChildRawData}>
                        <h1>Data: </h1>
                        <div className={styles.dataGridContainer}>
                            {data.map((row, index) => (
                                <div key={index} className={styles.rowCard}>
                                    <h3>{row.year}</h3>
                                    <p>{row.value}</p>
                                </div>
                            ))}
                        </div>
                      </div>
                      <div className={styles.flexChildTextArea}>
                        <h1>JSON: </h1>
                        <div className={styles.textAreaContainer}>
                          <textarea 
                            readOnly 
                            value={data.length > 0 ? JSON.stringify(data, null, 2) : "No data available"} 
                          />
                          <div className={styles.buttonContainer}>
                            <button onClick={handleCopy}>
                              Copy
                              <img src="/copy.svg" alt="copy" />
                            </button>
                            <button onClick={handleDownload}>
                              Download
                              <img src="/download.svg" alt="download" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                </section>
            </main>
        </>
    );
}
