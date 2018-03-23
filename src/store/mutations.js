import { compareAsc, isEqual, parse } from "date-fns";
import { initialPunches } from "./data";

export const state = {
  punches: initialPunches.punches
};

export const mutations = {
  newPunch(state, { timeStamp, type }) {
    if (timeStamp instanceof Date) {
      var p = {
        punchTime: timeStamp,
        punchType: type
      };
      state.punches.push(p);
      state.punches.sort(function(a, b) {
        return compareAsc(a.punchTime, b.punchTime);
      });
    }
  },
  deletePunch(state, { timeStamp }) {
    var parsedStamp = parse(timeStamp);
    var targetIndex = state.punches.findIndex(function(e) {
      return isEqual(parse(e.punchTime), parsedStamp);
    });
    state.punches.splice(targetIndex, 1);
  },
  editPunch(state, { oldStamp, newStamp }) {
    var targetIndex = state.punches.findIndex(function(e) {
      return isEqual(parse(e.punchTime), oldStamp);
    });
    var punchType = state.punches[targetIndex].punchType;
    state.punches.splice(targetIndex, 1);
    state.punches.push({
      punchTime: newStamp,
      punchType: punchType
    });
    state.punches.sort(function(a, b) {
      return compareAsc(a.puncTime, b.punchTime);
    });
  }
};
