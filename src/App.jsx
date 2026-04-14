import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './App.css'
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

function App() {
  const boxRef = useRef(null)

  useEffect(() => {
    if (boxRef.current) {

      gsap.to(boxRef.current, {
        rotation: 360,
        duration: 2,

      scrollTrigger: {
      trigger: boxRef.current,
      start: "top 80%"
  }
})


    }
  }, [])

  return (
    <main style={{ height: "200vh", padding: "50px" }}>
      <h1>React + GSAP Starter</h1>
      <div ref={boxRef} className="box">
        Animate me with GSAP
      </div>
    </main>
  )
}


export default App
