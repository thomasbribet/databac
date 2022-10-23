import localforage from "localforage";

let addCigaret = () => {
  let today = new Date().toLocaleString("fr-FR", { dateStyle: "full" });
  localforage
    .getItem(today)
    .then((todayCigarets) => {
      if (!todayCigarets) {
        localforage.setItem(today, []);
        addCigaret();
      } else {
        let now = new Date().getTime();
        todayCigarets.push(now);
        localforage.setItem(today, todayCigarets);
      }
    })
    .then(() => {
      getLastCigaret(today);
    });
};

const getLastCigaret = (today) => {
  let lastCigaret;
  let date = new Date();
  let yesterday = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - 1
  ).toLocaleString("fr-FR", { dateStyle: "full" });

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

export { addCigaret };
