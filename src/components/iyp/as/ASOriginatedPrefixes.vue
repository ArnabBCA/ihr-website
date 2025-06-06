<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, inject, watch, onMounted } from 'vue'
import IypController from '@/components/controllers/IypController.vue'
import IypGenericPieChart from '@/components/charts/IypGenericPieChart.vue'
import IypGenericBarChart from '@/components/charts/IypGenericBarChart.vue'
import IypGenericTreemapChart from '@/components/charts/IypGenericTreemapChart.vue'
import treemapClicked from '@/plugins/IypGenericTreemapChart.js'

const iyp_api = inject('iyp_api')

const props = defineProps(['asNumber', 'pageTitle'])

const route = useRoute()
const router = useRouter()

const prefixes = ref({
  data: [],
  show: false,
  loading: true,
  query: `MATCH (:AS {asn: $asn})-[o:ORIGINATE]->(p:BGPPrefix)
    OPTIONAL MATCH (p)-[:COUNTRY {reference_org:'IHR'}]->(c:Country)
    OPTIONAL MATCH (p)-[creg:COUNTRY {reference_org:'NRO'}]->(creg_country:Country)
    OPTIONAL MATCH (p)-[:CATEGORIZED]->(t:Tag)
    OPTIONAL MATCH (p)-[:PART_OF*1..3]->(cover:RIRPrefix)-[cover_creg:ASSIGNED {reference_org:'NRO'}]->(:OpaqueID)
    OPTIONAL MATCH (cover:RIRPrefix)-[cover_creg:ASSIGNED {reference_org:'NRO'}]->(cover_creg_country:Country)
    RETURN c.country_code AS cc, toUpper(COALESCE(creg.registry, cover_creg.registry, '-')) AS rir, toUpper(COALESCE(creg_country.country_code, cover_creg_country.country_code, '-')) AS rir_country, p.prefix as prefix, collect(DISTINCT(t.label)) AS tags, collect(DISTINCT o.descr) as descr, collect(DISTINCT o.visibility) as visibility`,
  columns: [
    {
      name: 'RIR',
      label: 'RIR',
      align: 'left',
      field: (row) => (row.rir ? row.rir : ''),
      format: (val) => `${String(val).toUpperCase()}`,
      sortable: true
    },
    {
      name: 'Reg. Country',
      label: 'Reg. Country ',
      align: 'left',
      field: (row) => row.rir_country,
      format: (val) => `${String(val).toUpperCase()}`,
      sortable: true
    },
    {
      name: 'Geoloc. Country',
      label: 'Geoloc. Country',
      align: 'left',
      field: (row) => row.cc,
      format: (val) => `${val}`,
      sortable: true
    },
    {
      name: 'Prefix',
      label: 'Prefix',
      align: 'left',
      field: (row) => row.prefix,
      format: (val) => `${val}`,
      sortable: true,
      sortOrder: 'ad'
    },
    {
      name: 'Description',
      label: 'Description',
      align: 'left',
      field: (row) => row.descr,
      format: (val) => `${val}`,
      sortable: true
    },
    {
      name: 'Tags',
      label: 'Tags',
      align: 'left',
      field: (row) => row.tags,
      format: (val) => `${val.join(', ')}`,
      sortable: true
    },
    {
      name: 'Visibility',
      label: 'Visibility',
      align: 'left',
      field: (row) => Number(row.visibility),
      format: (val) => `${val.toFixed(2)}%`,
      sortable: true
    }
  ]
})

const load = () => {
  prefixes.value.loading = true
  // Run the cypher query
  let query_params = { asn: props.asNumber }
  iyp_api.run([{ statement: prefixes.value.query, parameters: query_params }]).then((results) => {
    prefixes.value.data = results[0]
    prefixes.value.loading = false
  })
}

watch(
  () => props.asNumber,
  () => {
    load()
  }
)

onMounted(() => {
  load()
})
</script>

<template>
  <IypController
    :data="prefixes.data"
    :columns="prefixes.columns"
    :loading-status="prefixes.loading"
    :cypher-query="prefixes.query.replace(/\$(.*?)}/, `${asNumber}}`)"
    :slot-length="1"
  >
    <div class="row justify-evenly">
      <div class="col-4">
        <IypGenericPieChart
          v-if="prefixes.data.length > 0"
          :chart-data="prefixes.data"
          :chart-layout="{ title: 'Geo-location (Maxmind)' }"
        />
      </div>
      <div class="col-6">
        <IypGenericBarChart
          v-if="prefixes.data.length > 0"
          :chart-data="prefixes.data"
          :config="{ key: 'tags' }"
          :chart-layout="{ yaxis: { title: { text: 'Number of prefixes' } }, title: 'Prefix tags' }"
        />
      </div>
      <div class="col-10">
        <IypGenericTreemapChart
          v-if="prefixes.data.length > 0"
          :chart-data="prefixes.data"
          :chart-layout="{ title: 'Breakdown per RIR and geo-location (Maxmind)' }"
          :config="{
            keys: ['cc', 'prefix'],
            root: pageTitle,
            show_percent: true,
            hovertemplate:
              '<b>%{label}</b><br>%{customdata.descr}<extra>%{customdata.percent:.1f}%</extra>'
          }"
          @treemap-clicked="treemapClicked({ ...$event, ...{ router: router, leafKey: 'prefix' } })"
        />
      </div>
    </div>
  </IypController>
</template>
