<template>
<div id="weekView">
  <p>
    {{ $t("weekOf") }}: <span class="date">{{ weekStartDate }}</span>
  </p>
  <div class="mdl-grid">
    <display-date
      v-for="(date, index) in curWeekDates"
      :key="index"
      :date="date" class="mdl-cell mdl-cell--5-col">
    </display-date>
  </div>
</div>
</template>

<script>
import { addDays, format, startOfWeek } from "date-fns";

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
  }
};
</script>

<style>
</style>
