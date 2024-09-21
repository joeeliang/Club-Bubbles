import NavbarComponent from './components/NavbarComponent.jsx';
import {MarqueeDemo} from "./components/MarqueeDemo.jsx"
import Cards from "./components/Cards.jsx"
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'

function App() {

  return (
      <div className="tw-bg-gradient-to-r tw-from-blue-950 tw-to-blue-200 tw-min-h-screen tw-w-screen">
          <NavbarComponent/>
          <MarqueeDemo />
          <Cards />
          <Cards />
          <Cards />
      </div>
  )
}

export default App
