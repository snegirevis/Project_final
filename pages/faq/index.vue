<script>
export default {
  data() {
    return {

      activeTab: 0,
      faqItems: [
        {
          question: 'Как создать заявку?',
          answer:
            'Чтобы подать заявку, необходимо зайти в раздел “Заявки”, выбрать необходимый вид, проверить корректность полученных данных, добавить комментарий при необходимости и нажать “Отправить заявку”'
        },
        {
          question: 'Как узнать, что заявка готова?',
          answer:
            'После отправления заявки, информация о ней будет доступна во вкладке “Архив заявок”. Достаточно перейти к необходимой заявке и посмотреть на ее статус. Также при готовности заявки в личный кабинет и на почту студента приходит уведомление.'
        },
        {
          question: 'Как посмотреть события в университете?',
          answer:
            'Во вкладке “Календарь” имеется специальный интерфейс, содержащий события в университете и выходные. Особенные дни отмечены синим цветом, выходные - зеленым.'
        },
      ]
    };
  },

  methods: {
    toggleTab(index) {
      this.activeTab = index;
    },
    getHeight(index) {
      if (this.$refs['elem' + index]) {
        return this.$refs['elem' + index][0].scrollHeight;
      }
      return 0;
    }, 
    updateHeights() {
      for (let index = 0; index < this.faqItems.length; index++) {
        const height = this.getHeight(index);
        const elem = this.$refs['elem' + index][0];
        if (elem && elem.classList.contains('active') && this.activeTab === index) {
          elem.style.maxHeight = height + 'px';
        } else {
          elem.style.maxHeight = '0px';
        }
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.updateHeights();
    });
  },
  updated() {
    this.$nextTick(() => {
      this.updateHeights();
    });
  },

};
</script>
<template>
  <div>
    <div class="faq">
      <h1 class="faq__title">
        Часто задаваемые вопросы
      </h1>
      <div class="faq__wrapper">
        <div class="faq">
          <div v-for="(item, index) in faqItems" :key="index" class="faq__block">
            <div class="faq__tab">
              <button type="button" class="button faq__tab-button" :class="{ active: activeTab === index }"
                @click="toggleTab(index)">
                {{ item.question }}
              </button>
              <div :class="[{ active: activeTab === index }, 'faq__content']" :ref="'elem' + index"
                :style="{ maxHeight: activeTab === index ? getHeight(index) + 'px' : '0px' }">
                <p>
                  {{ item.answer }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="faq__block">
                                          <div class="faq__tab">
                                                      <button type="button" class="button faq__tab-button active">
                                                        Как создать заявку?
                                                      </button>
                                                      <div class="faq__content" style>
                                                        Чтобы подать заявку, необходимо зайти в раздел “Заявки”, выбрать необходимый вид, проверить корректность
                                                          полученных данных, добавить комментарий при необходимости и нажать “Отправить заявку”
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div class="faq__block">
                                                      <div class="faq__tab">
                                                        <button type="button" class="button faq__tab-button active">
                                                          Как узнать, что заявка готова?
                                                        </button>
                                                        <div class="faq__content" style>
                                                            Чтобы подать заявку, необходимо зайти в раздел “Заявки”, выбрать необходимый вид, проверить корректность
                                                            полученных данных, добавить комментарий при необходимости и нажать “Отправить заявку”
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div class="faq__block">
                                                        <div class="faq__tab">
                                                          <button type="button" class="button faq__tab-button active">
                                                            Как посмотреть события в <br> университете?
                                                          </button>
                                                          <div class="faq__content" style>
                                                            Чтобы подать заявку, необходимо зайти в раздел “Заявки”, выбрать необходимый вид, проверить корректность
                                                            полученных данных, добавить комментарий при необходимости и нажать “Отправить заявку”
                                                          </div>
                                                        </div>
                                                      </div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.faq {
  padding-bottom: 100px;

  &__block {
    max-width: 600px;
    width: 100%;
    overflow: hidden;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  &__content {
    font-family: 'Segoe UI' !important;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    text-align: justify;
    // padding: 31px;
    background-color: #fff;
    color: #0C0B0B;
    transition: 0.5s all;
    max-height: 0;
    display: block;
    p {
      padding: 31px;
    }

  }

  &__tab {
    margin-top: 33px;

    &-button {
      width: 100%;
      font-family: 'Segoe UI' !important;
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 32px;

      color: #0C0B0B;
      padding-bottom: 36px;
      border-bottom: 1px solid rgba(18, 18, 29, 0.1);
      position: relative;
      padding-right: calc(10% + 24px);

      &::after {
        content: "";
        position: absolute;
        background-image: url(../../assets/images/arrow-down.svg);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        right: 10%;
        width: 24px;
        height: 24px;
        top: 5px;

        transition: 0.3s all;
        transform: rotateZ(-90deg);
      }

      &.active {
        &::after {
          transform: rotateZ(0deg);
        }
      }

    }
  }

  &__title {
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    // line-height: 40px;
    color: #0c0b0b;
    margin-bottom: 34px;
    text-align: center;
    margin-bottom: 150px;

    @media screen and (max-width:1200px) {
      font-size: 24px;
      margin-bottom: 120px;
    }

    @media screen and (max-width:500px) {
      font-size: 20px;
      margin-bottom: 70px;
    }
  }
}
</style>