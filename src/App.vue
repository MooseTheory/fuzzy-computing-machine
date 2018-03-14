<template>
  <div id="app" class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <app-header :links="links" :page-title="pageTitle"></app-header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">{{ pageTitle }}</span>
      <app-nav :links="links"></app-nav>
    </div>
    <main class="mdl-layout__content">
      <router-view/>
    </main>
    <app-footer :footer-text="footerText"></app-footer>
  </div>
</template>

<script>
import "material-design-lite";
import AppFooter from "@/views/AppFooter";
import AppHeader from "@/views/AppHeader";
import AppNav from "@/views/AppNav";

export default {
  name: "App",
  components: {
    AppFooter,
    AppHeader,
    AppNav
  },
  data: function() {
    return {
      pageTitle: "Time Clock",
      links: [
        {
          to: "/",
          linkText: "Home"
        },
        {
          to: "/about",
          linkText: "About"
        }
      ],
      footerText: "Made by: David Merris"
    };
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://code.getmdl.io/1.2.1/material.blue-red.min.css");
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700");
</style>
