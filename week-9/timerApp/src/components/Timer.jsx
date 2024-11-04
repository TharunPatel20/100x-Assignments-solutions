import React, { useEffect, useState } from "react";
import styles from "./Timer.module.css";
import { formatTime, calculateTime } from "../utils/auxiliaryFunctions";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [initialTime, SetInitialTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [editState, setEditState] = useState({ field: null, value: "" });

  return (
    <div className={styles.timerApp}>
      <div className={styles.timerDisplay}>
        <DisplayTime
          time={time}
          initialTime={initialTime}
          isRunning={isRunning}
          editState={editState}
          setTime={setTime}
          SetInitialTime={SetInitialTime}
          setIsRunning={setIsRunning}
          setEditState={setEditState}
        />
      </div>
      <div className={styles.actionButtons}>
        <Buttons
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          SetInitialTime={SetInitialTime}
          setTime={setTime}
        />
      </div>
    </div>
  );
};

function DisplayTime({
  time,
  initialTime,
  isRunning,
  editState,
  setTime,
  SetInitialTime,
  setEditState,
  setIsRunning,
}) {
  const { hours, minutes, seconds } = formatTime(time);

  useEffect(() => {
    const progress =
      initialTime > 0 ? ((initialTime - time) / initialTime) * 100 : 0;
    document.documentElement.style.setProperty("--progress", `${progress}%`);
  }, [time, initialTime]);

  useEffect(() => {
    let interval = null;
    // if the time is not zero and isRunning (timer is not paused) is set to true
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((oldTime) => oldTime - 1);
      }, 1000);
    } //the timer is paused if time reaches zero
    else if (time === 0) {
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time]);

  function handleEditField(field) {
    console.log("handleEditField");
    if (editState.field === field) {
      const newTime = {
        ...formatTime(time),
        [field]: editState.value.padStart(2, "0"),
      };
      const calculatedTime = calculateTime(
        newTime.hours,
        newTime.minutes,
        newTime.seconds
      );
      setTime(calculatedTime);
      SetInitialTime(calculatedTime);
      setEditState({ field: null, value: "" });
    } else {
      setEditState({
        field,
        value: formatTime(time)[field].replace(/^0+/, ""),
      });
      setIsRunning(false);
    }
  }

  function handleInputChange(e) {
    console.log("handleInputChange");
    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
    setEditState((prevState) => ({ ...prevState, value }));
  }

  return (
    <div className={styles.timerCircle}>
      <div className={styles.timerTime}>
        {editState.field === "hours" ? (
          <input
            type="text"
            className={styles.timeInput}
            onChange={handleInputChange}
            onBlur={() => handleEditField("hours")}
            autoFocus
          />
        ) : (
          <span
            className={styles.timeUnit}
            onClick={() => {
              handleEditField("hours");
            }}
          >
            {hours}
          </span>
        )}
        :
        {editState.field === "minutes" ? (
          <input
            className={styles.timeInput}
            type="text"
            value={editState.value}
            onChange={handleInputChange}
            onBlur={() => handleEditField("minutes")}
            autoFocus
          />
        ) : (
          <span
            className={styles.timeUnit}
            onClick={() => handleEditField("minutes")}
          >
            {minutes}
          </span>
        )}
        :
        {editState.field === "seconds" ? (
          <input
            className={styles.timeInput}
            type="text"
            value={editState.value}
            onChange={handleInputChange}
            onBlur={() => handleEditField("seconds")}
            autoFocus
          />
        ) : (
          <span
            className={styles.timeUnit}
            onClick={() => handleEditField("seconds")}
          >
            {seconds}
          </span>
        )}
      </div>
    </div>
  );
}
function Buttons({ isRunning, setIsRunning, setTime, SetInitialTime }) {
  return (
    <>
      <button
        className={styles.actionButton}
        onClick={() => {
          setIsRunning(!isRunning);
          console.log(isRunning);
        }}
      >
        {isRunning === false ? "Start" : "Pause"}
      </button>
      <button
        className={styles.actionButton}
        onClick={() => {
          setIsRunning(false);
          setTime(0);
          SetInitialTime(0);
          console.log(isRunning);
        }}
      >
        {" "}
        {"Reset"}
      </button>
    </>
  );
}
export default Timer;
