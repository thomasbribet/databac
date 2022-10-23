import localforage from "localforage";

const updateRecordData = () => {
  let lastCigaret = localStorage.getItem("lastCigaret");
  let newCigaret = new Date().getTime();
  let timeBtwCigarets = parseInt(newCigaret) - parseInt(lastCigaret);
  localforage.getItem("recordData").then((data) => {
    if (!data.totalSmokedCigarets) {
      localforage.setItem("recordData", {
        lastCigaret: parseInt(newCigaret),
        record: parseInt(newCigaret),
        totalSmokedCigarets: 1,
      });
      return;
    }
    if (data.totalSmokedCigarets === 1) {
      localforage.setItem("recordData", {
        lastCigaret: parseInt(newCigaret),
        record: timeBtwCigarets,
        totalSmokedCigarets: data.totalSmokedCigarets + 1,
      });
      return;
    }
    localforage.setItem("recordData", {
      lastCigaret: parseInt(newCigaret),
      record: timeBtwCigarets > data.record ? timeBtwCigarets : data.record,
      totalSmokedCigarets: data.totalSmokedCigarets + 1,
      isNewRecord: timeBtwCigarets > data.record ? true : false,
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
      localStorage.setItem("totalSmokedCigarets", data.totalSmokedCigarets);
    }
  });
};

const checkNewRecord = () => {
  setInterval(() => {
    let now = new Date().getTime()
    let lastCigaret = localStorage.getItem("lastCigaret")
    let timeBtwCigarets = parseInt(now) - parseInt(lastCigaret)

    let record = localStorage.getItem("record")
    let timeToNewRecord = parseInt(record) - timeBtwCigarets
  }, 1000)
}

export { updateRecordData, getRecordData, checkNewRecord };
