<template>
<div>
  <div class="mdc-dialog__surface">
    <header class="mdc-dialog__header">
      <h2 id="edit-dialog-label" class="mdc-dialog__header__title">
        {{ $t("editTimeModal.title") }}
      </h2>
    </header>
    <section id="edit-dialog-description" class="mdc-dialog__body">
      <div class="mdc-text-field mdc-text-field--upgraded" ref="textField">
        <input
          type="text"
          id="timeEdit"
          class="mdc-text-field__input"
          ref="textInput"
          aria-controls="timeEdit-helper-text"
          @input="validateTime"
          @focus="validateTime"
          :value="formattedTime">
        <label class="mdc-floating-label mdc-floating-label--float-above" for="editField">Time</label>
        <div class="mdc-line-ripple" ref="lineRipple"></div>
      </div>
      <p
          id="timeEdit-helper-text"
          class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg"
          aria-hidden="true">
      </p>
    </section>
    <footer class="mdc-dialog__footer">
      <button
          type="button"
          class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel">
        Cancel
      </button>
      <button
          type="button"
          ref="acceptButton"
          @click="onEditTime"
          class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept">
        Accept
      </button>
    </footer>
  </div>
</div>
</template>

<script>
import { MDCRipple } from "@material/ripple";
import { MDCTextField } from "@material/textfield";
import { format } from "date-fns";

export default {
  name: "EditDialog",
  props: ["targetStamp"],
  data: function() {
    return {
      textField: undefined
    };
  },
  methods: {
    onEditTime() {
      if (this.validTime(this.$refs.textInput.value)) {
        this.$emit(
          "editTimeAccept",
          this.parseTime(this.$refs.textInput.value)
        );
      } else {
        this.$emit("editTimeInvalid");
      }
    },
    validateTime() {
      var fieldValue = this.$refs.textInput.value;
      console.log(fieldValue);
      if (!this.validTime(fieldValue)) {
        this.textField.helperTextContent = "Invalid time.";
        this.textField.valid = false;
      } else {
        this.textField.valid = true;
      }
    },
    validTime(stamp) {
      var re = RegExp("([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?");
      return re.test(stamp);
    },
    parseTime(stamp) {
      var re = /([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):?([0-5][0-9])?/g;
      var matches = re.exec(stamp);
      var result = new Date(this.targetStamp.getTime());
      result.setHours(matches[1]);
      result.setMinutes(matches[2]);
      if (matches.length > 3) {
        result.setSeconds(matches[3]);
      }
      return result;
    }
  },
  computed: {
    formattedTime() {
      return format(this.targetStamp, "HH:mm:ss");
    }
  },
  mounted() {
    var ripple = new MDCRipple(this.$refs.lineRipple);
    this.textField = new MDCTextField(this.$refs.textField);
    this.textField.ripple = ripple;
  }
};
</script>

<style lang="scss" scoped>
@import "@material/button/mdc-button";
@import "@material/dialog/mdc-dialog";
@import "@material/textfield/mdc-text-field";
</style>
