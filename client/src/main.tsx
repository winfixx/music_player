import React, { Suspense, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"
// import useSound from "use-sound"

// import qala from "./assets/Minelli_-_Rampampam_72874060.mp3"
import setupStore from './redux/store'
import { route, routeIsAuth } from './routes'
import Layout from './components/layout/Layout'
import './main.css'

const store = setupStore()

const App: React.FC = () => {
  // const [isPlaying, setIsPlaying] = useState(false)
  // const [play, { pause, duration, sound }] = useSound(qala)
  // const [currTime, setCurrTime] = useState({ min: 0, sec: 0, })
  // const [time, setTime] = useState({ min: 0, sec: 0, })

  // useEffect(() => {
  //   const sec = duration / 1000
  //   const min = Math.floor(sec / 60)
  //   const secRemain = Math.floor(sec % 60)
  //   setTime({
  //     min: min,
  //     sec: secRemain
  //   })
  // }, [])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (sound) {
  //       const min = Math.floor(sound.seek() / 60)
  //       const sec = Math.floor(sound.seek() % 60)
  //       setCurrTime({
  //         min,
  //         sec,
  //       })
  //     }
  //   }, 1000)
  //   return () => clearInterval(interval)
  // }, [sound])

  // const playingButton = () => {
  //   if (isPlaying) {
  //     pause()
  //     setIsPlaying(false)
  //   } else {
  //     play()
  //     setIsPlaying(true)
  //   }
  // }

  return (
    <Routes>
      {routeIsAuth.map(({ path, Element }) =>
        <Route
          key={path}
          path={path}
          element={
            <Layout>
              <Element />
            </Layout>
          }
        />
      )}
      {route.map(({ path, Element }) =>
        <Route
          key={path}
          path={path}
          element={
            <Suspense>
              <Element />
            </Suspense>
          }
        />
      )}
      {/* <Route path='/pleer'
        element={
          <div className="component">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {!isPlaying ? (
                <button className="playButton" onClick={playingButton}>
                  <AiFillPlayCircle size={'3em'} color={"#27AE60"} />
                </button>
              ) : (
                <button className="playButton" onClick={playingButton}>
                  <AiFillPauseCircle size={'3em'} color={"#27AE60"} />
                </button>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <div className="time">
                <p>
                  {currTime.min}:{currTime.sec}
                </p>
                <p>
                  {time.min}:{time.sec}
                </p>
              </div>
              <input type="range"
                min="0"
                max={duration / 1000}
                defaultValue={0}
                className="timeline"
                onChange={(e) => {
                  sound.seek([e.target.value])
                }}
              />
            </div>
          </div>
        }
      /> */}
    </Routes>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
