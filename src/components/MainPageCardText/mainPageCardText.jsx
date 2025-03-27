import styles from "./mainPageCardText.module.css";

export function MainPageCardText({ titleText, text }) {
    return(
        <div className={styles.gridChild}>
                <h3>{titleText}</h3>
                <p>{text}</p>
        </div>
    );
    
}