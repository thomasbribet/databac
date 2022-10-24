import localforage from "localforage";
import {
  addCigaret,
  getNbrCigaretsFromPast,
  getNbrCigaretsOfToday,
} from "./smokeFunctions";
import {
  updateRecordData,
  getRecordData,
  checkNewRecord,
} from "./recordFunctions";

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
    document.getElementById("totalSmokedCigarets").innerHTML =
      localStorage.getItem("totalSmokedCigarets");
    displayDailyStats();
  }, 500);
});

const displayDailyStats = () => {
  document.getElementById("dailyStatsToday").innerHTML =
    localStorage.getItem("nbrCigaretsToday");
  document.getElementById("dailyStatsLastWeek").innerHTML =
    localStorage.getItem(`nbrCigaretsLastWeek`);
};

const smokeBtn = document.getElementById("smokeBtn");
smokeBtn.addEventListener("click", () => {
  addCigaret();
  setTimeout(() => {
    updateRecordData();
    setTimeout(() => {
      getRecordData();
      getNbrCigaretsOfToday()
      setTimeout(() => {
        document.getElementById("totalSmokedCigarets").innerHTML =
          localStorage.getItem("totalSmokedCigarets");
        displayDailyStats();
      }, 500);
    }, 100);
  }, 100);
});
