<template>
<footer class="mdl-mini-footer">
  <div class="mdl-mini-footer__left-section">
    <div class="mdl-logo">{{ footerText }}</div>
  </div>
</footer>
</template>

<script>
export default {
  name: "AppFooter",
  props: ["footerText"]
};
</script>

<style>
</style>
