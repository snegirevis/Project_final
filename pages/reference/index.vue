<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      loading: false,
      profileInfo: [
        { title: "studentIdTitle", backendKey: "studIIN" },
        { title: "studentIdLabel", backendKey: "userId" },
        { title: "nameLabel", backendKey: "firstname" },
        { title: "surnameLabel", backendKey: "lastname" },
        { title: "facultyLabel", backendKey: "faculty" },
        { title: "studyFormLabel", backendKey: "educationType" },
        { title: "grantLabel", backendKey: "studGrant" },
        { title: "courseLabel", backendKey: "cource" },
        { title: "yearOfAdmissionLabel", backendKey: "yearAdm" },
        { title: "yearOfGraduationLabel", backendKey: "yearGrad" },
      ],
      referenceInfo: null,
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
    this.getApplicationTypes();
    const config = {
      params: {
        username: this.$store.getters.GET_USER.username,
      },
      headers: {
        Authorization: `Bearer ${this.$store.getters.GET_USER.token}`,
      },
    };
    await this.$axios
      .get(`/api/users/me`, config)
      .then((res) => (this.user = res.data))
      .catch((err) => console.error(err));

    await this.$axios
      .get(`/api/doc/${this.$route.query.referenceId}`, config)
      .then((res) => (this.referenceInfo = res.data))
      .catch((err) => console.error(err));
  },
  methods: {
    async getApplicationTypes() {
      const types = await this.$axios.get(`api/doc_categories`, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.GET_USER.token}`,
        },
      });
      console.log('types', types)
      this.applicationTypes = types.data.map((item) => {
        return {
          title: item.name,
          code: item.code,
        };
      });
    },
    switchItemsVisibility() {
      this.show = !this.show;
    },
    filterApplications(sort) {
      this.applications.sort((a, b) => {
        return sort === "new"
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date);
      });
    },
    selectApplicationType(v, i) {
      this.categoryCode = v.code;
      this.selectedApplicationType = v.title;
    },
    openApplicationTypes() {
      this.showType = !this.showType;
    },
    externalClick() {
      this.show = false;
      this.showType = false;
    },
    requestApplication() {
      this.selectedApplicationType
        ? (this.createApplication = true)
        : alert("Выберите тип заявки");
    },
    async openPopup() {
      await this.$axios
        .post(
          "/api/doc",
          {
            category: this.categoryCode,
            id: this.$store.getters.GET_USER.id,
            description: this.description,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.GET_USER.token}`,
            },
          }
        )
        .then((res) => {
          this.showPopup = true;
        })
        .catch((err) => console.error(err))
        .finally(() => { });
    },
    closePopup() {
      this.description = "";
      this.categoryCode = null;
      this.showPopup = false;
      this.createApplication = false;
      this.selectedApplicationType = null;
    },
    async editRef(statusCode) {
      if (this.referenceInfo.id && statusCode) {
        await this.$axios
          .patch("/api/doc/status",
            {
              id: this.referenceInfo.id,
              statusCode: statusCode
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.GET_USER.token}`
              },
            })
          .then(() => {
            this.$router.push({ path: "/applications" })
          })
      } else {
        console.error('Не удалось прочитать статус или ID заявки')
      }
    },
    goBack() {
      this.$router.back();
    }
  },
};
</script>

<template>
  <div class="applications" style="padding-top: 30px;">
    <div v-if="$store.getters.GET_USER.userRole === 1" class="applications__block">
      <div class="manager-tool">
        <button class="go-back-button" @click="goBack()">
          <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.25 18.3333L0 9.99999L6.25 1.66666L7.35938 3.14582L2.21875 9.99999L7.35938 16.8542L6.25 18.3333Z"
              fill="black" />
          </svg>
        </button>
        <button class="manager-tool__btn" v-if="referenceInfo?.status === 'В работе'" @click="editRef('REJECTED')">
          {{ translations.sendForRevisionButton }}
        </button>
        <button class="manager-tool__btn" v-if="referenceInfo?.status === 'В работе'" @click="editRef('CANCELED')">
          {{ translations.rejectButton }}
        </button>
        <button class="manager-tool__btn" v-if="referenceInfo?.status === 'Создано'" @click="editRef('IN_PROGRESS')">
          {{ translations.acceptForProcessingButton }}
        </button>
        <button class="manager-tool__btn" v-if="referenceInfo?.status === 'В работе'" @click="editRef('CLOSED')">
          {{ translations.closeApplicationButton }}
        </button>
      </div>
      <h1 class="applications__title">#{{ referenceInfo?.id }}</h1>
      <h2 class="applications__title">{{ referenceInfo?.category }}</h2>
      <div class="profile__items" v-if="referenceInfo">
        <div class="profile__item" v-for="(item, index) in profileInfo" :key="index">
          <p>
            {{ translations[item.title] }}:<span>{{ referenceInfo[item.backendKey] }}</span>
          </p>
        </div>
      </div>
      <div class="profile__commentaries">
        <h3>{{ translations.commentsLabel }}</h3>
        <div class="profile__comment">
          <span v-if="!referenceInfo?.description.trim()">
            {{ translations.noCommentsLabel }}
          </span>
          <span v-else>
            {{ referenceInfo.description }}
          </span>
        </div>
      </div>
    </div>
    <div v-else class="applications__student">
      <div class="profile" v-if="referenceInfo">
        <h2 class="profile__title">{{ referenceInfo.category }} #{{ referenceInfo.id }}</h2>
        <div class="profile__items">
          <div class="profile__item" v-for="(item, index) in profileInfo" :key="index">
            <p>
              {{ translations[item.title] }}:<span>{{ referenceInfo[item.backendKey] }}</span>
            </p>
          </div>
        </div>
        <div class="profile__commentaries">
          <h3>{{ translations.commentsLabel }}</h3>
          <div class="profile__comment">
            <span v-if="!referenceInfo.description.trim()">
              {{ translations.noCommentsLabel }}
            </span>
            <span v-else>
              {{ referenceInfo.description }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.go-back-button {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  cursor: pointer;
  margin-right: auto;
}

h1 {
  margin-bottom: 22px;
}

.manager-tool {
  width: 100%;
  display: flex;
  margin-left: auto;
  margin-bottom: 50px;
  gap: 20px;

  @media screen and (max-width:650px) {
    flex-direction: column;
  }

  &__btn {
    cursor: pointer;
    padding: 8px 13px;
    border: 0;
    background-color: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.408px;
    color: #000000;
  }
}

.applications {
  display: flex;
  padding-bottom: 50px;

  &__block {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    max-width: 1048px;
  }

  &__filter {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__title {
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    // line-height: 45px;
    color: #0c0b0b;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    @media screen and (max-width:1200px) {
      font-size: 30px;
    }

    @media screen and (max-width:500px) {
      font-size: 28px;
      text-align: center;
    }


  }

  &__items {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 75px;
    width: 100%;
  }

  &__item {
    max-width: 784px;
    width: 100%;
    background: white;
    border-radius: 8px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.32);

    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 14px 23px 30px 52px;

    margin-bottom: 47px;

    p {
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 32px;
      color: #0c0b0b;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;

      span {
        margin-bottom: 14px;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 27px;
        color: #0c0b0b;
      }

      h6 {
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        color: #0c0b0b;
      }
    }

    span {
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 27px;
      color: #939393;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &__button {
    width: 295px;
    height: 59px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    color: #0c0b0b;
    background: linear-gradient(180deg, #ffffff 43.75%, #e2dfdf 100%);
    border: 1.5px solid #0c0b0b;
    border-radius: 8px;
    cursor: pointer;
  }

  &__student {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__step1 {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}

.search {
  display: flex;
  align-items: center;
}

.filter {
  display: flex;
  flex-direction: column;

  margin-right: 44px;

  position: relative;

  &__title {
    cursor: pointer;
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.408px;
    color: #000000;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    display: flex;
    align-items: center;
  }

  svg {
    margin-left: 3px;
  }

  &__items {
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 150px;
    background: white;
    border-radius: 6px;
    padding: 14px 6px;

    position: absolute;
    top: 100%;
    left: 8%;
  }

  &__item {
    cursor: pointer;
    margin-bottom: 6px;

    &:last-of-type {
      margin-top: 6px;
      margin-bottom: 0;
    }
  }
}

.line {
  width: 100%;
  border-bottom: 1px solid black;
}

.selector {
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 433px;
  width: 100%;
  border-radius: 8px;
  margin: 64px 0 78px;

  &__selected {
    cursor: pointer;
    width: 433px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #ffffff 41.67%, #e2dfdf 100%);
    border: 1.5px solid #0c0b0b;
    border-radius: 8px;
    padding: 11px 0;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 40px;
    color: #0c0b0b;

    svg {
      margin-left: 8px;
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background: white;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 23px 28px 17px;
  }

  &__item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid black;
    padding: 10px 0;
    width: 100%;

    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 40px;
    color: #0c0b0b;

    &:last-of-type {
      border-bottom: unset;
    }
  }
}

.reveal {
  transform: rotate(-180deg);
  animation-name: reveal;
  animation-duration: 0.4s;

  @keyframes reveal {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-180deg);
    }
  }

  path {
    fill: gray;
  }
}

.closed {
  animation-name: closed;
  animation-duration: 0.4s;

  @keyframes closed {
    0% {
      transform: rotate(180deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }
}

.profile {
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;

  &__title {
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    // line-height: 45px;
    color: #0c0b0b;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    @media screen and (max-width:1200px) {
      font-size: 30px;
    }

    @media screen and (max-width:500px) {
      font-size: 28px;
      text-align: center;
    }

    &__comment {
      span {
        font-family: 'Segoe UI';
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 32px;

        color: #060606;

        @media screen and (max-width:1200px) {
          font-size: 22px;
        }

        @media screen and (max-width:500px) {
          font-size: 18px;
          text-align: center;
        }
      }
    }
  }

  &__commentaries {
    margin: 25px auto 0 0;

    h3 {
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;

      color: #060606;
    }
  }


  &__items {
    display: grid;
    grid-template-columns: 2fr 1fr;
    justify-content: space-between;
    grid-gap: 20px;

    margin-top: 120px;

    @media screen and (max-width:501px) {
      margin-top: 50px;
      // flex-direction: column;
      // align-items: flex-start;
      grid-template-columns: 1fr;
    }

  }

  &__item {
    display: flex;
    align-items: center;


    p {
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      // line-height: 32px;
      color: #0c0b0b;

      @media screen and (max-width:1200px) {
        font-size: 20px;
      }

      @media screen and (max-width:500px) {
        font-size: 18px;
      }
    }

    span {
      font-weight: 400;
      font-size: 21px;
      margin-left: 8px;
      line-height: 25px;

      @media screen and (max-width:1200px) {
        font-size: 20px;
      }

      @media screen and (max-width:500px) {
        font-size: 18px;
      }
    }
  }

  &__button {
    margin-top: 68px;
    width: max-content;
    max-width: 100%;
    padding: 0 20px;
    height: 60px;
    border-radius: 4px;
    background: white;
    border: unset;
    cursor: pointer;

    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 32px;
    color: #0c0b0b;
  }
}

.popup {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;

    max-width: 400px;
    width: 100%;
    border-radius: 4px;
    padding: 29px 16px;

    h4 {
      font-style: normal;
      font-weight: 600;
      font-size: 26px;
      line-height: 35px;
      text-align: center;
      color: #0c0b0b;
    }

    button {
      background: linear-gradient(180deg, #ffffff 43.75%, #e2dfdf 100%);
      border: 1.5px solid #0c0b0b;
      border-radius: 8px;
      margin-top: 40px;
      width: 90px;
      height: 41px;
      cursor: pointer;
    }
  }
}
</style>
