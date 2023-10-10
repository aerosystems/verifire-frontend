<template>
  <section id="fine-tuning" class="wrapper style1 spotlights">
    <section>
      <div class="content">
        <div class="inner">
          <div class="row gtr-uniform">
            <div class="col-6 col-12-xsmall">
              <h2>Statistics for the last</h2>
            </div>
            <div class="col-6 col-12-xsmall">
              <ul class="actions">
                <li>
                  <button
                      class="button small"
                      :class="{'primary': is24Hours}"
                      @click="set24Hours(); getStatByLast(24, 'hour')">
                    24 hours
                  </button>
                </li>
                <li>
                  <button
                      class="button small"
                      :class="{'primary': is7Days}"
                      @click="set7Days(); getStatByLast(24 * 7, 'day')">
                    7 days</button>
                </li>
                <li>
                  <button
                      class="button small"
                      :class="{'primary': is1Month}"
                      @click="set1Month(); getStatByLast(24 * 30, 'day')">
                    1 month</button>
                </li>
              </ul>
            </div>
          </div>
          <section>
            <h3>Classification of responses per hour</h3>
            <div class="row">
              <div class="col-12">
              <Bar
                  :options="chartOptions"
                  :data="diagramData"
              />
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <h3>Total responses</h3>
                <PolarArea
                    :data="polarData"
                    :options="polarOptions"
                />
              </div>
              <div class="col-6">
                <h3>Errors</h3>
                <Doughnut
                    :data="doughnutData"
                    :options="doughnutOptions"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import StatService from "@/services/stat.service";
import { Bar, PolarArea, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, ArcElement, RadialLinearScale, CategoryScale, LinearScale, Colors } from 'chart.js'
import {mapState} from "vuex";
import store from "@/store";

ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, RadialLinearScale, CategoryScale, LinearScale, Colors)

export default {
  components: { Bar, PolarArea, Doughnut },
  setup() {
    return {}
  },
  watch: {
    'projectState.token': {
      immediate: true, // Виконати обробник при монтуванні компонента
      handler(newValue, oldValue) {
        // Перевірка, чи змінився токен
        if (newValue !== oldValue) {
          // Викликаємо метод після зміни токену
          this.getStatByLast(24, 'hour');
        }
      }
    }
  },
  data() {
    return {
      is24Hours: true,
      is7Days: false,
      is1Month: false,
      diagramData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [
          {
            label: 'blacklist',
            data: [10, 20, 30]
          },
          {
            label: 'whitelist',
            data: [ 10, 5, 30 ]
          },
          {
            label: 'undefined',
            data: [ 10, 20, 5 ]
          },
          {
            label: 'error',
            data: [ 5, 20, 10 ]
          }
        ]
      },
      polarData: {
        labels: ['blacklist', 'whitelist', 'undefined', 'error'],
        datasets: [
          {
            data: [1, 2, 3, 4],
            borderWidth: 0,
          }
        ]
      },
      doughnutData: {
        labels: ['400001', '400002', '400003', '400004'],
        datasets: [
          {
            data: [1, 2, 3, 4],
            borderWidth: 0,
          }
        ]
      },
      chartOptions: {
        plugins: {
          legend: {
            labels: {
              color: 'White',
            },
          },
          colors: {
            enabled: true
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
            grid: {
              color: 'rgba(0,0,0,0.05)',
            },
            ticks: {
              color: 'White',
            },
          },
          y: {
            stacked: true,
            grid: {
              color: 'rgba(0,0,0,0.05)',
            },
            ticks: {
              color: 'White',
            },
          }
        },
      },
      polarOptions: {
        plugins: {
          legend: {
            labels: {
              color: 'White',
            },
          },
        },
        scales: {
          r: {
            ticks: {
              color: 'White',
              backdropColor: 'rgba(0, 0, 0, 0)',
            },
          },
        },
        responsive: true,
      },
      doughnutOptions: {
        plugins: {
          legend: {
            labels: {
              color: 'White',
            },
          },
        },
        responsive: true,
      },
    }
  },
  methods: {
    set24Hours() {
      this.is24Hours = true;
      this.is7Days = false;
      this.is1Month = false;
    },
    set7Days() {
      this.is24Hours = false;
      this.is7Days = true;
      this.is1Month = false;
    },
    set1Month() {
      this.is24Hours = false;
      this.is7Days = false;
      this.is1Month = true;
    },
    async getStatByLast(durationHours, scale) {
      const timeEnd = new Date();
      const timeStart = new Date(timeEnd.getTime() - 1000 * 60 * 60 * durationHours);
      let statServiceInstance = new StatService(
          this.projectState.token,
          timeStart,
          timeEnd,
          10000,
          0,
      );

      await statServiceInstance.getEvents()
          .then(
          () => {
            this.polarData = statServiceInstance.getTotalResponsesData();
            this.doughnutData = statServiceInstance.getTotalErrorData();
            this.diagramData = statServiceInstance.getResponsesData(scale);
          },
          error => {
            store.dispatch('ui/addError', error);
          }
      );

      statServiceInstance = null;
    },
  },
  computed: {
    ...mapState({
      projectState: state => state.project.project,
    })
  },
}
</script>

<style lang="scss" scoped>

</style>