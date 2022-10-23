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
const btn = document.getElementById("btn");

window.addEventListener("load", () => {
  getRecordData();
  checkNewRecord();
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
