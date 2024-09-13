// Simulate the fetchAPI function
function fetchAPI(date) {
    let result = [];
    let random = Math.random();
    for (let i = 17; i <= 23; i++) {
      if (random < 0.5) {
        result.push(i + ':00');
      }
      if (random < 0.5) {
        result.push(i + ':30');
      }
    }
    return result;
  }
  
  // Simulate the submitAPI function
  function submitAPI(formData) {
    console.log("Form data submitted:", formData);
    return true; // Simulate a successful submission
  }
  
  // Example usage in your Main component
  import React, { useReducer } from 'react';
  import BookingForm from './BookingForm';
  import BookingSlot from './BookingSlot';
  import './App.css';
  
  const initialState = {
    availableTimes: []
  };
  
  function reducer(state, action) {
    switch (action.type) {
      case 'UPDATE_TIMES':
        return { ...state, availableTimes: fetchAPI(action.payload) };
      default:
        throw new Error();
    }
  }
  
  function Main() {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    function updateTimes(selectedDate) {
      dispatch({ type: 'UPDATE_TIMES', payload: selectedDate });
    }
  
    function submitForm(formData) {
      const result = submitAPI(formData);
      if (result) {
        // Navigate to booking confirmation page
        console.log("Booking confirmed");
      }
    }
  
    return (
      <div>
        <BookingForm availableTimes={state.availableTimes} updateTimes={updateTimes} submitForm={submitForm} />
        <div>
          {state.availableTimes.map(time => (
            <BookingSlot key={time} time={time} />
          ))}
        </div>
      </div>
    );
  }
  
  export default Main;
  