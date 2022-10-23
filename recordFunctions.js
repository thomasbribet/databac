import localforage from "localforage";

const updateRecordData = () => {
  let lastCigaret = localStorage.getItem("lastCigaret");
  let newCigaret = new Date().getTime();
  let timeBtwCigarets = parseInt(newCigaret) - parseInt(lastCigaret);
  console.log("diff", timeBtwCigarets);
  console.log("last", lastCigaret);
  console.log("new", newCigaret);
  localforage.getItem("recordData").then((data) => {
    localforage.setItem("recordData", {
      lastCigaret: parseInt(newCigaret),
      record: timeBtwCigarets > data.record ? timeBtwCigarets : data.record,
    });
  });
};

const getRecordData = () => {
  localforage.getItem("recordData").then((data) => {
    if (!data) {
      localforage.setItem("recordData", {
        lastCigaret: 0,
        record: 0,
      });
      getRecordData();
    } else {
      localStorage.setItem("lastCigaret", data.lastCigaret);
      localStorage.setItem("record", data.record);
    }
  });
};

export { updateRecordData, getRecordData };
