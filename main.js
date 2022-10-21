import localforage from "localforage";
import { addCigaret } from "./smokeFunctions";
import { updateRecordData, getRecordData } from "./recordFunctions";

localforage.config({
  driver: [localforage.INDEXEDDB],
  name: "databac",
  storeName: "tabacData",
});

// const filterHour = () => {
//   let today = new Date().toLocaleDateString();
//   localforage.getItem(today).then((todayHoursSmoke) => {
//     let whenSmoking = new Date();
//     let nbrCigThisHour = todayHoursSmoke.filter((hour) => {
//       return hour.getHours() === whenSmoking.getHours();
//     }).length;
//     // console.log(nbrCigThisHour);
//   });
// };
const btn = document.getElementById("btn");

window.addEventListener("load", () => {
  getRecordData();
});

btn.addEventListener("click", () => {
  addCigaret();
  setTimeout(() => {
    updateRecordData();
    setTimeout(() => {
      getRecordData();
    }, 100);
  }, 100);
});
