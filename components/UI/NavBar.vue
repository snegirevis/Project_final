<template>
    <div>
      <div v-if="isButtonVisible" class="burger-btn" @click="openNavbar">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div :class="['navbar', { 'opened': isNavbarOpen, 'closed': !isNavbarOpen }]">
        <div class="navbar__person person">
          <div class="person__content">
            {{ user.username }}
          </div>
        </div>
        <div class="navbar__items">
          <div v-for="(item, index) in navbarList" :key="item.title + index" class="navbar__item"
            :class="{ active: $route.path === item.url }">
            <nuxt-link :to="item.url"
              v-if="item?.role === $store.getters.GET_USER.userRole ? true : item?.role === undefined ? true : false">
              <img :src="item.icon" />
              <span>{{ translations[item.title] }}</span>
            </nuxt-link>
          </div>
          <a @click="logout" class="logout">
            Выйти
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.00033 1.33334H12.0003C12.7337 1.33334 13.3337 1.93334 13.3337 2.66667V13.3333C13.3337 14.0667 12.7337 14.6667 12.0003 14.6667H6.00033C5.26699 14.6667 4.66699 14.0667 4.66699 13.3333V12H6.00033V13.3333H12.0003V2.66667H6.00033V4H4.66699V2.66667C4.66699 1.93334 5.26699 1.33334 6.00033 1.33334Z"
                fill="#0C0B0B" />
              <path
                d="M6.72667 10.3933L7.66667 11.3333L11 8L7.66667 4.66667L6.72667 5.60667L8.44667 7.33334H2V8.66667H8.44667L6.72667 10.3933Z"
                fill="#0C0B0B" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        user: {},
        isButtonVisible: false,
        isNavbarOpen: false,
        navbarList: [
          {
            title: "newsLabel",
            icon: require("@/assets/images/updates.png"),
            url: "/news",
          },
          {
            title: "newApplication",
            icon: require("@/assets/images/applications.png"),
            url: "/newApplications",
            role: 1 // only for manager
          },
          {
            title: "applicationsLabel",
            icon: require("@/assets/images/default-applications.png"),
            url: "/applications",
          },
          {
            title: "applicationsArchiveLabel",
            icon: require("@/assets/images/archive.png"),
            url: "/archieve",
          },
          {
            title: "profile",
            icon: require("@/assets/images/profile.png"),
            url: "/profile",
          },
          {
            title: "calendar",
            icon: require("@/assets/images/calendar.png"),
            url: "/calendar",
          }
        ],
      };
    },
    computed: {
      ...mapState(['translations']),
    },
    created() {
      this.$store.dispatch('loadTranslations');
      this.user = this.$store.getters.GET_USER;
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
      if (this.user.roles[0] === "ROLE_USER") {
        this.navbarList[2].icon = require("@/assets/images/applications.png");
      }
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      logout() {
        this.$store.commit("SET_LOGGEDIN", false);
        this.$store.commit("SET_USER", {});
        this.$router.push({ path: "/login" });
      },
      handleResize() {
        this.isButtonVisible = window.innerWidth <= 1200;
        this.isNavbarOpen = window.innerWidth > 1200
      },
      openNavbar() {
        this.isNavbarOpen = this.isNavbarOpen ? false : true
      }
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .burger-btn {
    position: fixed;
    left: 50px;
    top: 20px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    z-index: 11001;
    border-radius: 50%;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.32);
    background-color: #fff;
  
    div {
      width: 30px;
      height: 4px;
      margin-bottom: 3px;
      background: black;
      border-radius: 3px;
  
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  
  .navbar {
    position: fixed;
    left: 0;
    top: 0;
    background: rgb(248, 249, 250);
    max-width: 337px;
    width: 100%;
    height: 100vh;
    overflow: auto;
    padding-bottom: 50px;
    transition: 0.3s all;
    z-index: 11000;
  
    &.closed {
  
      transform: translateX(-100%);
    }
  
    &.opened {
      transform: translateX(0);
    }
  
    &__top {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      padding-left: 37px;
    }
  
    &__person {
      padding: 43px 0;
    }
  
    &__items {
      display: flex;
      flex-direction: column;
    }
  
    &__item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0;
      cursor: pointer;
  
      a {
        display: flex;
        align-items: center;
        text-decoration: unset;
  
        text-align: left;
        height: 100%;
        margin-left: 10px;
        width: 100%;
        padding: 10px 0 10px 50px;
        cursor: pointer;
  
        span {
          margin-left: 12px;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 19px;
          color: #0c0b0b;
        }
      }
  
      &:hover {
        background: #ecebf3;
        transition: 0.22s;
      }
  
      img {
        object-fit: cover;
      }
    }
  
    .active {
      background: #ecebf3;
      transition: 0.22s;
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
  }
  
  .person {
    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  
      font-family: "Segoe UI";
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
  
      img {
        height: 4vw;
        width: 4.5vw;
        margin-bottom: 20px;
      }
    }
  }
  
  .logout {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 24px;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    text-decoration-line: underline;
    color: #0c0b0b;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  
    svg {
      margin-top: 4px;
    }
  }
  </style>
  