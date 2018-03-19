<template>
<header class="mdl-layout__header">
  <div class="mdl-layout__header-row">
    <span class="mdl-layout-title">{{ $t('header.title') }}</span>
    <div class="mdl-layout-spacer"></div>
    <app-nav class="mdl-layout--large-screen-only" :links="links"></app-nav>
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
  props: ["links", "pageTitle"]
};
</script>
