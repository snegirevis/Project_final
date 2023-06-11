<template>
    <div class="profile">
      <h1 class="profile__title">{{ translations.infoAbout }} {{ $store.getters.GET_USER.userRole === 1 ? "менеджере" : "студенте" }}</h1>
      <div class="profile__items">
        <div class="profile__item"
          v-for="(item, index) in $store.getters.GET_USER.userRole === 1 ? managerProfileInfo : profileInfo" :key="index">
          <p v-if="!edit">
            {{ translations[item.title] }}:<span>{{ user[item.backendKey] }}</span>
          </p>
          <label v-else>
            {{ item.title }}
            <input v-model="user[item.backendKey]" />
          </label>
        </div>
      </div>
      <!-- <button v-if="user?.roles[0]?.name === 'ROLE_ADMIN'" class="profile__button" @click="profileChanges(edit)">
        {{ !edit ? "Редактировать данные" : "Сохранить данные" }}
      </button> -->
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        user: {},
        edit: false,
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
        managerProfileInfo: [
          { title: "fullName", backendKey: "user" },
          { title: "phoneNumberLabel", backendKey: "phoneNumber" },
          { title: "emailLabel", backendKey: "email" },
          { title: "groupLabel", backendKey: "group" },
          { title: "positionLabel", backendKey: "position" },
          { title: "headFullName", backendKey: "headFullName"},
        ]
      };
    },
    computed: {
      ...mapState(['translations']),
    },
    async created() {
      this.$store.dispatch('loadTranslations');
      
      await this.$axios
        .get(`/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.GET_USER.token}`,
          },
          params: {
            username: this.$store.getters.GET_USER.username,
          },
        })
        .then((res) => {
          console.log('RES', res.data);
          (this.user = res.data)
        })
        .catch((err) => console.error(err));
    },
    methods: {
      async profileChanges(edit) {
        if (edit === false) {
          this.edit = true;
        } else {
          this.editProfile();
        }
      },
      async editProfile() {
        await this.$axios
          .put(
            `/api/users/profile/?username=` +
            this.$store.getters.GET_USER.username,
            this.user,
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.GET_USER.token}`,
              },
            }
          )
          .then((res) => {
            this.edit = false;
            alert(res.data);
          })
          .catch((err) => console.error(err))
          .finally(() => { });
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
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
  </style>
  