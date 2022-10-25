import localforage from "localforage";
import {
  addCigaret,
  getNbrCigaretsFromPast,
  getNbrCigaretsOfToday,
} from "./smokeFunctions";
import { getRecordData, checkNewRecord } from "./recordFunctions";

localforage.config({
  driver: [localforage.INDEXEDDB],
  name: "databac",
  storeName: "tabacData",
});

window.addEventListener("load", () => {
  getRecordData();
  checkNewRecord();
  getNbrCigaretsFromPast(7);
  setTimeout(() => {
    displayDailyStats();
  }, 500);
});

const displayDailyStats = () => {
  document.getElementById("totalSmokedCigarets").innerHTML =
    localStorage.getItem("totalSmokedCigarets");
  document.getElementById("dailyStatsToday").innerHTML =
    localStorage.getItem("nbrCigaretsToday");
  document.getElementById("dailyStatsLastWeek").innerHTML =
    localStorage.getItem(`nbrCigaretsLastWeek`);
};

const smokeBtn = document.getElementById("smokeBtn");

smokeBtn.addEventListener("click", () => {
  addCigaret();
  setTimeout(() => {
    getRecordData();
    getNbrCigaretsOfToday();
    setTimeout(() => {
      displayDailyStats();
    }, 500);
  }, 100);
});
