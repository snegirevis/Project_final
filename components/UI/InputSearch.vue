<script>
export default {
    data() {
        return {
        };
    },
};
</script>

<template>
    <div class="content">
        <div class="content__buttons">
            <nuxt-link class="content__btn" v-if="$store.getters.GET_USER.userRole === 2" :to="'/notifications'">
                <img src="@/assets/images/applications/colocol.png" />
            </nuxt-link>
            <nuxt-link class="content__btn" :to="'/settings'">
                <img src="@/assets/images/applications/settings.png" />
            </nuxt-link>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 60px;
    &__buttons {
        display: flex;
        align-items: center;
        margin-left: auto;
    }
    &__btn {
        border-width: 0;
        border-radius: 50%;
        margin-right: 18px;
        background: white;
        width: 42px;
        height: 42px;

        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 23px;
            height: 23px;
            object-fit: cover;
        }

        &:last-child {
            margin-right: 0;
        }
    }
}
</style>