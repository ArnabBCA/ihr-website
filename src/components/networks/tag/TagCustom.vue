<script setup>
import { QCheckbox, QCard, QCardSection, QSeparator } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, watch, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import Tr from '@/i18n/translation'
import GenericCardController from '@/components/controllers/GenericCardController.vue'
import TagOverview from '@/components/networks/tag/TagOverview.vue'
import TagPrefixes from '@/components/iyp/tag/TagPrefixes.vue'
import TagAutonomousSystems from '@/components/iyp/tag/TagAutonomousSystems.vue'
import TagPopularHostNames from '@/components/iyp/tag/TagPopularHostNames.vue'

const props = defineProps(['tag', 'hash'])

const iyp_api = inject('iyp_api')

const route = useRoute()
const router = useRouter()

const { t } = useI18n()

const fetch = ref(true)
const displayWidgets = ref(route.query.display ? JSON.parse(route.query.display) : [])
const selects = ref([
  // { value: false, hasData: true, label: 'Overview' },
  { value: false, hasData: false, label: t('iyp.tag.domains.title') },
  { value: false, hasData: false, label: t('iyp.tag.ases.title') },
  { value: false, hasData: false, label: t('iyp.tag.prefixes.title') }
])
const selectAll = ref(false)
const selectedWidgets = ref(null)

const init = async () => {
  const queries = [
    {
      query: `MATCH (t:Tag {label: $tag})
      OPTIONAL MATCH (t)<-[cat_a:CATEGORIZED]-(a:AS) WITH t, count(DISTINCT a) as nb_ases, COLLECT(DISTINCT cat_a.reference_org) as data_source_ases
      OPTIONAL MATCH (t)<-[cat_p:CATEGORIZED]-(p:Prefix) WITH t, nb_ases, data_source_ases, count(DISTINCT p) as nb_prefixes, COLLECT(DISTINCT cat_p.reference_org) as data_source_prefixes
      OPTIONAL MATCH (t)<-[cat_d:CATEGORIZED]-(:URL)-[:PART_OF]-(d:HostName) WITH t, nb_ases, data_source_ases, nb_prefixes, data_source_prefixes, count(DISTINCT d) as nb_domains, COLLECT(DISTINCT cat_d.reference_org) as data_source_domains
      RETURN  nb_domains, nb_ases, nb_prefixes, data_source_ases, data_source_domains, data_source_prefixes`
    }
  ]
  let params = { tag: props.tag }
  let results = await iyp_api.run(
    queries.map((obj) => ({ statement: obj.query, parameters: params }))
  )

  selectedWidgets.value = results[0][0]
  if (selectedWidgets.value.nb_domains > 0) {
    selects.value[0].hasData = true
  }
  if (selectedWidgets.value.nb_ases > 0) {
    selects.value[1].hasData = true
  }
  if (selectedWidgets.value.nb_prefixes > 0) {
    selects.value[2].hasData = true
  }
}

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
  selects.value.forEach((obj) => {
    if (obj.hasData) {
      obj.value = selectAll.value
    }
  })
})

onMounted(() => {
  init()
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
      <span v-for="(select, index) in selects" :key="index">
        <QCheckbox v-if="select.hasData" v-model="select.value" :label="select.label" />
      </span>
      <QCheckbox v-model="selectAll" label="All" />
    </QCardSection>
  </QCard>
  <!-- Overview -->
  <!-- <TagOverview
    :tag="tag"
    class="card"
    v-if="selects[0].value"
  /> -->
  <!-- All -->
  <GenericCardController
    v-if="selects[0].value && selects[0].hasData"
    :title="$t('iyp.tag.domains.title')"
    :sub-title="
      $t('iyp.tag.domains.caption') + tag + ' by ' + selectedWidgets.data_source_domains.join(', ')
    "
    :info-title="$t('iyp.tag.domains.info.title')"
    :info-description="$t('iyp.tag.domains.info.description')"
    class="card"
  >
    <TagPopularHostNames :tag="tag" />
  </GenericCardController>
  <GenericCardController
    v-if="selects[1].value && selects[1].hasData"
    :title="$t('iyp.tag.ases.title')"
    :sub-title="
      $t('iyp.tag.ases.caption') + tag + ' by ' + selectedWidgets.data_source_ases.join(', ')
    "
    :info-title="$t('iyp.tag.ases.info.title')"
    :info-description="$t('iyp.tag.ases.info.description')"
    class="card"
  >
    <TagAutonomousSystems :tag="tag" />
  </GenericCardController>
  <GenericCardController
    v-if="selects[2].value && selects[2].hasData"
    :title="$t('iyp.tag.prefixes.title')"
    :sub-title="
      $t('iyp.tag.prefixes.caption') +
      tag +
      ' by ' +
      selectedWidgets.data_source_prefixes.join(', ')
    "
    :info-title="$t('iyp.tag.prefixes.info.title')"
    :info-description="$t('iyp.tag.prefixes.info.description')"
    class="card"
  >
    <TagPrefixes :tag="tag" />
  </GenericCardController>
</template>

<style>
.card {
  margin-top: 20px;
}
</style>
