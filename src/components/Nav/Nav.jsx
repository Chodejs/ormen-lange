import { devLog } from '../../Cfunc/app';
import styles from './Nav.module.css';

export default function Nav() {

    const links = [
        { id: 1, title: 'Home', path: '/' },
        { id: 2, title: 'About', path: '/about' },
        { id: 3, title: 'Contact', path: '/contact' },
    ];

    devLog('Nav Component Mounted');

    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                {links.map(link => (
                    <li key={link.id} className={styles.navItem}>
                        <a href={link.path} className={styles.navLink}>
                            {link.title}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}