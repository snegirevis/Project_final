<script>
import { mapState } from 'vuex';
import Swiper, { Navigation } from "swiper";
Swiper.use([, Navigation]);
export default {
  data() {
    return {
      event: null
    }
  },

  computed: {
    ...mapState(['translations']),
  },
  created() {
    this.$store.dispatch('loadTranslations');
    this.event = this.$store.state.calendarEvent;

    console.log('this.event', this.event)
  },

  methods: {
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<template>
  <div>
    <button class="go-back-button" @click="goBack()">
      <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.25 18.3333L0 9.99999L6.25 1.66666L7.35938 3.14582L2.21875 9.99999L7.35938 16.8542L6.25 18.3333Z"
          fill="black" />
      </svg>
    </button>
    <div v-if="event">
      <div class="cards">
        <div class="cards__item event">
          <span>{{ event.eventsNum }}</span>
          <span>{{ translations.plaining }} <br> {{ translations.events }}</span>
        </div>
        <div class="cards__item weekend">
          <span>{{ event.weekendsNum }}</span>
          <span>{{ translations.weekends }}</span>
        </div>
      </div>
      <div class="event">
        <div class="event__date">
          {{ event.month }}, {{ event.day }}
        </div>
        <div class="event__card">
          {{ event.name }}
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
  margin-bottom: 20px;
}

.cards {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 85px;
  margin-bottom: 22px;

  @media screen and (max-width:1200px) {
    // height: 100px;
    gap: 0 30px;
    margin-bottom: 25px;
  }

  @media screen and (max-width:690px) {
    flex-direction: column;
    gap: 25px 0;
  }

  &__item {
    max-width: 358px;
    width: 100%;
    height: 132px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.32);
    border-radius: 14px;

    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 60px;

    @media screen and (max-width:1200px) {
      height: 100px;
      gap: 0 25px;
    }

    @media screen and (max-width:690px) {
      flex-direction: column;
    }

    span {
      font-weight: 600;
      text-align: center;

      &:first-child {
        font-size: 28px;

        @media screen and (max-width:1200px) {
          font-size: 24px;
        }
      }

      &:last-child {
        font-size: 22px;

        @media screen and (max-width:1200px) {
          font-size: 18px;
        }
      }

      line-height: 29px;
      color: white;
    }

    &.weekend {
      background: #28DB7A;

    }

    &.event {
      background-color: #6688F9;
    }
  }
}

.calendar {
  margin: 0 auto;
  font-family: Arial, sans-serif;
  width: 300px;
}

.event {
  &__date {
    margin: 33px 0 52px;
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    // line-height: 45px;
    color: #0C0B0B;
    text-align: center;

    @media screen and (max-width:1200px) {
      font-size: 28px;
      margin: 25px 0;
    }

    @media screen and (max-width:500px) {
      font-size: 28px;
    }
  }

  &__card {
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.32);
    border-radius: 14px;
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: #0C0B0B;
    padding: 48px;
    text-align: center;
    margin-bottom: 100px;

    @media screen and (max-width:1200px) {
      font-size: 22px;
      padding: 36px;
    }

    @media screen and (max-width:500px) {
      font-size: 22px;
      padding: 36px;
    }
  }
}
</style>