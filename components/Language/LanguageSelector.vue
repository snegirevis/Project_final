<script>
import { mapState, mapActions } from 'vuex';
export default {
    data() {
        return {
            languages: ['ru', 'kz', 'en']
        };
    },
    computed: {
        ...mapState(['selectedLanguage']),
    },
    methods: {
        selectLanguage(lang) {
            this.$store.commit('SET_SELECTED_LANGUAGE', lang);
            this.$store.dispatch('loadTranslations');
        },
    },
};
</script>

<template>
    <div class="languages">
        <div
            v-for="(lang, index) in languages"
            :key="index"
            :class="{ active: lang === selectedLanguage }"
            @click="selectLanguage(lang)"
            class="languages__item"
        >
            {{ lang }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.languages {
    display: flex;
    align-items: center;

    position: absolute;
    top: 78px;
    right: 78px;
    gap: 0 10px;
    text-transform: uppercase;

    @media screen and (max-width:1024px) {
        top: 20px;
        right: 20px;

    }

    &__item {
        cursor: pointer;
        font-style: normal;
        font-weight: 400;
        font-size: 30px;
        // line-height: 28px;
        color: #0C0B0B;

        @media screen and (max-width:1024px) {
            font-size: 24px;
        }
    }

    .active {
        color: #6B6B6B;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: #000000;
        // border: 1px solid #000000;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
}
</style>
