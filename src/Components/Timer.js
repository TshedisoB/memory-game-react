import React, { useState, useRef, useEffect } from "react";

function Timer(props) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setSeconds((seconds) => {
        if (seconds === 59) {
          setMinutes((minutes) => minutes + 1);
          return 0;
        }
        return seconds + 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    localStorage.setItem("seconds", seconds);
    localStorage.setItem("minutes", minutes);
  }, [minutes, seconds]);

  useEffect(() => {
    if (props.gameComplete) {
      stopTimer();
    }
  }, [props.gameComplete]);

  return (
    <>
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </>
  );
}

export default Timer;
