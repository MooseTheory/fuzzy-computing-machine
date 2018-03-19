<template>
<tr>
  <td class="mdl-data-table__cell--non-numeric">{{ punchText }}</td>
  <td class="mdl-data-table__cell--non-numeric">{{ formattedTime }}</td>
  <td class="mdl-data-table_-cell--non-numeric">
    <button class="mdl-button mdl-js-button mdl-button--icon" @click="onDelete">
      <i class="material-icons">delete_forever</i>
    </button>
    <button class="mdl-button mdl-js-button mdl-button--icon" @click="onEdit">
      <i class="material-icons">mode_edit</i>
    </button>
  </td>
</tr>
</template>

<script>
import { format } from "date-fns";

export default {
  name: "Punch",
  props: ["punchType", "punchTime"],
  computed: {
    formattedTime() {
      return format(this.punchTime, "HH:mm:ss");
    },
    punchText() {
      return this.punchType === "in"
        ? this.$i18n.t("punch.in")
        : this.$i18n.t("punch.out");
    }
  },
  methods: {
    onDelete: function() {
      this.$emit("delete", this.punchTime);
    },
    onEdit: function() {
      this.$emit("edit", this.punchTime);
    }
  }
};
</script>

<style>
</style>
