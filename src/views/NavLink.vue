<template>
  <router-link :to="to" class="mdl-navigation__link">{{ linkText }}</router-link>
</template>

<script>
export default {
  name: "NavLink",
  props: ["to", "linkText"]
};
</script>
