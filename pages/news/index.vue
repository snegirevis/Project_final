<script>
import { mapState } from 'vuex';
import Swiper, { Navigation } from "swiper";
Swiper.use([, Navigation]);
import moment from "moment";
export default {
  data() {
    return {
      token: "",
      moment: moment,
      swiperOptions: {
        slidesPerView: 2,
        spaceBetween: 20,
        speed: 500,
        transition: 5000,
        direction: "horizontal",
        autoplay: {
          delay: 5000,
        },
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            // spaceBetween: 20
          },
          // when window width is >= 480px
          768: {
            slidesPerView: 2,
            // spaceBetween: 30
          }
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      news: [],
      filteredNews: [],
      managerSlides: [
        {
          url: '/newApplications',
          name: 'Новые заявки',
          img: '/uni.png',
        },
        {
          url: '/applications',
          name: 'Заявки',
          img: '/image28.png',
        },
        {
          url: '/archieve',
          name: 'Архив заявок',
          img: '/image31.png',
        }
      ],
      studentSlides: [
        {
          url: '/applications',
          name: 'Справка с места учебы',
          img: '/uni.png',
          type: 'Справка с места учебы'
        },
        {
          url: '/applications',
          name: 'Транскрипт',
          img: '/image28.png',
          type: 'Транскрипт'
        },
        {
          url: '/applications',
          name: 'Справка о наличии гранта',
          img: '/image31.png',
          type: 'Справка о наличии гранта'
        },
        {
          url: '/applications',
          name: 'Справка о зачислении',
          img: '/image15.png',
          type: 'Справка о зачислении'
        }
      ],
    };
  },
  computed: {
    ...mapState(['translations']),
  },
  async created() {
    this.$store.dispatch('loadTranslations');

    await this.$axios
      .get("api/news", {
        headers: {
          Authorization: `Bearer ${this.$store.getters.GET_USER.token}`,
        },
      })
      .then((res) => {
        this.news = res.data;
        this.filteredNews = this.news;
      })
      .catch((err) => console.error(err));
  },
  methods: {
    searchNews(val) {
      if (val.trim()) {
        this.filteredNews = this.news.filter(n => {
          return String(n.theme).includes(val) || String(n.text).includes(val)
        });
      } else {
        this.filteredNews = this.news;
      }
    },
    goTo(url, selectedType) {
      this.$router.push({ path: url });
      if (selectedType) {
        this.$store.dispatch('SET_TYPE', selectedType);
      }
    }
  }
};
</script>

<template>
  <div>
    <div class="navigation">
      <div class="swiper-button-prev prev-btn"><svg width="8" height="14" viewBox="0 0 8 14" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M7 13L1 7L7 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <swiper ref="swiper" :options="swiperOptions" class="swiper"
        v-if="$store.getters.GET_USER.roles[0] === 'ROLE_USER'">
        <swiper-slide v-for="(item, index) in studentSlides" :key="index" class="swiper-slide">
          <div class="swiper-item" @click="goTo(item.url, item.type)">
            <img :src="item.img" />
            <p>{{ item.name }}</p>
          </div>
        </swiper-slide>
      </swiper>
      <swiper ref="swiper" :options="swiperOptions" class="swiper" v-else>
        <swiper-slide v-for="(item, index) in managerSlides" :key="index" class="swiper-slide">
          <div class="swiper-item" @click="goTo(item.url)">
            <img :src="item.img" />
            <p>{{ item.name }}</p>
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-next next-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
    <div class="news">
      <div class="news__wrapper">
        <h1 class="news__title">{{ translations.newsLabel }}</h1>
        <SearchComponent class="news__search" @searchItems="searchNews" />
      </div>
      <div class="news__items">
        <div class="news__item" v-for="(item, index) in filteredNews" :key="index">
          <h3>{{ item.theme }}</h3>
          <div class="news__item-wrapper">
            <span>{{ moment(item.createdAt).locale("ru").format("L") }}</span>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
}

.swiper-item {
  cursor: pointer;
  max-width: 325px;
  width: 100%;
  height: 193px;
  border-radius: 8px;
  background: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    text-align: center;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    color: #0c0b0b;
    margin-top: 18px;
  }
}

.news {
  padding-bottom: 50px;

  &__search {
    width: 250px;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width:768px) {
      flex-direction: column;
      align-items: flex-start;

      margin-bottom: 20px;
    }
  }

  &__title {
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 40px;
    color: #0c0b0b;

    margin-bottom: 34px;

    @media screen and (max-width:1200px) {
      font-size: 24px;
      margin-bottom: 20px;
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__item {
    width: 100%;
    border-bottom: 1px solid black;
    padding-bottom: 18px;
    margin-bottom: 18px;

    &+& {
      margin-top: 30px;
    }

    &-wrapper {
      display: flex;
      align-items: center;
    }

    h3 {
      font-size: 24px;
      margin-bottom: 15px;

      @media screen and (max-width:1200px) {
        font-size: 20px;
      }

      @media screen and (max-width:768px) {
        font-size: 18px;
      }
    }

    span,
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 32px;
      color: #0c0b0b;

      @media screen and (max-width:1200px) {
        font-size: 20px;
        line-height: 24px;
      }

      @media screen and (max-width:1200px) {
        font-size: 18px;
        line-height: 22px;
      }
    }

    span {
      margin-right: 59px;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}

.navigation {
  display: flex;
  align-items: center;
  margin-bottom: 56px;

  // position: relative;

  .prev-btn,
  .next-btn,
  .swiper-button-prev,
  .swiper-button-next {
    &::after {
      display: none !important;
    }

    // font-size: 0;
    position: static;

    background: white;
    border-radius: 50%;
    min-width: 42px;
    height: 41px;
  }

  .swiper-button-prev {
    margin-right: 30px;
  }

  .swiper-button-next {
    margin-left: 30px;
  }

  .swiper-item {
    img {
      @media screen and (max-width:500px) {
        height: 45px;
      }
    }
  }

  .swiper-button-next:after,
  .swiper-container-rtl .swiper-button-prev:after,
  .swiper-button-prev:after,
  .swiper-container-rtl .swiper-button-prev:after {
    width: 42px;
    height: 42px;
    display: flex;
    font-size: 15px;
    color: black !important;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }

  .swiper-item {
    @media screen and (max-width:500px) {
      img {
        object-fit: cover;
        object-position: center;
        height: 70px;
      }

      p {
        font-size: 18px;
        text-align: center;
      }
    }
  }
}</style>
