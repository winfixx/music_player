import * as React from 'react'
// import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai"
// import useSound from 'use-sound'
// import qala from './assets/Minelli_-_Rampampam_72874060.mp3'



const PlayerTest: React.FunctionComponent = () => {
    // const [isPlaying, setIsPlaying] = React.useState(false)
    // const [play, { pause, duration, sound }] = useSound()
    // const [currTime, setCurrTime] = React.useState({ min: 0, sec: 0, })
    // const [time, setTime] = React.useState({ min: 0, sec: 0, })

    // React.useEffect(() => {
    //     const sec = duration / 1000
    //     const min = Math.floor(sec / 60)
    //     const secRemain = Math.floor(sec % 60)
    //     setTime({
    //         min: min,
    //         sec: secRemain
    //     })
    // }, [])

    // React.useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (sound) {
    //             const min = Math.floor(sound.seek() / 60)
    //             const sec = Math.floor(sound.seek() % 60)
    //             setCurrTime({
    //                 min,
    //                 sec,
    //             })
    //         }
    //     }, 1000)
    //     return () => clearInterval(interval)
    // }, [sound])

    // const playingButton = () => {
    //     if (isPlaying) {
    //         pause()
    //         setIsPlaying(false)
    //     } else {
    //         play()
    //         setIsPlaying(true)
    //     }
    // }

    return (
        <div className="component">
            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
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
            </div> */}
        </div>
    )
}

export default PlayerTest
