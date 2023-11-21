import './styles.css';

const TimeButton = ({ key, day, period, isSelected, handleSelected }) => {
  return (
    <div 
      key={key} 
      className={`day ${isSelected(day, period) && "selected-period"}`}
      onClick={() => handleSelected(day, period)}
    > 
      {period}
    </div>
  );
};


export default TimeButton;
