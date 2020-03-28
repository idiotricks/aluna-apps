<template>
  <div>
    <ui-common-header app="Kelola Transaksi Produk Masuk" />
    <ui-common-action>
      <b-button-group size="sm" v-if="segmentA">
        <ui-common-pagination
          :totalRows="totalStockIn"
          :currentPage="queryStockIn.page"
          @paginate="onPaginateStockIn"
        />
      </b-button-group>
      <b-button-group size="sm" v-if="segmentA">
        <b-button @click="onExportCSVStockIn()">
          Ekspor CSV
        </b-button>
        <b-button @click="onExportPDFStockIn()">
          Ekspor PDF
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentA">
        <b-button variant="primary" @click="onCreateStockIn()">
          Buat Transaksi Masuk
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button variant="primary" v-if="!stockIn.is_calculate" @click="onCalculateStockIn(stockIn)">
          Naikan Stok
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button v-if="!stockIn.is_calculate && stockIn.supplier" @click="() => $refs['modalCreateSupplier'].show()">
          Ubah Pemasok
        </b-button>
        <b-button v-if="!stockIn.is_calculate && stockIn.supplier" @click="onEditStockIn(stockIn.id, 'supplier', null)">
          Hapus Pemasok
        </b-button>
        <b-button v-if="!stockIn.is_calculate && !stockIn.supplier" @click="onAllSupplier()">
          Cari Pemasok
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button v-if="!stockIn.is_calculate" @click="onAllProduct()">
          Cari Produk
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button v-if="stockIn.is_calculate" @click="onPrintPDFStockIn(stockIn)">
          Simpan ke PDF
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button
          variant="outline-secondary"
          v-if="!stockIn.is_calculate"
          @click="onDeleteStockIn(stockIn)"
          title="Trash"
        >
          {{ stockIn.is_init ? 'Batalkan' : 'Hapus' }}
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button @click="onAllStockIn()">
          Tutup
        </b-button>
      </b-button-group>
    </ui-common-action>
    <b-container :fluid="true" class="mb-4">
      <b-row>
        <b-col>
          <b-card
            header-bg-variant="secondary"
            header-text-variant="light"
            border-variant="secondary"
            no-body
          >
            <stock-in-list
              :objs="stockIns"
              :fields="[
                {key: 'numcode', label: 'Kode Transaksi'},
                {key: 'date', label: 'Tanggal'},
                {key: 'supplier_name', label: 'Pemasok'},
                {key: 'supplier_phone', label: 'Kontak Pemasok'},
                {key: 'is_calculate', label: 'Status Stok'}
              ]"
              @take="onTakeStockIn"
            />
          </b-card>
        </b-col>
        <b-col v-if="segmentA" cols="3">
          <b-card
            header-bg-variant="secondary"
            header-text-variant="light"
            border-variant="secondary"
            header="Pencarian Transaksi Produk Masuk"
          >
            <p>
              <small class="text-muted">
                Cari transaksi produk masuk berdasarkan kode transaksi,
                nama pemasok atau nama pembuat transaksi
              </small>
            </p>
            <ui-common-search @search="onSearchStockIn" />
          </b-card>
          <b-card
            header-bg-variant="secondary"
            header-text-variant="light"
            border-variant="secondary"
            class="mt-4"
            header="Filter Transaksi Produk Masuk dengan Tanggal"
          >
            <p>
              <small class="text-muted">
                Filter transaksi produk masuk berdasarkan tanggal dibuat
                dengan rentangan tanggal awal dan akhir
              </small>
            </p>
            <ui-common-date-filter @filter="onDateFilterStockIn" />
          </b-card>
        </b-col>
        <b-col v-if="segmentB" cols="6">
          <b-card
            header-bg-variant="secondary"
            header-text-variant="light"
            border-variant="secondary"
            v-if="!stockIn.is_calculate"
            header="Ubah Data Transaksi Produk Masuk"
          >
            <stock-in-edit
              :obj="stockIn"
              @edit="onEditStockIn"
            />
          </b-card>
          <b-card
            header-bg-variant="secondary"
            header-text-variant="light"
            border-variant="secondary"
            no-body
            v-if="stockIn.is_calculate"
            header="Transaksi Produk Masuk"
          >
            <stock-in-detail
              :obj="stockIn"
              :fields="[
                {key: 'numcode', label: 'Kode Transaksi'},
                {key: 'date', label: 'Tanggal'}
              ]"
            />
          </b-card>
          <b-card
            header-bg-variant="secondary"
            header-text-variant="light"
            border-variant="secondary"
            no-body
            class="mt-4"
            header="Pemasok"
          >
            <supplier-detail :fields="[
              {key: 'numcode', label: 'Kode Pemasok'},
              {key: 'name', label: 'Nama'},
              {key: 'phone', label: 'Nomer Telepon'},
              {key: 'address', label: 'Alamat'}
            ]" :obj="supplier" />
          </b-card>
          <b-card
            header-bg-variant="secondary"
            header-text-variant="light"
            border-variant="secondary"
            no-body
            class="mt-4"
            header="Daftar Produk Terpilih"
          >
            <item-in-list
              :objs="itemIns"
              :fields="[
                {key: 'product_name', label: 'Produk'},
                {key: 'product_stock', label: 'Stok Produk'},
                {key: 'quantity', label: 'Jumlah Stok Masuk'}
              ]"
              @take="onTakeItemIn"
            />
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <!-- POPUP MODAL -->
    <b-modal
      ref="modalAllSupplier"
      title="Daftar Pemasok"
      hide-header-close
      hide-footer
      size="lg"
    >
      <b-row class="mb-4">
        <b-col cols="9">
          <ui-common-search @search="onSearchSupplier" />
        </b-col>
        <b-col cols="3">
          <b-button-group>
            <b-button block @click="onCreateSupplier">
              Pemasok Baru
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-card
            header-bg-variant="secondary"
            header-text-variant="light"
            border-variant="secondary"
            no-body
          >
            <supplier-list
              :objs="suppliers"
              :fields="[
                {key: 'numcode', label: 'Kode Pemasok'},
                {key: 'name', label: 'Nama'},
                {key: 'phone', label: 'Nomer Telepon'}
              ]"
              @take="onTakeSupplier"
            />
          </b-card>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      ref="modalCreateSupplier"
      title="Ubah Data Pemasok"
      hide-header-close
      hide-footer
      size="lg"
    >
      <b-row>
        <b-col>
          <supplier-edit
            :obj="supplier"
            @edit="onEditSupplier"
          />
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      ref="modalAllProduct"
      title="Daftar Produk"
      hide-header-close
      hide-footer
      size="lg"
    >
      <b-row class="mb-4">
        <b-col cols="12">
          <p>
            <small class="text-muted">
              Cari produk berdasarkan
              kode produk, nama produk
              atau pembuat produk
            </small>
          </p>
          <ui-common-search
            @search="onSearchProduct"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-card
            header-bg-variant="secondary"
            header-text-variant="light"
            border-variant="secondary"
            no-body
          >
            <product-list
              :objs="products"
              :fields="[
                {key: 'numcode', label: 'Kode Produk'},
                {key: 'name', label: 'Nama'},
                {key: 'stock', label: 'Stok Tersedia'},
                {key: 'cogs', label: 'Harga Beli (Rp)'},
                {key: 'price', label: 'Harga Jual (Rp)'}
              ]"
              @take="onTakeProduct"
            />
          </b-card>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      ref="modalEditItemIn"
      title="Ubah Data Produk Terpilih"
      hide-header-close
      hide-footer
      size="lg"
    >
      <b-row>
        <b-col>
          <item-in-edit
            @edit="onEditItemIn"
            :obj="itemIn"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button-group>
            <b-button @click="onDeleteItemIn(itemIn)">Hapus</b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import UICommonHeader from '@/ui/commons/UICommonHeader'
import UICommonAction from '@/ui/commons/UICommonAction'
import UICommonPagination from '@/ui/commons/UICommonPagination'
import UICommonSearch from '@/ui/commons/UICommonSearch'
import UICommonDateFilter from '@/ui/commons/UICommonDateFilter'

import HelperAlert from '@/helpers/HelperAlert'

import StockInMixin from '@/components/stockins/StockInMixin'
import StockInList from '@/components/stockins/StockInList'
import StockInEdit from '@/components/stockins/StockInEdit'
import StockInDetail from '@/components/stockins/StockInDetail'

import SupplierMixin from '@/components/suppliers/SupplierMixin'
import SupplierList from '@/components/suppliers/SupplierList'
import SupplierEdit from '@/components/suppliers/SupplierEdit'
import SupplierDetail from '@/components/suppliers/SupplierDetail'

import ProductMixin from '@/components/products/ProductMixin'
import ProductList from '@/components/products/ProductList'
import ProductEdit from '@/components/products/ProductEdit'

import ItemInMixin from '@/components/itemins/ItemInMixin'
import ItemInList from '@/components/itemins/ItemInList'
import ItemInEdit from '@/components/itemins/ItemInEdit'

export default {
  name: 'view-common-stock-in',
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
    'stock-in-list': StockInList,
    'stock-in-edit': StockInEdit,
    'stock-in-detail': StockInDetail,
    'supplier-list': SupplierList,
    'supplier-edit': SupplierEdit,
    'supplier-detail': SupplierDetail,
    'product-list': ProductList,
    'product-edit': ProductEdit,
    'item-in-list': ItemInList,
    'item-in-edit': ItemInEdit
  },
  mixins: [
    HelperAlert,
    ProductMixin,
    StockInMixin,
    SupplierMixin,
    ItemInMixin
  ],
  methods: {
    async onAllStockIn () {
      try {
        this.setQuerySearchStockIn(null)
        this.setQueryDateRangeStockIn(null, null)
        await this.allStockIn()
        this.segmentA = true
        this.segmentB = false
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onTakeStockIn (stockIn) {
      try {
        await this.getStockIn(stockIn.id)
        await this.getSupplier(stockIn.supplier)
        this.setQueryStockInItemIn(this.stockIn.id)
        await this.allItemIn()
        this.segmentA = false
        this.segmentB = true
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onCreateStockIn () {
      try {
        await this.createStockIn()
        await this.getSupplier(this.stockIn.supplier)
        this.setQueryStockInItemIn(this.stockIn.id)
        await this.allItemIn()
        this.segmentA = false
        this.segmentB = true
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onEditStockIn (id, field, value) {
      console.log(value)
      try {
        if (this.stockIn.is_calculate) {
          this.messageWarning(
            'Proses ini tidak diizinkan karena stok sudah di adjust'
          )
          return
        }
        await this.editStockIn(id, field, value)
        await this.getSupplier(this.stockIn.supplier)
        await this.allStockIn()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onDeleteStockIn (stockIn) {
      try {
        const confirm = await this.deleteConfirm(stockIn.numcode)
        if (confirm) {
          this.segmentA = true
          this.segmentB = false
          this.deleteStockIn(stockIn.id)
          this.resetStockIn()
          this.allStockIn()
        }
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onSearchStockIn (search) {
      try {
        this.setQuerySearchStockIn(search)
        await this.allStockIn()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onPaginateStockIn (page) {
      try {
        this.setQueryPageStockIn(page)
        await this.allStockIn()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onDateFilterStockIn (startDate, endDate) {
      try {
        this.setQueryDateRangeStockIn(startDate, endDate)
        await this.allStockIn()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onCalculateStockIn (stockIn) {
      try {
        if (this.stockIn.is_calculate) {
          this.messageWarning(
            'Proses ini tidak diizinkan karena stok sudah di adjust'
          )
          return
        }
        await this.calculateStockIn(stockIn.id)
        await this.allStockIn()
        this.messageSuccess('Berhasil melakukan penambahan stok')
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onExportCSVStockIn () {
      try {
        const data = await this.exportCSVStockIn()
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        const date = new Date()
        link.href = url
        link.setAttribute(
          'download',
          `report-stock-in-${date.toLocaleDateString()}.csv`
        )
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onExportPDFStockIn () {
      try {
        const data = await this.exportPDFStockIn()
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        const date = new Date()
        link.href = url
        link.setAttribute(
          'download',
          `report-stock-in-${date.toLocaleDateString()}.pdf`
        )
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onPrintPDFStockIn (stockIn) {
      try {
        const data = await this.printPDFStockIn(stockIn.id)
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        const date = new Date()
        link.href = url
        link.setAttribute(
          'download',
          `report-stock-in-${date.toLocaleDateString()}.pdf`
        )
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onAllSupplier () {
      try {
        this.setQuerySearchSupplier(null)
        await this.allSupplier()
        this.$refs['modalAllSupplier'].show()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onTakeSupplier (supplier) {
      try {
        await this.getSupplier(supplier.id)
        await this.editStockIn(this.stockIn.id, 'supplier', supplier.id)
        await this.allStockIn()
        this.$refs['modalAllSupplier'].hide()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onSearchSupplier (search) {
      try {
        await this.setQuerySearchSupplier(search)
        await this.allSupplier()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onCreateSupplier () {
      try {
        await this.createSupplier()
        this.$refs['modalCreateSupplier'].show()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onEditSupplier (id, field, value) {
      try {
        await this.editSupplier(id, field, value)
        await this.allSupplier()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onAllProduct () {
      try {
        this.setQuerySearchProduct(null)
        await this.allProduct()
        this.$refs['modalAllProduct'].show()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onTakeProduct (product) {
      try {
        await this.getProduct(product.id)
        await this.createItemIn({
          stockin: this.stockIn.id,
          product: this.product.id,
          quantity: 0
        })
        await this.allItemIn()
        this.$refs['modalEditItemIn'].show()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onSearchProduct (search) {
      try {
        this.setQuerySearchProduct(search)
        await this.allProduct()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onTakeItemIn (itemIn) {
      try {
        if (this.stockIn.is_calculate) {
          this.messageWarning(
            'Proses ini tidak diizinkan karena stok sudah di adjust'
          )
          return
        }
        await this.getItemIn(itemIn.id)
        this.$refs['modalEditItemIn'].show()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onEditItemIn (id, field, value) {
      try {
        if (this.stockIn.is_calculate) {
          this.messageWarning(
            'Proses ini tidak diizinkan karena stok sudah di adjust'
          )
          return
        }
        await this.editItemIn(id, field, value)
        await this.allItemIn()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onDeleteItemIn (itemIn) {
      try {
        if (this.stockIn.is_calculate) {
          this.messageWarning(
            'Proses ini tidak diizinkan karena stok sudah di adjust'
          )
          return
        }
        const confirm = await this.deleteConfirm(itemIn.product_name)
        if (confirm) {
          this.$refs['modalEditItemIn'].hide()
          await this.deleteItemIn(itemIn.id)
          await this.allItemIn()
        }
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    }
  },
  mounted () {
    this.onAllStockIn()
  }
}
</script>

<style>

</style>
