import localforage from "localforage";
import { addCigaret } from "./smokeFunctions";
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
});

document.getElementById("totalSmokedCigarets").innerHTML = localStorage.getItem(
  "totalSmokedCigarets"
);

const smokeBtn = document.getElementById("smokeBtn");
smokeBtn.addEventListener("click", () => {
  addCigaret();
  setTimeout(() => {
    updateRecordData();
    setTimeout(() => {
      getRecordData();
    }, 100);
  }, 100);
});
