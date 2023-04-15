<template>
  <v-card class="mx-auto mt-10" max-width="1200" outlined>
    <v-card-title>{{ label }}{{ foodData.length }}条</v-card-title>
    <v-data-table
      :headers="headers"
      :items="foodData"
      class="elevation-1"
      fixed-header
      height="350"
      width="100%"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <div v-if="delOnly">
          <v-icon color="red" @click="deleteItem(item.raw)">
            mdi-delete
          </v-icon>
        </div>
        <div v-else>
          <div v-if="check">
            <div v-if="item.raw.id === editedItem.id">
              <v-icon color="red" class="mr-3" @click="close">
                mdi-window-close
              </v-icon>
              <v-icon color="green" class="mr-3" @click="save">
                mdi-content-save
              </v-icon>
              <v-icon color="blue" class="mr-3" @click="deleteItem(item.raw)">
                mdi-check
              </v-icon>
            </div>

            <div v-else>
              <v-icon color="green" class="mr-3" @click="editItem(item.raw)">
                mdi-pencil
              </v-icon>
              <v-icon color="red" class="mr-3" @click="deleteItem(item.raw)">
                mdi-delete
              </v-icon>
              <v-icon color="blue" class="mr-3" @click="deleteItem(item.raw)">
                mdi-check
              </v-icon>
            </div>
          </div>
          <div v-else>
            <div v-if="item.raw.id === editedItem.id">
              <v-icon color="red" class="mr-3" @click="close">
                mdi-window-close
              </v-icon>
              <v-icon color="green" class="mr-3" @click="save">
                mdi-content-save
              </v-icon>
            </div>

            <div v-else>
              <v-icon color="green" class="mr-3" @click="editItem(item.raw)">
                mdi-pencil
              </v-icon>
              <v-icon color="red" class="mr-3" @click="deleteItem(item.raw)">
                mdi-delete
              </v-icon>
            </div>
          </div>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { VDataTable } from "vuetify/labs/VDataTable";
export default {
  components: {
    VDataTable,
  },
  props: ["label", "headers", "delOnly", "check", "foodData"],
  data: () => ({
    dialog: false,
    dialogDelete: false,

    foods: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      userid: 0,
      details: "",
    },
    defaultItem: {
      id: 0,
      userid: 0,
      details: "",
    },
  }),

  computed: {
    // formTitle() {
    //   return this.editedIndex === -1 ? "New Item" : "Edit Item";
    // },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    async deleteItem(item) {
      let self = this;
      console.log(item.id);

      // this.editedIndex = this.foods.indexOf(item);
      this.editedIndex = self.foodData.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      console.log("deleteItem props", this.editedIndex);
      self.foodData.splice(this.editedIndex, 1);
      const response = await fetch(
        "https://www.qsc.zju.edu.cn/playground/eat/api/suggestion/clean",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: item.id,
            pwd: "fcu_kvf_ktn_tpgj_pndc",
          }),
        }
      );
      // this.foods.splice(this.editedIndex, 1);
      // item.splice();
      // this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.closeDelete();
    },

    close() {
      // this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.foods[this.editedIndex], this.editedItem);
      }
      // } else {
      //   this.foods.push(this.editedItem);
      // }
      this.close();
    },
  },
};
</script>
<style>
.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background: #555;
  color: #fff;
}
.w-100 {
  width: 100%;
}
</style>
