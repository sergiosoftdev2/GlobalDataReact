import styles from "./page.module.css";
import Link from "next/link";



export default function Home() {
  return (
    <main>
      <section className={styles.heroSection}>
        <div className={`${styles.heroInfo} ${styles.half}`}>
          <h1>Global Data</h1>
          <p>Be ready to explore all world data in just a flew clicks. With Global Data you will be able to visualize the most important statistics of any country in the world.</p>
          <div className={styles.botones}>
            <Link href="" className={styles.botonProbar}>Try now!</Link>
            <Link href="">How does it work?</Link>
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
      <section className={styles.sectionGradient}>
        <h2 className={styles.sectionTitle}>How does it work?</h2>
        <p>
          Make visualizing any statistics much easier with Global Data. 
          The app collects information from a database provided by World Data Indicators and displays the information in an easy way to understand it.
          Also, it provides all the information in text so you can copy it and download it in your own system.
        </p>
        <div className={styles.gridSection}>
        <div className={styles.gridChild}>
            <div className={styles.imageChildGrid}>
              <img src="https://www.freeiconspng.com/uploads/world-map-image-23.png"/>
            </div>
            <h3>1. Select a country of your choice</h3>
            <p>Just click in any country you want to continue on the next step selecting the series of data you want the app to bring you.</p>
          </div>
          <div className={styles.gridChild}>
            <div className={styles.imageChildGrid}>
              <img src="https://img.icons8.com/?size=100&id=pIIycGakyM76&format=png&color=FFFFFF"/>
            </div>
            <h3>2. Try any series of statistics</h3>
            <p>Many series of data will be displayed to you; select any of them or try different ones to bring up the data of your choice on your hands</p>
          </div>
          <div className={styles.gridChild}>
            <div className={styles.imageChildGrid}>
              <div className={styles.childDone}>
                <div className={styles.searchContainer}></div>
                <div className={styles.dataContainer}></div>
              </div>
            </div>
            <h3>3. Everything's done!</h3>
            <p>You can share or use your data anywhere you want. No restrictions at all of it's use, enjoy it!</p>
          </div>
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
    </main>
  );
}
