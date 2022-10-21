import localforage from "localforage";

let addCigaret = () => {
  let todayDate = new Date().toLocaleDateString();
  localforage.getItem(todayDate).then((todayCigarets) => {
    if (!todayCigarets) {
      localforage.setItem(todayDate, []);
      addCigaret();
    } else {
      let now = new Date().getTime();
      let record = localStorage.getItem("record")
      todayCigarets.push(now);
      localforage.setItem(todayDate, todayCigarets);
      localforage.setItem("noSmokeRecord", {
        lastCigaret: now,
        record: record === "" ? now : record,
      });
    }
  });
};

export { addCigaret };
