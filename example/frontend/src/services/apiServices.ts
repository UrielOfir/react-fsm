import axios from 'axios';

export const elevatorCall = (callingFloor: number, targetFloor: number) => {
  return axios.post("http://localhost:3001/goToFloor", {
    callingFloor,
    targetFloor,
  });
};