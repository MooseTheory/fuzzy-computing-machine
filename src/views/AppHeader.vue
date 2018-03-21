<template>
<header class="mdc-toolbar
    mdc-toolbar--fixed
    mdc-toolbar--waterfall
    mdc-toolbar--flexible
    mdc-toolbar--flexible-default-behavior">
  <div class="mdc-toolbar__row toolbar__row--with-image">
    <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
      <span class="mdc-toolbar__title headerText">{{ $t("header.title") }}</span>
    </section>
  </div>
</header>
</template>

<script>
import AppNav from "@/views/AppNav";

export default {
  name: "AppHeader",
  components: {
    AppNav
  },
  props: ["links", "pageTitle"],
  mounted() {
    this.$emit("headerMounted");
  }
};
</script>

<style lang="scss" scoped>
@import "@material/toolbar/mdc-toolbar";
@import "@material/typography/mdc-typography";

.mdc-toolbar__row:first-child::after {
  background-image: url("../assets/clock.jpeg");
  background-size: cover;
  background-position: center;
}
.headerText {
  color: rgba(0, 0, 0, 0.87);
}
</style>
