import localforage from "localforage";

const updateRecordData = () => {
  let lastCigaret = localStorage.getItem("lastCigaret");
  let record = localStorage.getItem("record");
  let newCigaret = new Date().getTime();

  let timeDifference = newCigaret - lastCigaret;

  if (timeDifference > record) {
    localforage.setItem("noSmokeRecord", {
      lastCigaret: newCigaret,
      record: timeDifference,
    });
  } else {
    localforage.setItem("noSmokeRecord", {
      lastCigaret: newCigaret,
      record: record,
    });
  }
};

const getRecordData = () => {
  localforage.getItem("noSmokeRecord").then((details) => {
    if (!details) {
      localforage.setItem("noSmokeRecord", {
        lastCigaret: "",
        record: "",
      });
      getRecordData();
    } else {
      localStorage.setItem("lastCigaret", details.lastCigaret);
      localStorage.setItem("record", details.record);
    }
  });
};

export { updateRecordData, getRecordData };
