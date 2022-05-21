import React from 'react'
import "./Pomodoro.css";
import Play from './assets/play.png'
import Pause from './assets/pause.png'
import Reset from './assets/reset.png'
import Up from './assets/up.png'
import Down from './assets/down.png'

function Pomodoro() {
    const [displayTime, setDisplayTime] = React.useState(5)
    const [breakTime, setBreakTime] = React.useState(4)
    const [sessionTime, setSessionTime] = React.useState(5)
    const [timerOn, setTimerOn] = React.useState(false)
    const [onBreak, setOnBreak] = React.useState(false)
    const [breakAudio, setBreakAudio] = React.useState(new Audio("./assets/ring.mp3"))

    const playBreakSound = () => {
        breakAudio.currentTime = 0;
        breakAudio.play();
    }

    const formatTime = (time) => {
        let minutes = Math.floor(time/60)
        let seconds = time % 60
        return(
            (minutes < 10 ? "0" + minutes : minutes) +
                ":" +
            (seconds < 10 ? "0" + seconds : seconds)
        )
    }

    const changeTime = (amount, type) => {
        if(type === "break"){
            if(breakTime <= 60 && amount < 0){
                return
            }
            setBreakTime((prev) => prev + amount);
        }else if (type === "session"){
            if(sessionTime <= 60 && amount < 0){
                return
            }
            setSessionTime((prev) => prev + amount)
            if(!timerOn){
                setDisplayTime(sessionTime + amount)
            }
        }
    }

    const controlTime = () => {
        let second = 1000;
        let date = new Date().getTime();
        let nextDate = new Date().getTime() + second;
        let onBreakVariable = onBreak;

        if(!timerOn){
            let interval = setInterval(() => {
                date = new Date().getTime();
                if(date > nextDate){
                    setDisplayTime((prev) => {
                        if(prev <= 0 && !onBreakVariable){
                            playBreakSound()
                            onBreakVariable = true;
                            setOnBreak(true)
                            return breakTime
                        }else if(prev <= 0 && onBreakVariable){
                            playBreakSound()
                            onBreakVariable= false;
                            setOnBreak(false)
                            return sessionTime;
                        }
                        return prev - 1;
                    })
                    nextDate += second
                }
            }, 30)
            localStorage.clear()
            localStorage.setItem("interval-id", interval)
        }
        if(timerOn){
            clearInterval(localStorage.getItem("interval-id"))
        }
        setTimerOn(!timerOn)
    }

    const resetTime = () => {
        setDisplayTime(25*60)
        setBreakTime(5*60)
        setSessionTime(25*60)
    }

    return (
        <div className="pomodoro">
            <div className="pomodoro-timer">
                <h3 className="status">{onBreak ? "Break" : "Pomodoro"}</h3>
                <div className="sets">
                <Length title = {"Session Length"} changeTime = {changeTime} type={"session"} time={sessionTime} formatTime={formatTime} />
                <Length title = {"Break Length"} changeTime = {changeTime} type={"break"} time={breakTime} formatTime={formatTime} />
                </div>
                <h1 className="timer">{formatTime(displayTime)}</h1>
                <div className="start-stop-reset">
                    <button className='' onClick={controlTime}>
                        {timerOn ?
                            (<img src={Pause} alt="stop" className="stop"/>)
                            :
                            (<img src={Play} alt="start" className="start"/>)
                        }
                    </button>
                    <button onClick={resetTime}>
                        <img src={Reset} alt="reset" className="reset"/>
                    </button>
                </div>
            </div>
            <p className="motivation">Time to Focus!!</p>
        </div>
    );
}

function Length({title, changeTime, type, time, formatTime }){
    return (
        <div className='length-sets'>

                <h3 className='length-sets-heading'>{title}</h3>
                <div className="time-sets">
                    <button>
                        <img onClick={() => changeTime(-60, type)} src={Down} alt="down" className="down-arrow"/>
                    </button>
                    <h3>{formatTime(time)}</h3>
                    <button>
                        <img onClick={() => changeTime(60, type)} src={Up} alt="up" className="up-arrow"/>
                    </button>
                </div>
            </div>
    );
}

export default Pomodoro;
