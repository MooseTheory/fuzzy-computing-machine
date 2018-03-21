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
        :date="date" class="mdc-layout-grid__cell--span-5">
      </display-date>
    </div>
  </div>
  <button
      class="mdc-fab material-icons app-fab--absolute"
      aria-label="Add">
    <span class="mdc-fab__icon">add</span>
  </button>
</div>
</template>

<script>
import { addDays, format, startOfWeek } from "date-fns";
import { MDCRipple } from "@material/ripple";

import DisplayDate from "@/views/DisplayDate";

export default {
  name: "Week",
  components: {
    DisplayDate
  },
  data: function() {
    return {
      passedDate: this.$route.params.date ? this.$route.params.date : new Date()
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
  mounted() {
    MDCRipple.attachTo(document.querySelector(".app-fab--absolute"));
  }
};
</script>

<style lang="scss" scoped>
@import "@material/layout-grid/mdc-layout-grid";
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
