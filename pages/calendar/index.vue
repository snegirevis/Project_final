<script>
import { mapState } from 'vuex';
import Swiper, { Navigation } from "swiper";
Swiper.use([, Navigation]);
export default {
  data() {
    return {
      monthTitle: '',
      daysOfWeek: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
      weeks: [],
      events: 0,
      weekend: 0,
      selectedDates: ['2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01', '2023-06-01'],
      calendarMonths: [],
      calendarEvents: [
        {
          date: '2023-01-01',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-01-07',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-01-14',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-01-15',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-01-21',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-01-22',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-01-23',
          event: true,
          name: 'Начало семестра'
        },
        {
          date: '2023-01-28',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-01-29',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-02-04',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-02-05',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-02-07',
          event: true,
          name: 'Благотворительная ярмарка'
        },
        {
          date: '2023-02-11',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-02-12',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-02-13',
          event: true,
          name: 'Защита преддипломной практики'
        },
        {
          date: '2023-02-18',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-02-19',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-02-20',
          event: true,
          name: 'Выставление оценок преддипломной практики'
        },
        {
          date: '2023-02-25',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-02-26',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-03-04',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-03-05',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-03-08',
          event: true,
          name: 'Международный женский день'
        },
        {
          date: '2023-03-11',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-03-12',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-03-18',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-03-19',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-03-21',
          event: true,
          name: 'Наурыз'
        },
        {
          date: '2023-03-22',
          event: true,
          name: 'Наурыз'
        },
        {
          date: '2023-03-23',
          event: true,
          name: 'Наурыз'
        },
        {
          date: '2023-03-25',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-03-26',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-04-01',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-04-02',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-04-05',
          event: true,
          name: 'Ярмарка вакансий'
        },
        {
          date: '2023-04-08',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-04-09',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-04-15',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-04-16',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-04-20',
          event: true,
          name: 'Регистрация на элективные дисциплины'
        },
        {
          date: '2023-04-22',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-04-23',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-04-29',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-04-30',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-05-02',
          event: true,
          name: 'Проверка дипломных проектов на плагиат'
        },
        {
          date: '2023-05-06',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-05-07',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-05-13',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-05-14',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-05-15',
          event: true,
          name: 'Начало сессии'
        },
        {
          date: '2023-05-20',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-05-21',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-05-28',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-05-29',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-06-03',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-06-04',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-06-10',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-06-11',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-06-12',
          event: true,
          name: 'Защита дипломных проектов'
        },
        {
          date: '2023-06-17',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-06-18',
          event: false,
          name: 'Выходной'
        },
        {
          date: '2023-06-19',
          event: false,
          name: 'Выходной'
        }
      ],
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 500,
        transition: 5000,
        direction: "horizontal",
        autoplay: {
          delay: 5000,
        },
        navigation: {
          nextEl: ".calendar__arrow.next",
          prevEl: ".calendar__arrow.prev",
        },
      },
      event: {
        show: false
      }
    };
  },
  computed: {
    ...mapState(['translations']),
  },
  async created() {
    this.$store.dispatch('loadTranslations');
    this.generateCalendar(this.selectedDates);
  },
  methods: {
    generateCalendar(months) {
      months.forEach(selectedMonth => {
        const date = new Date(selectedMonth);
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const numDays = lastDay.getDate();

        const weeks = [];
        let week = [];
        let dayCounter = 1;

        // Определяем первый день недели (понедельник)
        let startingDay = firstDay.getDay();
        startingDay = (startingDay === 0) ? 6 : startingDay - 1;

        // Добавляем пустые ячейки для первой недели до начального дня
        for (let i = 0; i < startingDay; i++) {
          week.push(null);
        }

        // Заполняем дни месяца
        for (let i = 0; i < numDays; i++) {
          week.push(dayCounter);
          dayCounter++;

          // Проверяем конец недели
          if (week.length === 7) {
            weeks.push(week);
            week = [];
          }
        }

        // Добавляем пустые ячейки для последней недели после конечного дня
        if (week.length > 0) {
          while (week.length < 7) {
            week.push(null);
          }
          weeks.push(week);
        }

        const monthName = date.toLocaleString('ru-RU', { month: 'long' });

        this.calendarMonths.push({
          monthTitle: monthName.charAt(0).toUpperCase() + monthName.slice(1),
          monthNumber: selectedMonth.split('-')[1],
          year: selectedMonth.split('-')[0],
          weeks: weeks
        });
      });

      this.highlightCalendarDates();
    },
    highlightCalendarDates() {
      this.calendarMonths.forEach((month) => {
        // if (month.monthNumber === '06') debugger
        month.weeks.forEach((week) => {
          for (let index = 0; index < week.length; index++) {
            const day = week[index];
            if (day === null) continue;
            const currentDate = `${month.year}-${month.monthNumber}-${String(day).padStart(2, '0')}`;

            const matchingEvent = this.calendarEvents.find(
              (event) => event.date === currentDate);

            if (matchingEvent) {
              week[index] = {
                day: day,
                highlighted: true,
                event: matchingEvent.event,
                name: matchingEvent.name
              };
            } else {
              week[index] = {
                day: day,
                highlighted: false
              };
            }
          }
        });
      });
      this.events = this.calendarMonths[0].weeks.flat().filter((day) => day?.highlighted && day?.event);
      this.weekend = this.calendarMonths[0].weeks.flat().filter((day) => day?.highlighted && !day?.event);
    },
    updateCardsInfo() {
      const activeIndexOfSlide = this.$refs.swiper.swiperInstance.realIndex;
      this.events = this.calendarMonths[activeIndexOfSlide].weeks.flat().filter((day) => day?.highlighted && day?.event);
      this.weekend = this.calendarMonths[activeIndexOfSlide].weeks.flat().filter((day) => day?.highlighted && !day?.event);
    },
    openEvent(eventName, eventDay, eventMonth) {
      this.event = {
        name: eventName,
        day: eventDay,
        month: eventMonth,
        eventsNum: this.events.length,
        weekendsNum: this.weekend.length
      }
      this.$store.dispatch('SET_EVENT', this.event);
      this.$router.push({
        path: "/event"
      });
    }
  }
};
</script>

<template>
  <div>
    <div class="cards">
      <div class="cards__item event">
        <span>{{ events.length }}</span>
        <span>{{ translations.plaining }} <br> {{ translations.events }}</span>
      </div>
      <div class="cards__item weekend">
        <span>{{ weekend.length }}</span>
        <span>{{ translations.weekends }}</span>
      </div>
    </div>
    <div class="navigation">
      <swiper ref="swiper" :options="swiperOptions" @slideChange="updateCardsInfo" class="swiper">
        <swiper-slide v-for="item in calendarMonths" :key="item" class="swiper-slide">
          <div class="swiper-item">
            <div class="calendar">
              <h2>{{ item.monthTitle }}</h2>
              <table>
                <thead>
                  <tr>
                    <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(week, index) in item.weeks" :key="index">
                    <td v-for="(day, dayIndex) in week" :key="dayIndex" class="day-cell" :style="{
                      'color': day?.highlighted && day?.event ? '#6588F9' : day?.highlighted && !day?.event ? '#28DB7A' : '#6D6D6D',
                      'cursor': day?.highlighted && day?.event ? 'pointer' : 'default'
                    }" @click="day?.event ? openEvent(day.name, day.day, item.monthTitle) : null">
                      {{ day?.day }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="calendar__arrow prev" role="button" aria-label="button prev">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <div class="calendar__arrow next" role="button" aria-label="button next">
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 13L7 7L1 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swiper {
  margin-bottom: 60px;
}

.navigation {
  position: relative;
}

.calendar__arrow {
  cursor: pointer;
  z-index: 1;
  position: absolute;
  top: 50%;
  width: 42px;
  height: 41px;
  border-radius: 50%;
  background-color: #fff;
  transition: all 300ms ease-in;

  display: flex;
  align-items: center;
  justify-content: center;

  &.prev {
    left: 0;
  }

  &.next {
    right: 0;
  }

  &.swiper-button-disabled {
    cursor: default;
    opacity: 0.5;
  }
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

  @media screen and (max-width:500px) {
    &__arrow {
      bottom: -30%;
      top: unset;

      &.prev {
        left: 30%;
      }

      &.next {
        right: 30%;
      }
    }
  }
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 5px;
  text-align: center;
}

h2 {
  text-align: center;
  margin-bottom: 10px;
}
</style>
