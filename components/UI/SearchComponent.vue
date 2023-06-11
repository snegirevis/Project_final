<script>
export default {
    props: {
        width: {
            type: String,
        },
    },
    methods: {
        searchItems() {
            this.$emit("searchItems", event.target.value);
        },
    },
};
</script>

<template>
    <label for="search" class="search-label">
        <svg
            class="search-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6.3833 12.7666C7.76123 12.7666 9.04785 12.3184 10.0938 11.5713L14.0283 15.5059C14.2109 15.6885 14.4517 15.7798 14.7007 15.7798C15.2402 15.7798 15.6304 15.3647 15.6304 14.8335C15.6304 14.5845 15.5474 14.3521 15.3647 14.1694L11.4551 10.2515C12.2769 9.17236 12.7666 7.83594 12.7666 6.3833C12.7666 2.87207 9.89453 0 6.3833 0C2.86377 0 0 2.87207 0 6.3833C0 9.89453 2.86377 12.7666 6.3833 12.7666ZM6.3833 11.3887C3.63574 11.3887 1.37793 9.12256 1.37793 6.3833C1.37793 3.64404 3.63574 1.37793 6.3833 1.37793C9.12256 1.37793 11.3887 3.64404 11.3887 6.3833C11.3887 9.12256 9.12256 11.3887 6.3833 11.3887Z"
                fill="#0C0B0B"
            />
        </svg>

        <input
            type="search"
            placeholder="Поиск"
            id="search"
            :style="{ width: `${width}` }"
            @input="searchItems()"
            @change="searchItems()"
        />
    </label>
</template>

<style lang="scss" scoped>
.search-label {
    position: relative;
    @media screen and (max-width:650px){
        width: 100%;
        input{
            width: 100% !important;
        }
    }
}
.search-icon {
    position: absolute;
    left: 24px;
    top: 13px;
}
input {
    background: #ffffff;
    border-radius: 40px;
    outline: none;
    padding-left: 48px;

    height: 41px;
    border: unset;

    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.408px;
    color: black;
}
</style>