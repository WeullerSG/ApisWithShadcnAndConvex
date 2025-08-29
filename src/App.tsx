import './App.css'
import { Routes, Route } from "react-router-dom"
import { Adress } from './componentspage/viaCepApi'
import { Characters } from './componentspage/rickandMortyApi'
import { Home } from './componentspage/home'



function App() {
  return (
    <div className="flex-1 p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Characters" element={<Characters />} />
        <Route path="/adress" element={<Adress />} />
      </Routes>
    </div>
  )
}

export default App
