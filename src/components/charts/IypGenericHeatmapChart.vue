<script setup>
import ReactiveChart from './ReactiveChart.vue'
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  chartData: {
    type: Array,
    default: () => []
  },
  chartLayout: {
    type: Object,
    default: () => ({})
  },
  config: {
    type: Object,
    default: () => ({})
  }
})

const localChartData = ref([])
const actualChartData = ref([])
const actualChartLayout = ref({})

const renderChart = () => {
  let data = formatChartData(localChartData.value)

  let layout = {
    ...props.chartLayout
  }

  actualChartData.value = data
  actualChartLayout.value = layout
}

const formatChartData = (arrayOfObjects) => {
  if (!arrayOfObjects || Object.keys(arrayOfObjects[0]).length === 0) {
    return []
  }

  let data = []
  if (Object.keys(arrayOfObjects[0]).length) {
    let distribution = []
    const xLabel = new Set()
    const yLabel = new Set()

    const keys = Object.keys(arrayOfObjects[0])
    keys.forEach((key1) => {
      const set1 = arrayOfObjects[0][key1]
      let row = null
      xLabel.add(key1)
      row = []
      keys.forEach((key2) => {
        const set2 = arrayOfObjects[0][key2]
        yLabel.add(key2)
        const intersection = new Set([...set1].filter((x) => set2.has(x)))
        row.push(intersection.size)
      })
      if (row) {
        distribution.push(row)
      }
    })

    distribution = distribution.map((row) => row.reverse())

    data.push({
      type: 'heatmap',
      z: distribution,
      y: [...yLabel],
      x: [...xLabel].reverse(),
      text: distribution.map((row, _) => row.map((value, _) => value.toString())),
      texttemplate: '%{text}',
      textposition: 'center',
      hoverinfo: 'x+y+z',
      colorscale: 'YlOrRd',
      reversescale: true,
      ...props.config
    })
  }

  return data
}

const init = () => {
  if (props.chartData && props.chartData.length > 0) {
    localChartData.value = props.chartData
    renderChart()
  }
}

watch(
  () => props,
  () => {
    init()
  },
  { deep: true }
)

onMounted(() => {
  init()
})
</script>

<template>
  <ReactiveChart
    :layout="actualChartLayout"
    :traces="actualChartData"
    :chart-title="actualChartLayout && actualChartLayout.title"
  />
</template>
