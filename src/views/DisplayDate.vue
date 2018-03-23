<template>
<div v-if="punches.length > 0" class="column">
  <div class="mdc-card">
    <div class="card-primary">
      <h2 class="mdc-typography--title">
        {{ formattedDate }}
      </h2>
    </div>
    <hr class="mdc-list-divider">
    <div class="card-secondary">
      <ul class="mdc-list mdc-list--avatar-list mdc-list--non-interactive">
        <punch
          v-for="(punch, index) in punches"
          :key="index"
          :punch-type="punch.punchType"
          :punch-time="punch.punchTime"
          @delete="doDeletePunch"
          @edit="doEditPunch">
        </punch>
      </ul>
      <hr class="mdc-list-divider">
      <ul class="mdc-list mdc-list--dense mdc-list--non-interactive">
        <li class="mdc-typography--body1 mdc-list-item">
          {{ $t("date.totalHours") }}
          <span class="mdc-list-item__meta">{{ hoursWorked }}</span>
        </li>
        <li class="mdc-typography--body1 mdc-list-item" v-if="timeToEight != 0">
          {{ $t("date.toEight") }}
          <span class="mdc-list-item__meta">{{ timeToEight }}</span>
        </li>
        <li class="mdc-typography--body1 mdc-list-item" v-if="isToday">
          {{ $t("date.quittingTime") }}
          <span class="mdc-list-item__meta">{{ quittingTime }}</span>
        </li>
      </ul>
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
import { mapMutations } from "vuex";

import Punch from "@/views/Punch";

export default {
  name: "DisplayDate",
  components: {
    Punch
  },
  props: ["date"],
  data: function() {
    return {};
  },
  methods: {
    ...mapMutations(["deletePunch"]),
    precisionRound(number, precision) {
      var factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    },
    doDeletePunch(targetDate) {
      this.deletePunch({
        timeStamp: targetDate
      });
    },
    doEditPunch(targetDate) {
      this.$emit("editPunch", targetDate);
    }
  },
  computed: {
    punches() {
      var me = this;
      return this.$store.state.punches.filter(function(value) {
        return isSameDay(me.date, value.punchTime);
      });
    },
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

<style lang="scss" scoped>
@import "@material/button/mdc-button";
@import "@material/card/mdc-card";
@import "@material/list/mdc-list";
@import "@material/typography/mdc-typography";
</style>
