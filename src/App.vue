<template>
  <div id="app" class="mdc-typography">
    <app-header
      :links="links"
      :page-title="$t('header.title')"
      @headerMounted="headerMounted"></app-header>
    <main class="mdc-toolbar-fixed-adjust">
      <router-view/>
    </main>
    <app-footer :footer-text="footerText" :author="author"></app-footer>
  </div>
</template>

<script>
import { MDCToolbar } from "@material/toolbar";

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
      footerText: "",
      author: "David Merris"
    };
  },
  methods: {
    headerMounted() {
      var toolbar = MDCToolbar.attachTo(document.querySelector(".mdc-toolbar"));
      toolbar.fixedAdjustElement = document.querySelector(
        ".mdc-toolbar-fixed-adjust"
      );
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700");
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,500");
@import url("https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css");

@import "@material/typography/mdc-typography";

$color1: rgba(4, 8, 15, 1);
$color2: rgba(80, 125, 188, 1);
$color3: rgba(161, 198, 234, 1);
$color4: rgba(187, 209, 234, 1);
$color5: rgba(218, 227, 229, 1);

$mdc-theme-primary: $color2;
$mdc-theme-secondary: $color3;
$mdc-theme-background: $color5;

@import "@material/theme/mdc-theme";
</style>
