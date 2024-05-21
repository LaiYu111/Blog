import s from './App.module.scss'
import {Route, Routes} from "react-router-dom";
import ArticlePage from "@/pages/ArticlePage/index.jsx";
import AboutPage from "@/pages/AboutPage/index.jsx";
import Header from "@/components/Header/index.jsx";
import Settings from "@/components/Settings/index.jsx";



function App() {

  return (
    <div className={s.layout}>

      <div>
        <Header />
      </div>
      <div>
        <Routes>
          <Route path={'/article'} element={<ArticlePage/>}/>
          <Route path={'/about'} element={<AboutPage/>}/>
        </Routes>
      </div>
      <Settings />
    </div>
  )
}

export default App
