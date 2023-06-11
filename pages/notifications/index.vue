<script>
import { mapState } from 'vuex';
import moment from "moment";
export default {
  data() {
    return {
      moment: moment,
      archieve: [],
      applicationTypes: [
        { title: "Транскрипт" },
        { title: "Справка с места учебы" },
        { title: "Справка о наличии гранта" },
        { title: "Лист перезачета кредитов" },
      ],
      show: false,
      showType: false,
      selectedApplicationType: null,
    };
  },
  computed: {
    ...mapState(['translations']),
  },
  async created() {
    this.$store.dispatch('loadTranslations');
    
    let apiEndpoint = "/api/msg";

    await this.$axios
      .get(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.GET_USER.token}`,
        },
      })
      .then((res) => {
        this.archieve = res.data;
        console.log('this.archieve', this.archieve)
      })
      .catch((err) => console.error(err));
  },
  methods: {
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
    searchApplications(val) {
      console.log(val);
      //     this.applications.filter((item) => {
      //         if (
      //             item.title.includes(val.toLowerCase()) ||
      //             item.title.includes(val.toUpperCase) ||
      //             item.title.includes(val)
      //         ) {
      //             return item;
      //         }
      //     });
    },
    selectApplicationType(v, i) {
      this.selectedApplicationType = v.title;
    },
    openApplicationTypes() {
      this.showType = !this.showType;
    },
    externalClick() {
      this.show = false;
      this.showType = false;
    },
    openReference(id) {
      this.$router.push({ path: "/reference", query: { referenceId: id } })
    }
  },
};
</script>

<template>
  <div class="applications">
    <div class="applications__block">
      <div class="applications__filter">
        <h2 class="applications__title">{{ translations.notification }}</h2>
      </div>
      <div class="applications__items">
        <div v-for="item in archieve" :key="item.id" class="applications__item">
          <div class="applications__item-wrapper">
            <div class="applications__item-date">
              {{ item.createdTime.split(' ')[0] }}
            </div>
            <h6 class="applications__item-category">{{ item.message }}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
    width: 100%;
    text-align: left;
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 45px;
    color: #0c0b0b;

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
    padding: 14px 23px 30px 52px;
    margin-bottom: 47px;

    @media screen and (max-width:500px) {
      padding:20px;
    }

    &-date {
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 32px;
      color: #0c0b0b;
      margin-right: auto;
      text-align: left;
      white-space: nowrap;

      @media screen and (max-width:1200px) {
        font-size: 20px;
      }

      @media screen and (max-width:500px) {
        // text-align: center;
        margin: auto;
      }
    }

    &-category {
      text-align: center;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
      color: #0c0b0b;
      max-width: 100%;
      width: 100%;
      flex-grow: 1;

      @media screen and (max-width:1200px) {
        font-size: 20px;
      }

      @media screen and (max-width:500px) {
        // text-align: center;
        margin: auto;
      }
    }

    &-status {
      min-width: 100px;
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 27px;
      color: #939393;
      margin-left: auto;
      text-align: right;

      @media screen and (max-width:1200px) {
        font-size: 18px;
      }

      @media screen and (max-width:500px) {
        // text-align: center;
        margin: auto;
      }
    }

    &-id {
      text-align: center;
      margin-bottom: 14px;
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 27px;
      color: #0c0b0b;
    }

    &-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 20px;

      @media screen and (max-width:500px) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
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
</style>
