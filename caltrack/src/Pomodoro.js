import React from "react";
import "./Pomodoro.css";

function Pomodoro() {
    return (
        <div className="pomodoro">
            <div className="pomodoro-timer">
                <h3 className="status">Break</h3>
                <h1 className="timer">25:00</h1>
                <h3 className="start-stop">START</h3>
            </div>
            <p className="motivation">Time to Focus!!</p>
        </div>
    );
}

export default Pomodoro;
