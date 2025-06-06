<script setup>
import { QCheckbox, QCard, QCardSection, QSeparator } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Tr from '@/i18n/translation'
import IXPOverview from '@/components/networks/ixp/IXPOverview.vue'
import GenericCardController from '@/components/controllers/GenericCardController.vue'
import NetworkDelayChart from '@/components/charts/NetworkDelayChart.vue'
import DelayAndForwardingChart from '@/components/charts/DelayAndForwardingChart.vue'
import PrefixHegemonyChart from '@/components/charts/PrefixHegemonyChart.vue'
import IXPMembers from '@/components/iyp/ixp/IXPMembers.vue'
import IXPCoLocationFacilities from '@/components/iyp/ixp/IXPCoLocationFacilities.vue'
import IXPPeeringLANs from '@/components/iyp/ixp/IXPPeeringLANs.vue'

const props = defineProps([
  'startTime',
  'endTime',
  'caidaId',
  'family',
  'peeringdbId',
  'pageTitle',
  'interval',
  'hash'
])

const route = useRoute()
const router = useRouter()

const { t } = useI18n()

const fetch = ref(true)
const displayWidgets = ref(route.query.display ? JSON.parse(route.query.display) : [])
const selects = ref([
  { value: false, label: 'Overview' },
  { value: false, label: t('charts.prefixHegemony.title') },
  { value: false, label: t('charts.networkDelay.title') },
  { value: false, label: t('charts.delayAndForwarding.title') },
  { value: false, label: t('iyp.ixp.members.title') },
  { value: false, label: t('iyp.ixp.facilities.title') },
  { value: false, label: t('iyp.ixp.peeringLANs.title') }
])
const selectAll = ref(false)

const pushRoute = () => {
  router.push(
    Tr.i18nRoute({
      replace: true,
      query: Object.assign({}, route.query, {
        display: JSON.stringify(
          selects.value
            .map((obj, index) => {
              if (obj.value) {
                return index
              }
            })
            .filter((val) => val != null)
        )
      })
    })
  )
}

const hashToDisplay = () => {
  selects.value.forEach((obj) => {
    if (obj.label === props.hash.replace('#', '').replaceAll('-', ' ')) {
      obj.value = true
    }
  })
}

watch(selects.value, () => {
  pushRoute()
})

watch(selectAll, () => {
  selects.value.forEach((obj) => (obj.value = selectAll.value))
})

onMounted(() => {
  if (displayWidgets.value.length === selects.value.length) {
    selectAll.value = true
  } else if (props.hash) {
    hashToDisplay()
  } else {
    displayWidgets.value.forEach((val) => (selects.value[val].value = true))
  }
})
</script>

<template>
  <QCard flat bordered>
    <QCardSection>
      <div class="text-h6">Select widgets to show</div>
    </QCardSection>
    <QSeparator inset />
    <QCardSection>
      <QCheckbox
        v-for="(select, index) in selects"
        :key="index"
        v-model="select.value"
        :label="select.label"
      />
      <QCheckbox v-model="selectAll" label="All" />
    </QCardSection>
  </QCard>
  <!-- Overview -->
  <IXPOverview v-if="selects[0].value" :ixp-number="peeringdbId" class="card" />
  <!-- Monitoring -->
  <GenericCardController
    v-if="selects[1].value && caidaId"
    :title="$t('charts.prefixHegemony.title')"
    sub-title="BGP / IRR / RPKI / delegated"
    :report-day="interval.dayDiff()"
    :info-title="$t('charts.prefixHegemony.info.title')"
    :info-description="$t('charts.prefixHegemony.info.description')"
    class="card"
  >
    <PrefixHegemonyChart
      :start-time="startTime"
      :end-time="endTime"
      :as-number="caidaId"
      :fetch="fetch"
    />
  </GenericCardController>

  <GenericCardController
    v-if="selects[2].value"
    :title="$t('charts.networkDelay.title')"
    sub-title="Traceroute Data"
    :report-day="interval.dayDiff()"
    :info-title="$t('charts.networkDelay.info.title')"
    :info-description="$t('charts.networkDelay.info.description')"
    class="card"
  >
    <NetworkDelayChart
      :start-time="startTime"
      :end-time="endTime"
      :start-point-name="Math.abs(caidaId).toString()"
      :start-point-type="route.params.id.substring(0, 2)"
      :fetch="fetch"
      search-bar
      :readonly-source-search="true"
      :peeringdb-id="peeringdbId"
    />
  </GenericCardController>

  <GenericCardController
    v-if="selects[3].value"
    :title="$t('charts.delayAndForwarding.title')"
    sub-title="Traceroute Data"
    :report-day="interval.dayDiff()"
    :info-title="$t('charts.delayAndForwarding.info.title')"
    :info-description="$t('charts.delayAndForwarding.info.description')"
    class="card"
  >
    <DelayAndForwardingChart
      :start-time="startTime"
      :end-time="endTime"
      :as-number="caidaId ? caidaId : 0"
      :fetch="fetch"
    />
  </GenericCardController>
  <!-- Routing -->
  <GenericCardController
    v-if="selects[4].value"
    :title="$t('iyp.ixp.members.title')"
    sub-title="Member Autonomous Systems (ASes)"
    :info-title="$t('iyp.ixp.members.info.title')"
    :info-description="$t('iyp.ixp.members.info.description')"
    class="card"
  >
    <IXPMembers :ixp-number="peeringdbId" :page-title="pageTitle" />
  </GenericCardController>
  <!-- Peering -->
  <GenericCardController
    v-if="selects[5].value"
    :title="$t('iyp.ixp.facilities.title')"
    sub-title="Facilities"
    :info-title="$t('iyp.ixp.facilities.info.title')"
    :info-description="$t('iyp.ixp.facilities.info.description')"
    class="card"
  >
    <IXPCoLocationFacilities :ixp-number="peeringdbId" :page-title="pageTitle" />
  </GenericCardController>
  <GenericCardController
    v-if="selects[6].value"
    :title="$t('iyp.ixp.peeringLANs.title')"
    sub-title="Peering LANs of an IXP"
    :info-title="$t('iyp.ixp.peeringLANs.info.title')"
    :info-description="$t('iyp.ixp.peeringLANs.info.description')"
    class="card"
  >
    <IXPPeeringLANs :ixp-number="peeringdbId" :page-title="pageTitle" />
  </GenericCardController>
</template>

<style>
.card {
  margin-top: 20px;
}
</style>
