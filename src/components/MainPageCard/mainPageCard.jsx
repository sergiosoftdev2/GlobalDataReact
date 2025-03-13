import styles from "./mainPageCard.module.css";

export function MainPageCard({ imgSrc, titleText, text }) {

    if(!imgSrc){
        return(
            <div className={styles.gridChild}>
                <div className={styles.childDone}>
                    <div className={styles.searchContainer}></div>
                    <div className={styles.dataContainer}></div>
                </div>
                <h3>{titleText}</h3>
                <p>{text}</p>
            </div>
        )
    }else{
        return(
            <div className={styles.gridChild}>
                <div className={styles.imageChildGrid}>
                    <img src={imgSrc}/>
                </div>
                  <h3>{titleText}</h3>
                  <p>{text}</p>
            </div>
        );
    }
    
}