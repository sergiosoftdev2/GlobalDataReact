import styles from "./page.module.css";
import Link from "next/link";
import { MainPageCard } from "@/components/MainPageCard/mainPageCard";
import { MainPageCardText } from "@/components/MainPageCardText/mainPageCardText";


export default function Home() {
  
  return (
    <>
      <div className={styles.absoluteObject1}></div>
      <div className={styles.absoluteObject2}></div>
      <main>
        <section className={styles.heroSection}>
          <div className={`${styles.heroInfo} ${styles.half}`}>
            <h1>Global Data</h1>
            <p>Be ready to explore all world data in just a flew clicks. With Global Data you will be able to visualize the most important statistics of any country in the world.</p>
            <div className={styles.botones}>
              <Link href="/countries" className={styles.botonProbar}>Try now!</Link>
              <Link href="#how">How does it work?</Link>
            </div>
          </div>
          <div className={`${styles.heroImage} ${styles.half}`}>
            <model-viewer 
              src="/earth.glb" 
              className={styles.earthContainer} 
              id="earth"
              environment-image="legacy" 
              auto-rotate 
              loading="eager"
            >
            </model-viewer>
          </div>
        </section>
        <section className={styles.sectionGradient} id="how">
          <h2 className={styles.sectionTitle}>How does it work?</h2>
          <p>
            Make visualizing any statistics much easier with Global Data. 
            The app collects information from a database provided by World Data Indicators and displays the information in an easy way to understand it.
            Also, it provides all the information in text so you can copy it and download it in your own system.
          </p>
          <div className={styles.gridSection}>
            <MainPageCard 
              imgSrc="https://www.freeiconspng.com/uploads/world-map-image-23.png" 
              titleText="1. Select a country of your choice" 
              text="Just click in any country you want to continue on the next step selecting the series of data you want the app to bring you." 
            />
            <MainPageCard
              imgSrc="https://img.icons8.com/?size=100&id=pIIycGakyM76&format=png&color=FFFFFF"
              titleText="2. Try any series of statistics"
              text="Many series of data will be displayed to you; select any of them or try different ones to bring up the data of your choice on your hands"
            />
            <MainPageCard
              titleText="3. Everything&apos;s done!"
              text="You can share or use your data anywhere you want. No restrictions at all of it&apos;s use, enjoy it!"
            />
          </div>
        </section>
        <section className={styles.wdiSection}>
          <h2 className={styles.sectionTitle}>Where does the data come from?</h2>
          <div className={styles.wdiFlex}>
            <p>
              <span>The World Development Indicators (WDI)</span> database is a comprehensive collection of global development data maintained by the World Bank. 
              It provides statistical insights into economic, social, and environmental aspects of development across countries and regions.
            </p>
            <img src="https://landportal.org/sites/default/files/2024-03/WorldBank_Logo_optimized-17.png" />
          </div>
        </section>
        <section className={styles.sectionGradient}>
          <h2 className={styles.sectionTitle}>What can you do with Global Data?</h2>
          <div className={styles.gridSection}>
            <MainPageCardText 
              titleText="Visualize the World Data" 
              text="With Global Data you can visualize the data of any country in the world in a simple and easy way." 
            />
            <MainPageCardText 
              titleText="Save the data you want" 
              text="You can just copy the data you want and paste it in your own system or use it as you want." 
            />
            <MainPageCardText 
              titleText="Use it whenever you want, no restrictions" 
              text="Enjoy your fresh data and use it as you want, no restrictions at all." 
            />
            <MainPageCardText 
              titleText="Share your data to the world" 
              text="Share your data to the world and let them know about it." 
            />
            <MainPageCardText 
              titleText="Save the data in a JSON file" 
              text="Save the data in a JSON file and use it as you want. Just download it in the last step of the app." 
            />
            <MainPageCardText 
              titleText="Use it whenever you want, no restrictions" 
              text="Enjoy your fresh data and use it as you want, no restrictions at all." 
            />
          </div>
        </section>
      </main>
    </>
  );
}
