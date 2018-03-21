import { compareAsc, isEqual } from "date-fns";
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
    if (timeStamp instanceof Date) {
      var targetIndex = state.punches.findIndex(function(e) {
        return isEqual(e.punchTime, timeStamp);
      });
      state.punches.splice(targetIndex, 1);
    }
  }
};
