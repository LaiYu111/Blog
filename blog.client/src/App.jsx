import {useEffect, useState} from 'react'
import s from './App.module.scss'
import {Route, Routes, useNavigate} from "react-router-dom";
import ArticlePage from "@/pages/ArticlePage/index.jsx";
import AboutPage from "@/pages/AboutPage/index.jsx";
import Header from "@/components/Header/index.jsx";
import {ROUTE} from "@/config.js";


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
    </div>
  )
}

export default App
