/**
 * Belépési pont: a React alkalmazás felmountolása a `#root` elembe.
 *
 * Ha a gyökérelem nem található, kivételt dob a könnyebb hibakeresés érdekében.
 */
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App'


/** Gyökér konténer elem lekérdezése. */
const container = document.getElementById('root') as HTMLElement | null // get root container

if (!container)
    throw new Error('Root element with id "root" not found') // hard fail if missing


createRoot(container).render(<App/>)
