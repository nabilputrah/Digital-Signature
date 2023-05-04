<template>
  <div >
    <!-- Start Breadcrumbs -->
    <v-breadcrumbs style="margin-left: 0.5%;">
      <h4 style="color: #1a5f7a;">Data KoTA</h4>
      <h4 style="margin-left: 1%;margin-right: 1%; color: #1a5f7a;">|</h4>
      <v-breadcrumbs-item 
      :disabled="false" 
      to="/">
        <v-icon >mdi-home-outline</v-icon>
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="true">
        /
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="true"
      to="/KoTA">
        <span>Data KoTA</span>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <!-- End Breadcrumbs -->

    <!-- Start Datatables -->
    <v-card class="custom-card">
      <v-data-table
        :search="search"
        :headers="headers"
        :items="KoTA"
        sort-by="calories"
        class="elevation-1"
        style="padding-top: 0.5%;"
      >
        <template v-slot:top>
          <v-toolbar
            dense
            flat
          >
            <v-toolbar-title>Data KoTA</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="sendAllEmail(item)"
              style="margin-top: auto;margin-bottom: auto; margin-right: 1%;" 
            >
              Email All
            </v-btn>
            <v-btn
              color="primary"
              :to="`/KoTA/tambah_KoTA`"
              style="margin-top: auto;margin-bottom: auto;" 
            >
              + Add KoTA
            </v-btn>
            <!-- Start Card Pop up Email Data KoTA -->
            <v-dialog v-model="dialogEmail" max-width="350">
              <v-card>
                <v-card-title class="headline">
                  Send Email 
                </v-card-title>
                <v-card-text>
                  <div>Are you sure you want to send email to this account?</div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="sendEmailConfirm"
                  >
                    Yes
                  </v-btn>
                  <v-btn
                    color="primary"
                    text
                    @click="closeEmail"
                  >
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- End Card Pop up Email Data KoTA -->
            <!-- Start Card Pop up Email All Data KoTA -->
            <v-dialog v-model="dialogAllEmail" max-width="350">
              <v-card>
                <v-card-title class="headline">
                  Send Email 
                </v-card-title>
                <v-card-text>
                  <div>Are you sure you want to send email to all account?</div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="sendAllEmailConfirm"
                  >
                    Yes
                  </v-btn>
                  <v-btn
                    color="primary"
                    text
                    @click="closeAllEmail"
                  >
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- End Card Pop up Email All Data KoTA -->
          </v-toolbar>

          <!-- Start Input Search -->
          <v-text-field
            dense
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            style="width: 15%;margin-right: 1%; margin-bottom: 0.5%; "
            class="custom-card"
          ></v-text-field>
          <!-- End Input Search -->
        </template>
        <!-- Start Kolom Action -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="redirectToEdit(item.ID_KoTA)"
          >
            mdi-pencil-outline
          </v-icon>
          <v-icon
            small
            @click="sendEmail(item)"
          >
            mdi-email-outline
          </v-icon>
        </template>
        <!-- End Kolom Action -->
        <!-- Start Kolom Dokumen -->
        <template v-slot:[`item.dokumen`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="redirectToDetail(item.ID_KoTA)"
          >
            mdi-file-document-arrow-right
          </v-icon>
        </template>
        <!-- End Kolom Dokumen -->
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <!-- End Datatables -->
  </div>

</template>

<script>
  export default {
    data: () => ({
      search : '',
      dialogEmail: false,
      dialogAllEmail : false,
      headers: [
        {
          text: 'ID KoTA',
          align: 'start',
          value: 'ID_KoTA',
        },
        { text: 'Tahun Ajaran', value: 'tahun_ajaran' },
        { text: 'Dokumen Laporan', value: 'dokumen', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      KoTA: [],
      editedIndex: -1,
      editedItem: {
        NIP: '',
        nama: '',
        email: '',
      },
      defaultItem: {
        NIP: '',
        nama: '',
        email: '',
      },
    }),

    mounted () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.KoTA = [
          {
            ID_KoTA: 402,
            tahun_ajaran: '2022/2023',
          },
          {
            ID_KoTA: 403,
            tahun_ajaran: '2023/2024',
          },
        ]
      },

      redirectToDetail(ID_KoTA) {
        this.$router.push(`/dokumen_detail/${ID_KoTA}`);
      },

      redirectToEdit(ID_KoTA) {
        this.$router.push(`/KoTA/detail_KoTA/${ID_KoTA}`);
      },

      sendEmail () {
        this.dialogEmail = true
      },

      sendAllEmail () {
        this.dialogAllEmail = true
      },
      
      sendEmailConfirm () {
        this.closeEmail()
      },

      sendAllEmailConfirm () {
        this.closeAllEmail()
      },

      closeEmail () {
        this.dialogEmail = false
      },

      closeAllEmail () {
        this.dialogAllEmail = false
      },

    },
  }
</script>



<style scoped>

.theme--light.v-sheet{
  color: #1a5f7a;
}
.custom-card {
  width: 97%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
}

.theme--light.v-icon{
  color:#1A5F7A;
}

.header_bg{
  background-color: #91BBCB
  ;
}

::v-deep .v-data-table-header{
  background-color: rgba(145, 187, 203, 0.35);
}
::v-deep .v-data-table-header span{
  color: #1A5F7A;
}

::v-deep .theme--light.v-data-table .v-data-table-header th.sortable.active .v-data-table-header__icon {
  color: #1A5F7A;
}

::v-deep .theme--light.v-data-table .v-data-table-header th.sortable .v-data-table-header__icon {
    color: rgba(145, 187, 203, 0.35);
}

</style>
