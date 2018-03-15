<template>
<div v-if="punches.length > 0" class="column">
  <div class="mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">
        {{ formattedDate }}
      </h2>
    </div>
    <div class="mdl-card__supporting-text">
      <table class="mdl-data-table mdl-js-data-table">
        <tbody>
          <punch
            v-for="(punch, index) in punches"
            :key="index"
            :punch-type="punch.punchType"
            :punch-time="punch.punchTime">
          </punch>
        </tbody>
      </table>
      <p>Hours worked: {{ hoursWorked }}</p>
      <p v-if="timeToEight != 0">Time to 8 hours: {{ timeToEight }}</p>
      <p v-if="isToday">Quitting time: {{ quittingTime }}</p>
    </div>
    <div class="mdl-card__menu" v-if="isToday">
      <button class="mdl-button
          mdl-js-button
          mdl-button--fab
          mdl-button--mini-fab
          mdl-button--colored">
        <i class="material-icons">add</i>
      </button>
    </div>
  </div>
</div>
</template>

<script>
import {
  differenceInMinutes,
  format,
  isSameDay,
  endOfDay,
  addHours
} from "date-fns";

import Punch from "@/views/Punch";
import data from "@/store/data.js";

export default {
  name: "DisplayDate",
  components: {
    Punch
  },
  props: ["date"],
  data: function() {
    var me = this;
    return {
      punches: data.punches.filter(function(value) {
        return isSameDay(me.date, value.punchTime);
      })
    };
  },
  methods: {
    precisionRound(number, precision) {
      var factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    }
  },
  computed: {
    formattedDate() {
      return format(this.date, "DD MMMM YYYY");
    },
    isToday() {
      return isSameDay(this.date, new Date());
    },
    hoursWorked() {
      var previousPunch = this.punches[0];
      var totalMinutes = 0;
      this.punches.slice(1).forEach(function(currentPunch) {
        if (previousPunch.punchType === "in") {
          if (currentPunch.punchType === "out") {
            totalMinutes += differenceInMinutes(
              currentPunch.punchTime,
              previousPunch.punchTime
            );
            previousPunch = currentPunch;
          }
        } else {
          previousPunch = currentPunch;
        }
      });
      if (previousPunch.punchType === "in") {
        if (isSameDay(new Date(), this.date)) {
          totalMinutes += differenceInMinutes(
            new Date(),
            previousPunch.punchTime
          );
        } else {
          totalMinutes += differenceInMinutes(
            endOfDay(this.date),
            previousPunch.punchTime
          );
        }
      }
      return this.precisionRound(totalMinutes / 60, 2);
    },
    timeToEight() {
      var remaining = 8 - this.hoursWorked;
      return remaining > 0 ? remaining : 0;
    },
    quittingTime() {
      var now = new Date();
      var quittingTime = addHours(now, this.timeToEight);
      return format(quittingTime, "HH:mm");
    }
  }
};
</script>

<style>
table {
  width: 100%;
}
</style>
