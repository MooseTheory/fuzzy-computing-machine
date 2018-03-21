<template>
<li class="mdc-list-item">
  <span class="mdc-list-item__graphic">{{ punchText }}</span>
  <span class="timeStamp">{{ formattedTime }}</span>
  <div class="mdc-list-item__meta mdc-chip-set">
    <div class="mdc-chip" ref="deleteChip" tabindex="0" @click="onDelete">
      <i class="material-icons mdc-chip__icon mdc-chip__icon--leading">
        delete_forever
      </i>
      <div class="mdc-chip__text">{{ $t("punch.delete") }}</div>
    </div>
    <div class="mdc-chip" ref="editChip" tabindex="0" @click="onEdit">
      <i class="material-icons mdc-chip__icon mdc-chip__icon--leading">
        mode_edit
      </i>
      <div class="mdc-chip__text">{{ $t("punch.edit") }}</div>
    </div>
  </div>
</li>
</template>

<script>
import { format } from "date-fns";
import { MDCRipple } from "@material/ripple";

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
  },
  mounted() {
    MDCRipple.attachTo(this.$refs.deleteChip);
    MDCRipple.attachTo(this.$refs.editChip);
  }
};
</script>

<style lang="scss" scoped>
@import "@material/list/mdc-list";
@import "@material/chips/mdc-chips";
@import "@material/button/mdc-button";
</style>
