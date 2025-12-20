import styles from './Main.module.css';

// Now accepts 'children', which will be our Route content
export default function Main({ children }) {
    return (
        <main className={styles.main}>
            {children}
        </main>
    )
}