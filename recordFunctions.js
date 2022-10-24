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
  let record = localStorage.getItem("record");
  setInterval(() => {
    let now = new Date().getTime();
    let lastCigaret = localStorage.getItem("lastCigaret");
    let timeBtwCigarets = parseInt(now) - parseInt(lastCigaret);

    let timeToNewRecord = parseInt(record) - timeBtwCigarets;

    displayTime(timeToNewRecord, "timeToNewRecord");
  }, 1000);
  displayTime(record, "record");
};

const displayTime = (timeInMs, htmlId) => {
  let days = Math.floor(timeInMs / (86400 * 1000));
  timeInMs -= days * (86400 * 1000);
  let hours = Math.floor(timeInMs / (60 * 60 * 1000));
  timeInMs -= hours * (60 * 60 * 1000);
  let minutes = Math.floor(timeInMs / (60 * 1000));

  if (days > 0) {
    document.querySelector(`#${htmlId} .timeDisplay .days`).innerHTML =
      days + ` ${days > 1 ? "jours" : "jour"}`;
  }
  if (hours > 0) {
    document.querySelector(`#${htmlId} .timeDisplay .hours`).innerHTML =
      hours + " h";
  }
  if (minutes > 0) {
    document.querySelector(`#${htmlId} .timeDisplay .minutes`).innerHTML =
      minutes + " min";
  }
};

export { updateRecordData, getRecordData, checkNewRecord };
