import {useEffect, useRef, useState} from "react";

function TypingAnimation(){
  const [text] = useState("Hello i'm Laiyu Pei")
  const [inputText, setInputText] = useState('')
  const [index, setIndex] = useState(0)
  const ref = useRef(null)

  useEffect( () => {
    const timer = setInterval( () => {
      setInputText( (prevState) => {
        if (prevState.length < text.length) {
          setIndex(index + 1)
          return prevState + text[index]
        }else{
          clearInterval(timer)
          return prevState
        }
      })
    }, 100)

    return () => clearInterval(timer);
  }, [index])

  useEffect(() => {
    ref.current.innerHTML = `<h2>${inputText}_</h2>`;
    if (inputText.length === text.length) {
      ref.current.innerHTML = `<h2>${inputText}</h2>`;
    }
  }, [inputText]);

  return (
    <div ref={(el) => ref.current = el}>

    </div>
  )
}

export default TypingAnimation