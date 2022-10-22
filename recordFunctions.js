import localforage from "localforage";

const updateRecordData = () => {
  let lastCigaret = localStorage.getItem("lastCigaret")
  let newCigaret = new Date().getTime();
  let timeBtwCigarets = parseInt(newCigaret) - parseInt(lastCigaret);
  console.log("diff", timeBtwCigarets);
  localforage.getItem("recordData").then((data) => {
    if(timeBtwCigarets > data.record) {
      localforage.setItem("recordData",)
    }

  })
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
