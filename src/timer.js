export default function timer(hr , min, sec){
    const radix = 10;
    let hours = parseInt(hr, radix);
    let minutes = parseInt(min, radix);
    let seconds = parseInt(sec, radix);
    if(seconds === 59){
      seconds = 0;
      var minHour = updateMin(minutes , hours);
      return {
        hours: minHour.hour,
        minutes:minHour.minutes,
        seconds
      };
    }else{
      seconds++;
      return {
        hours,
        minutes,
        seconds
      };
    }
  }
  
  function updateMin(min , hour){
    if(min === 59){
      min = 0;
      return {
        minutes : min,
        hour: updateHour(hour)
      };
      }else{
        min++;
        return {
          minutes: min,
          hour
        };
      }
  }
  
  function updateHour(hour){
    if(hour === 23){
      hour = 0;
    } else{
      hour++
    }
    return hour;
  }