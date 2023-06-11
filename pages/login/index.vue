<script>
import { mapState } from 'vuex';
export default {
  layout: "login",
  data() {
    return {
      user: {},
      activeStep: 1,
      username: "",
      password: "",
      loading: false,
    };
  },
  computed: {
    ...mapState(['translations']),
  },
  created() {
    this.$store.dispatch('loadTranslations');
  },
  methods: {
    changeStepStatus() {
      this.activeStep = 2;
    },
    redirect() {
      this.$router.push("/news");
    },
    async handleSubmit() {
      this.loading = true;
      const postData = {
        username: this.username,
        password: this.password,
      };
      await this.$axios
        .post(`/api/auth/signin`, postData)
        .then((res) => {
          localStorage.setItem("loggedIn", true);
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...res.data,
              userRole: res.data.roles[0] === "ROLE_USER" ? 2 : 1,
            })
          );
          this.$store.commit("SET_LOGGEDIN", true);
          this.$store.commit("SET_USER",
            {
              ...res.data,
              userRole: res.data.roles[0] === "ROLE_USER" ? 2 : 1,
            });
          this.redirect();
        })
        .catch((err) => console.error(err))
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<template>
  <client-only>
    <main class="login">
      <loader v-if="loading" />
      <div class="login__welcome">
        <img src="@/assets/images/logo.png" />
        <LanguageSelector />
      </div>
      <h1 class="login__title" :class="{ title_margin: activeStep === 2 }">
        {{ translations.documentWorkflowLabel }}
      </h1>
      <button v-if="activeStep === 1" @click="changeStepStatus" class="login__button">
        {{ translations.welcomeLabel }}
      </button>
      <form v-else class="form" ref="form" @submit.prevent="handleSubmit">
        <label for="text">
          <input type="text" id="email" placeholder="Логин" v-model="username" />
        </label>
        <label for="password">
          <input v-model="password" type="password" id="password" placeholder="Пароль" />
        </label>
        <button type="submit" class="form__button">{{ translations.logInButton }}</button>
      </form>
    </main>
  </client-only>
</template>

<style lang="scss" scoped>
.login {
  max-width: 700px;
  margin: 0 auto;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width:500px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__welcome {
    display: flex;

    margin: 78px 0 154px;

    @media screen and (max-width:1024px) {
      margin: 70px 0 60px;
    }

    @media screen and (max-width:500px) {
      margin: 0 0 40px;
    }

    img {
      width: 231px;
      max-height: 133px;
      height: auto;
      object-fit: cover;
      object-position: center;

      @media screen and (max-width:500px) {
        // margin: 0 0 40px;
        width: 200px;
        max-height: 100px;
      }
    }
  }

  &__title {
    font-style: normal;
    font-weight: 700;
    font-size: 70px;
    line-height: 85px;
    margin-bottom: 62px;

    @media screen and (max-width:1024px) {
      font-size: 48px;
      margin-bottom: 30px;
    }

    @media screen and (max-width:500px) {
      font-size: 32px;
      margin-bottom: 20px;
    }
  }

  .title_margin {
    margin-bottom: 37px;
  }

  &__button {
    cursor: pointer;
    height: 100px;
    background: linear-gradient(180deg, #ffffff 41.67%, #e2dfdf 100%);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border: 1.5px solid #0c0b0b;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    max-width: 300px;
    width: 100%;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    // line-height: 26px;
    color: #0c0b0b;

    @media screen and (max-width:1024px) {

      max-width: 250px;
      font-size: 18px;
      height: 70px;
    }
  }
}

.form {
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width:500px) {
    padding: 0 20px;
  }

  label {
    max-width: 411px;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 37px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

    &:last-of-type {
      margin-bottom: 29px;
    }
  }

  input {
    margin: 0 auto;
    outline: none;
    background: #ffffff;
    border: 1.5px solid #0c0b0b;
    border-radius: 8px;
    height: 50px;
    width: 100%;
    padding-left: 26px;
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 26px;

    &::placeholder {
      color: #ADADAD;
      font-size: 30px;
      font-weight: 600;
    }

    @media screen and (max-width:1024px) {
      font-size: 24px;

      &::placeholder {
        font-size: 24px;
      }
    }

    @media screen and (max-width:500px) {
      font-size: 18px;

      &::placeholder {
        font-size: 18px;
      }
    }

    color: black;
  }

  &__button {
    max-width: 411px;
    width: 100%;
    height: 59px;
    border-radius: 8px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    background: linear-gradient(180deg, #ffffff 41.67%, #e2dfdf 100%);
    border: 1.5px solid #0c0b0b;
    border-radius: 8px;
    cursor: pointer;

    color: #0C0B0B;
    font-size: 30px;
    font-weight: 600;

    @media screen and (max-width:1024px) {
      font-style: 24px;
    }

    @media screen and (max-width:500px) {
      font-size: 18px;
    }
  }
}

.forgot-password {
  margin-top: 37px;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;
  text-decoration: unset;
  color: #0c0b0b;
  cursor: pointer;
}
</style>
