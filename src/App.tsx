import './App.css'
import Routes from '~/routes'
import { Link } from 'react-router-dom'

function App() {
  return (
    <>
      <nav>
        <Link to='/problem-2'>Problem 2</Link>
      </nav>
      <Routes />
    </>
  )
}

export default App
