<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      showStaticComponent: true
    };
  },
  created() {
    this.showStaticComponent = this.$router.currentRoute.name !== 'reference';
  },
  watch: {
    $route(newRoute, oldRoute) {
      this.showStaticComponent = (newRoute.name !== 'reference');
    }
  }
};
</script>

<template>
  <client-only>
    <main class="main">
      <div class="main__container">
        <NavBar />
        <InputSearch v-if="showStaticComponent" />
        <Nuxt />
      </div>
    </main>
  </client-only>
</template>

<style lang="scss" scoped>
.main {
  &__container {
    margin: 0 auto;
    padding: 60px 20px 0 400px;
    width: 100%;
    @media screen and (max-width: 1200px) {
      padding: 60px 20px 0;
    }
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: unset;
}

button {
  cursor: pointer;
}

input {
  outline: none;
}</style>
