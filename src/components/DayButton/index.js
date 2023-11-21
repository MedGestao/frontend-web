import './styles.css';

const DayButton = ({ key, day, isDaySelected, handleSelectedDays }) => {
  return (
    <div 
      key={key} 
      className={`day ${isDaySelected(day) && "selected-day"}`}
      onClick={() => handleSelectedDays(day)}
    > 
      {day}
    </div>
  );
};


export default DayButton;
