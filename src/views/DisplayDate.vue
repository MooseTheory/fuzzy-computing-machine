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
  <div id="edit-mdc-dialog" class="mdc-dialog" role="dialog" ref="editDialog">
    <div class="mdc-dialog__surface">
      <header class="mdc-dialog__header">
        <h2 id="edit-dialog-label" class="mdc-dialog__header__title">
          {{ $t("editTimeModal.title") }}
        </h2>
      </header>
      <section id="edit-dialog-description" class="mdc-dialog__body">
        EDIT!
      </section>
      <footer class="mdc-dialog__footer">
        <button
            type="button"
            class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel">
          Cancel
        </button>
        <button
            type="button"
            class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept">
          Accept
        </button>
      </footer>
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
import { MDCDialog } from "@material/dialog";

import Punch from "@/views/Punch";

export default {
  name: "DisplayDate",
  components: {
    Punch
  },
  props: ["date"],
  data: function() {
    return {
      dialog: undefined
    };
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
    doEditPunch() {
      if (this.dialog !== undefined) {
        this.dialog.show();
      }
    },
    editConfirm() {
      console.log("Confirm!");
    },
    editCancel() {
      console.log("Cancel!");
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
  },
  mounted() {
    if (this.$refs.editDialog !== undefined) {
      var me = this;
      this.dialog = MDCDialog.attachTo(this.$refs.editDialog);
      this.dialog.listen("MDCDialog:accept", function() {
        me.editConfirm();
      });
      this.dialog.listen("MDCDialog:cancel", function() {
        me.editConfirm();
      });
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
@import "@material/dialog/mdc-dialog";
@import "@material/list/mdc-list";
@import "@material/typography/mdc-typography";
</style>
