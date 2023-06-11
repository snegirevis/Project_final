<script>
import { mapState } from 'vuex';
import LanguageSelector from '../../components/Language/LanguageSelector.vue';
export default {
  components: { LanguageSelector },
  data() {
    return {
      show: false,
      user: {},
      showType: false,
      selectedApplicationType: null,
      categoryCode: null,
      description: "",
    };
  },
  computed: {
    ...mapState(['translations']),
  },
  async created() {
    this.$store.dispatch('loadTranslations');
  },
  methods: {
    externalClick() {
      this.show = false;
      this.showType = false;
    },
    requestApplication() {
      this.selectedApplicationType
        ? (this.createApplication = true)
        : alert("Выберите тип заявки");
    },
    openReference(id) {
      this.$router.push({ path: "/reference", query: { referenceId: id } })
    },
    switchItemsVisibility() {
      this.show = !this.show;
    },
    filterApplications(sort) {
      this.applications.sort((a, b) => {
        return sort === "new"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt);
      });
    },
  },

};
</script>

<template>
  <div class="settings">
    <h1 class="settings__title">
      {{ translations.settingsLabel }}
    </h1>

    <div class="settings__items">
        <nuxt-link class="settings__item" :to="'/faq'">
          FAQ
        </nuxt-link>
        <language-selector class="lang-switcher"></language-selector>
    </div>
    <div class="settings__socials">
      <h2 class="settings__socials-title">Контакты</h2>
      <ul class="settings__socials-block">
        <li class="settings__socials-link"><a href="reception@iitu.edu.kz" target="_blank"
            class="settings__socials-link">
            <img src="../../assets/images/gmail.svg" alt="gmail" class="settings__socials-img">
          </a></li>
        <li class="settings__socials-link"><a href="https://www.instagram.com/iitu_kz/" target="_blank"
            class="settings__socials-link">
            <img src="../../assets/images/inst.svg" alt="inst" class="settings__socials-img">
          </a></li>
        <li class="settings__socials-link"><a href="https://vk.com/iitu_edu_kz" target="_blank"
            class="settings__socials-link">
            <img src="../../assets/images/vkontakte.svg" alt="vkontakte" class="settings__socials-img">
          </a></li>
        <li class="settings__socials-link"><a href="https://t.me/iitunews" target="_blank"
            class="settings__socials-link">
            <img src="../../assets/images/telegram.svg" alt="telegram" class="settings__socials-img">
          </a></li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lang-switcher {
  position: static;
}
.settings {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 700px;
  height: auto;

  @media screen and (max-width:1200px) {
    font-size: 24px;
  }

  &__title {
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    // line-height: 40px;
    color: #0c0b0b;
    margin-bottom: 34px;

    @media screen and (max-width:1200px) {
      font-size: 24px;
    }

    @media screen and (max-width:500px) {
      font-size: 20px;
    }
  }

  &__socials {
    border-top: 1px solid rgba(18, 18, 29, 0.1);
    padding: 20px 0;
    justify-self: flex-end;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: auto;

    &-block {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0 20px;
    }

    &-title {
      font-family: 'Segoe UI';
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      // line-height: 32px;

      margin-bottom: 15px;
      color: #0C0B0B;
    }
  }

  &__items {
    display: flex;
    justify-content: space-evenly;

    @media screen and (max-width:680px) {
      flex-direction: column;
      gap: 20px 0;
    }
  }

  &__item {
    max-width: 253px;
    width: 100%;
    height: 74px;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.32);
    border-radius: 14px;

    text-decoration: none;
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    // line-height: 32px;
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;
    color: #0C0B0B;

    @media screen and (max-width:680px) {
      max-width: 100%;
    }
  }
}
</style>