import { useState } from 'react'
import s from './App.module.scss'
import {Route, Routes} from "react-router-dom";
import HomePage from "@/pages/HomePage/index.jsx";
import ArticlePage from "@/pages/ArticlePage/index.jsx";
import AboutPage from "@/pages/AboutPage/index.jsx";
import Header from "@/components/Header/index.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={s.layout}>
      <div>
        <Header />
      </div>
      <div>
        <Routes>
          <Route path={'/'} element={<HomePage/>}/>
          <Route path={'/article'} element={<ArticlePage/>}/>
          <Route path={'/about'} element={<AboutPage/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
