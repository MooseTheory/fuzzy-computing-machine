<template>
<div id="weekView">
  <span class="mdc-typography--title">
    {{ $t("weekOf") }}: <span class="date">{{ weekStartDate }}</span>
  </span>
  <div class="mdc-layout-grid">
    <div class="mdc-layout-grid__inner">
      <display-date
        v-for="(date, index) in curWeekDates"
        :key="index"
        :date="date" class="mdc-layout-grid__cell--span-5"
        @editPunch="doEditPunch">
      </display-date>
    </div>
  </div>
  <button
      class="mdc-fab material-icons app-fab--absolute"
      aria-label="Add"
      @click="createNewPunch">
    <span class="mdc-fab__icon">add</span>
  </button>
  <div id="edit-mdc-dialog" class="mdc-dialog" role="dialog" ref="editDialog">
    <edit-dialog
        ref="editDialog"
        :targetStamp="editStamp"
        @editTimeAccept="editConfirm"
        @editTimeInvalid="editInvalid">
    </edit-dialog>
  </div>
</div>
</template>

<script>
import { addDays, format, isEqual, parse, startOfWeek } from "date-fns";
import { MDCDialog } from "@material/dialog";
import { MDCRipple } from "@material/ripple";
import { mapGetters, mapMutations } from "vuex";

import DisplayDate from "@/views/DisplayDate";
import EditDialog from "@/views/EditDialog";

export default {
  name: "Week",
  components: {
    DisplayDate,
    EditDialog
  },
  data: function() {
    return {
      dialog: undefined,
      passedDate: this.$route.params.date
        ? this.$route.params.date
        : new Date(),
      editStamp: new Date()
    };
  },
  computed: {
    weekStartDate() {
      return format(startOfWeek(this.passedDate), "DD MMMM YYYY");
    },
    curWeekDates() {
      var weekStart = startOfWeek(this.passedDate);
      var weekDates = [];
      weekDates.push(weekStart);
      for (var i = 1; i < 7; i++) {
        var nextDate = addDays(weekStart, i);
        weekDates.push(nextDate);
      }
      return weekDates;
    }
  },
  methods: {
    ...mapGetters(["lastPunchType"]),
    ...mapMutations(["newPunch", "editPunch"]),
    createNewPunch() {
      this.newPunch({
        timeStamp: new Date(),
        type: this.lastPunchType() === "in" ? "out" : "in"
      });
    },
    doEditPunch(timeStamp) {
      if (typeof timeStamp === Date) {
        this.editStamp = timeStamp;
      } else {
        this.editStamp = parse(timeStamp);
      }
      if (this.dialog !== undefined) {
        this.dialog.show();
      } else {
        if (this.$refs.editDialog !== undefined) {
          var me = this;
          this.dialog = MDCDialog.attachTo(this.$refs.editDialog);
          this.dialog.listen("MDCDialog:cancel", function() {
            me.editCancel();
          });
        }
        this.dialog.show();
      }
    },
    editConfirm(newTime) {
      var oldTime = this.editStamp;
      if (!isEqual(newTime, this.editStamp)) {
        this.editPunch({
          oldStamp: oldTime,
          newStamp: newTime
        });
      }
    },
    editCancel() {
      console.log("Cancel!");
    },
    editInvalid() {
      console.log("Edit was not valid.");
    }
  },
  mounted() {
    MDCRipple.attachTo(document.querySelector(".app-fab--absolute"));
    if (this.$refs.editDialog !== undefined) {
      var me = this;
      this.dialog = MDCDialog.attachTo(this.$refs.editDialog);
      this.dialog.listen("MDCDialog:cancel", function() {
        me.editCancel();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@material/layout-grid/mdc-layout-grid";
@import "@material/dialog/mdc-dialog";
@import "@material/fab/mdc-fab";

.app-fab--absolute {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}

@media (min-width: 1024px) {
  .app-fab--absolute {
    bottom: 1.5rem;
    right: 1.5rem;
  }
}
</style>
