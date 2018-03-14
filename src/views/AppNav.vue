<template>
<nav id="nav" class="mdl-navigation">
  <nav-link
    v-for="(link, index) in links"
    :key="index"
    :to="link.to"
    :link-text="link.linkText">
  </nav-link>
</nav>
</template>

<script>
import NavLink from "@/views/NavLink";

export default {
  name: "AppNav",
  components: {
    NavLink
  },
  props: ["links"]
};
</script>
