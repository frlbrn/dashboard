import React, {useState, useEffect} from 'react'

function getFormattedDate() {
    const currentDate = new Date()
    let currentLocaleDate = currentDate.toLocaleString('fr-FR',{
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'});
    return currentLocaleDate
}

const CurrentDate = props => {
    const [currentDate, setCurrentDate] = useState(getFormattedDate());
     
    function updateDateIfChanged() {
        const newCurrentDate = (getFormattedDate());
        setCurrentDate(newCurrentDate);
      }

    useEffect(() => {
        const intervalID = setInterval(updateDateIfChanged, 60000);
        return () => clearInterval(intervalID);
      }, []);

    return (
        <span style={{fontVariant:['tabular-nums']}} className="CurrentDate">{currentDate}</span>
      )
}

export default CurrentDate
