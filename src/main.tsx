import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App'


/** Gyökér konténer elem lekérdezése. */
const container = document.getElementById('root') as HTMLElement | null // gyökérelem lekérése

if (!container)
    throw new Error('Nem található "root" azonosítójú gyökérelem') // kritikus hiba, ha hiányzik


createRoot(container).render(<App/>)
