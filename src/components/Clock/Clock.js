import React, {useState, useEffect} from 'react'

function getFormattedTime() {
    const date = new Date();
    return date.getHours() + ":" + ('0' + date.getMinutes()).slice(-2) + ":" +  ('0' + date.getSeconds()).slice(-2)
}

const Clock = props => {
    const [currentTime, setTime] = useState(getFormattedTime());
     
    function updateDateIfChanged() {
        const newTime = (getFormattedTime());
        setTime(newTime);
      }

    useEffect(() => {
        const intervalID = setInterval(updateDateIfChanged, 1000);
        return () => clearInterval(intervalID);
      }, []);

    return (
        <span style={{fontVariant:['tabular-nums']}} className="Clock">{currentTime}</span>
      )
}

export default Clock