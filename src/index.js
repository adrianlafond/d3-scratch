import './index.css'
import App from './components/app'
import pages from './pages.json'

// Static data files:
import '../public/noise.csv'

const app = new App(pages)

export default { app }
