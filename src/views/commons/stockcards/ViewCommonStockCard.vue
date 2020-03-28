<template>
  <div>
    <ui-common-header app="Kartu Stok" />
    <ui-common-action>
      <b-button-group size="sm" v-if="segmentA">
        <ui-common-pagination
          :totalRows="totalStockCard"
          :currentPage="queryStockCard.page"
          @paginate="onPaginateStockCard"
        />
      </b-button-group>
      <b-button-group
        size="sm"
        v-if="segmentA"
      >
        <b-button @click="onExportCSVStockCard">Ekspor CSV</b-button>
        <b-button @click="onExportPDFStockCard">Ekspor PDF</b-button>
      </b-button-group>
    </ui-common-action>
    <b-container :fluid="true">
      <b-row>
        <b-col>
          <b-card
            header-bg-variant="secondary"
            header-text-variant="light"
            border-variant="secondary"
            no-body
          >
            <stock-card-list
              :objs="stockCards"
              :fields="[
                {key: 'numcode', label: 'Kode Transaksi'},
                {key: 'date', label: 'Tanggal'},
                {key: 'product_name', label: 'Produk'},
                {key: 'init_balance', label: 'Saldo Awal'},
                {key: 'total_in', label: 'Stok Masuk'},
                {key: 'total_out', label: 'Stok Keluar'},
                {key: 'end_balance', label: 'Saldo Akhir'}
              ]"
            />
          </b-card>
        </b-col>
        <b-col cols="3">
          <b-card
            header-bg-variant="secondary"
            header-text-variant="light"
            border-variant="secondary"
            header="Pencarian Kartu Stok"
          >
            <p>
              <small class="text-muted">
                Cari kartu stok berdasarkan kode transaksi
                atau nama produk
              </small>
            </p>
            <ui-common-search @search="onSearchStockCard" />
          </b-card>
          <b-card
            header-bg-variant="secondary"
            header-text-variant="light"
            border-variant="secondary"
            class="mt-4"
            header="Filter Kartu Stok dengan Tanggal"
          >
            <p>
              <small class="text-muted">
                Filter kartu stok berdasarkan tanggal dibuat
                dengan rentangan tanggal awal dan akhir
              </small>
            </p>
            <ui-common-date-filter @filter="onDateFilterStockCard" />
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UICommonHeader from '@/ui/commons/UICommonHeader'
import UICommonAction from '@/ui/commons/UICommonAction'
import UICommonPagination from '@/ui/commons/UICommonPagination'
import UICommonSearch from '@/ui/commons/UICommonSearch'
import UICommonDateFilter from '@/ui/commons/UICommonDateFilter'

import HelperAlert from '@/helpers/HelperAlert'

import StockCardMixin from '@/components/stockcards/StockCardMixin'
import StockCardList from '@/components/stockcards/StockCardList'

export default {
  name: 'view-common-stock-card',
  data () {
    return {
      segmentA: true,
      segmentB: false
    }
  },
  components: {
    'ui-common-header': UICommonHeader,
    'ui-common-action': UICommonAction,
    'ui-common-pagination': UICommonPagination,
    'ui-common-search': UICommonSearch,
    'ui-common-date-filter': UICommonDateFilter,
    'stock-card-list': StockCardList
  },
  mixins: [
    StockCardMixin,
    HelperAlert
  ],
  methods: {
    async onAllStockCard () {
      try {
        await this.allStockCard()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onSearchStockCard (search) {
      try {
        this.setQuerySearchStockCard(search)
        await this.allStockCard()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onDateFilterStockCard (startDate, endDate) {
      try {
        this.setQueryDateRangeStockCard(startDate, endDate)
        await this.allStockCard()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onPaginateStockCard (page) {
      try {
        this.setQueryPageStockCard(page)
        await this.allStockCard()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onExportCSVStockCard () {
      try {
        const data = await this.exportCSVStockCard()
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        const date = new Date()
        link.href = url
        link.setAttribute(
          'download',
          `report-stock-card-${date.toLocaleDateString()}.csv`
        )
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onExportPDFStockCard () {
      try {
        const data = await this.exportPDFStockCard()
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        const date = new Date()
        link.href = url
        link.setAttribute(
          'download',
          `report-stock-card-${date.toLocaleDateString()}.pdf`
        )
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    }
  },
  async mounted () {
    await this.onAllStockCard()
  }
}
</script>

<style>

</style>
