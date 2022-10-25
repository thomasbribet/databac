import localforage from "localforage";
import { updateRecordData } from "./recordFunctions";

let addCigaret = () => {
  if (localStorage.getItem("isSmoking") !== "true") {
    let date = new Date();
    let today = date.toLocaleString("fr-FR", { dateStyle: "full" });
    let now = date.getTime();
    localforage
      .getItem(today)
      .then((todayCigarets) => {
        if (!todayCigarets) {
          localforage.setItem(today, []);
          addCigaret();
        } else {
          todayCigarets.push(now);
          localforage.setItem(today, todayCigarets);
          localStorage.setItem("isSmoking", true);
          document.getElementById("smokeBtn").disabled = true
        }
      })
      .then(() => {
        getLastCigaret(today);
      })
      .then(() => {
        updateRecordData(now);
      });
  }
};

const getLastCigaret = (today) => {
  let lastCigaret;
  let { dayFromPast } = getDateStringFromPast(1);
  let yesterday = dayFromPast;

  // 3 contexts to retrieve the last cigaret smoked:
  localforage.keys().then((keys) => {
    localforage.getItem(today).then((todayCigarets) => {
      if (todayCigarets.length === 1 && keys.length < 3) {
        // If first cigaret ever, no last cigaret yet => assigning value 0
        lastCigaret = 0;
        localStorage.setItem("lastCigaret", lastCigaret);
        return;
      } else if (todayCigarets.length > 1) {
        // If already smoke today, get the last one from today
        lastCigaret = todayCigarets[todayCigarets.length - 2];
        localStorage.setItem("lastCigaret", lastCigaret);
        return;
      } else {
        //If first cigaret of the day, get the last one of yesterday
        localforage.getItem(yesterday).then((yesterdayCigarets) => {
          lastCigaret = yesterdayCigarets[yesterdayCigarets.length - 1];
          localStorage.setItem("lastCigaret", lastCigaret);
        });
      }
    });
  });
};

const getDateStringFromPast = (nbrOfDaysFromNow) => {
  let date = new Date();
  let today = date.toLocaleString("fr-FR", { dateStyle: "full" });
  let dayFromPast = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - nbrOfDaysFromNow
  ).toLocaleString("fr-FR", { dateStyle: "full" });
  return { today, dayFromPast };
};

const getNbrCigaretsOfToday = () => {
  let { today } = getDateStringFromPast(0);
  localforage.getItem(today).then((nbCigaretsToday) => {
    if (nbCigaretsToday) {
      localStorage.setItem("nbrCigaretsToday", nbCigaretsToday.length);
    } else {
      localStorage.setItem("nbrCigaretsToday", 0);
    }
  });
};

const getNbrCigaretsFromPast = (nbrOfDaysFromNow) => {
  let { dayFromPast } = getDateStringFromPast(nbrOfDaysFromNow);
  localforage.getItem(dayFromPast).then((nbrCigaretsDayInPast) => {
    if (nbrCigaretsDayInPast) {
      localStorage.setItem("nbrCigaretsLastWeek", nbrCigaretsDayInPast.length);
    } else {
      localStorage.setItem(`nbrCigaretsLastWeek`, "?");
    }
  });
};

export { addCigaret, getNbrCigaretsFromPast, getNbrCigaretsOfToday };
