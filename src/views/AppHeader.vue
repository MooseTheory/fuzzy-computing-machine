<template>
<!--
  <section class="hero is-dark">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{ $t('header.title') }}
          Title
        </h1>
        <h2 class="subtitle">
          {{ $t('header.subtitle') }}
          Subtitle
        </h2>
      </div>
    </div>
  </section>
-->
<header class="mdl-layout__header">
  <div class="mdl-layout__header-row">
    <span class="mdl-layout-title">{{ pageTitle }}</span>
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
