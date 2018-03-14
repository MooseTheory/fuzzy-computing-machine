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
      <p>Hours worked</p>
      <p>Time to 8</p>
      <p>Quitting time</p>
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
import { format, isSameDay } from "date-fns";

import Punch from "@/views/Punch";

export default {
  name: "DisplayDate",
  components: {
    Punch
  },
  props: ["date"],
  data: function() {
    return {
      punches: [
        {
          punchTime: new Date(),
          punchType: "in"
        }
      ]
    };
  },
  computed: {
    formattedDate() {
      return format(this.date, "DD MMMM YYYY");
    },
    isToday() {
      return isSameDay(this.date, new Date());
    }
  }
};
</script>

<style>
table {
  width: 100%;
}
</style>
