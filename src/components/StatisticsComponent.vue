<template>
  <section id="fine-tuning" class="wrapper style1 spotlights">
    <section>
      <div class="content">
        <div class="inner">
          <h2>Statistics:</h2>
          <section>
            <h3>Classification of responses</h3>
            <div class="row gtr-uniform">
              <Bar
                  :style="stackedChartStyle"
                  :options="chartOptions"
                  :data="chartData"
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [
          {
            label: 'Blacklist',
            backgroundColor: 'rgba(255,65,65,0.63)',
            data: [10, 20, 30]
          },
          {
            label: 'Whitelist',
            backgroundColor: '#002d5e',
            data: [ 10, 20, 30 ]
          },
          {
            label: 'Undefined',
            backgroundColor: 'rgba(0,255,0,0.38)',
            data: [ 10, 20, 30 ]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    }
  },
  computed: {
    stackedChartStyle() {
      return {
        height: '800px',
        position: 'relative'
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>