import s from './index.module.scss'
import projectList from './projectList.json'
import {useEffect, useRef, useState} from "react";
import Button from "@/components/Button/index.jsx";


function Projects(){
  const imgRefs = useRef([])
  const [currentImg, setCurrentImg] = useState(Math.floor(projectList.length / 2))
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const onShown = (index) => {
    if (currentImg >= 0){
      return currentImg === index
    }else{
      return projectList.length + currentImg === index
    }
  }

  useEffect(() => {
    const totalImages = projectList.length;
    const angleStep = 360 / totalImages;

    imgRefs.current.forEach((img, index) => {
      if (img) {
        const rotateYValue = angleStep * (index - currentImg);
        img.style.transform = `rotateY(${rotateYValue}deg) translateZ(35vw)`;

        if (onShown(index)){
          img.style.cursor = 'pointer'
          img.style.transform += `scale(1.3)`
          img.style.filter = 'brightness(1)'
        }else{
          img.style.cursor = 'auto'
          img.style.transform += `scale(0.8)`
          img.style.filter = 'brightness(0.5)'
        }
        console.log(`[Projects]: ${currentImg} Image ${index} transform:`, img.style.transform);
      }
    });
  }, [currentImg]);



  const handleClick = (url, index) => {
    if (onShown(index)) {
      window.open(url)
    }else{
      setCurrentImg(index)
    }
  }

  const handleMouseEnter = (index) => {
    if (!onShown(index)){
      imgRefs.current[index].style.filter = 'brightness(0.9)'
    }
  }

  const handleMouseLeave = (index) => {
    if (!onShown(index)){
      imgRefs.current[index].style.filter = 'brightness(0.5)'
    }
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      setCurrentImg((currentImg + 1) % projectList.length);
    }

    if (touchEndX.current - touchStartX.current > 50) {
      setCurrentImg((currentImg - 1 + projectList.length) % projectList.length);
    }
  };

  return (
    <div className={s.root}>
      <h1 className={s.header}>Projects</h1>

      <div>
        <h2>{projectList[currentImg].name}</h2>
        <div className={s.caption}>{projectList[currentImg].description}</div>
      </div>

      <div
        className={s.container}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={s.content}>
          {projectList.map((project, key) => (
            <img
              key={key} src={project.imagePath}
              className={s.projectImage}
              alt={`Project ${key + 1}`}
              ref={el => imgRefs.current[key] = el}
              onClick={() => handleClick(project.link, key)}
              onMouseEnter={() => handleMouseEnter(key)}
              onMouseLeave={() => handleMouseLeave(key)}
            />
          ))}
        </div>
      </div>

      <div className={s.paginator}>
        <Button onClick={() => setCurrentImg((currentImg - 1) % projectList.length)}>👈</Button>
        {/*{projectList.map((project, key) => (*/}
        {/*  <div key={key}>*/}
        {/*    <Button>{key + 1}</Button>*/}
        {/*  </div>*/}
        {/*))}*/}
        <Button onClick={() => setCurrentImg((currentImg + 1) % projectList.length)}>👉</Button>
      </div>
    </div>
  )
}

export default Projects