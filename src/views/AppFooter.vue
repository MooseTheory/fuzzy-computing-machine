<template>
<footer class="mdl-mega-footer">
  <div class="mdl-mega-footer__top-section">
    <div v-if="footerText" class="mdl-logo">{{ footerText }}</div>
  </div>
  <div class="mdl-mega-footer__bottom-section">
    <div class="mdl-logo">{{ $t("footer.madeBy") }}: {{ author }}</div>
  </div>
</footer>
</template>

<script>
export default {
  name: "AppFooter",
  props: ["footerText", "author"]
};
</script>

<style>
</style>
