<template>
  <v-card class="mx-auto mt-10" max-width="1200" outlined>
    <v-card-title>{{ label }}条</v-card-title>
    <v-data-table
      :headers="headers"
      :items="foodData"
      class="elevation-1"
      fixed-header
      height="350px"
    >
      <!-- <v-divider></v-divider> -->
      <template v-slot:[`item.foodName`]="{ item }">
        <v-text-field
          v-model="editedItem.foodName"
          :hide-details="true"
          dense
          single-line
          :autofocus="true"
          v-if="item.raw.id === editedItem.id"
        ></v-text-field>
        <span v-else>{{ item.raw.foodName }}</span>
      </template>
      <template v-slot:[`item.foodID`]="{ item }">
        <v-text-field
          v-model="editedItem.foodID"
          :hide-details="true"
          dense
          single-line
          :autofocus="true"
          v-if="item.raw.id === editedItem.id"
        ></v-text-field>
        <span v-else>{{ item.raw.foodID }}</span>
      </template>
      <template v-slot:[`item.tags`]="{ item }">
        <v-chip>
          {{ item.raw.tags }}
        </v-chip>
      </template>
      <template v-slot:[`item.image`]="{ item }">
        <v-img
          :src="'data:image/jpeg;base64,' + item.image"
          max-width="100px"
          max-height="100px"
          contain
        ></v-img>
      </template>
      <template v-slot:[`item.description`]="{ item }">
        <v-text-field
          v-model="editedItem.description"
          :hide-details="true"
          dense
          single-line
          :autofocus="true"
          v-if="item.raw.id === editedItem.id"
        ></v-text-field>
        <span v-else>{{ item.raw.description }}</span>
      </template>

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
      foodID: "",
      foodName: "",
      tags: "",
      description: "",
      calories: 0,
    },
    defaultItem: {
      id: 0,
      name: "New Item",
      calories: 0,
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

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.foods = [
        {
          id: 1,
          foodID: "zjg007",
          foodName: "鱼饭",
          // calories: 120,
          tags: "123",
          description: "delicious",
          image: "",
        },
        {
          id: 2,
          foodID: "zjg009",
          foodName: "鱼饭",
          // calories: 120,
          tags: "123",
          description: "delicious",
          image: "",
        },
        {
          id: 3,
          foodID: "zjg010",
          foodName: "鱼饭",
          // calories: 120,
          tags: "456",
          description: "delicious",
          image: "",
        },
        {
          id: 4,
          foodID: "zjg007",
          foodName: "鱼饭",
          // calories: 120,
          tags: "123",
          description: "delicious",
          image: "",
        },
      ];
    },

    editItem(item) {
      console.log(item);
      this.editedIndex = this.foods.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);
      // this.dialog = true;
    },

    deleteItem(item) {
      console.log(item);
      this.editedIndex = this.foods.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      console.log(this.editedIndex);
      this.foods.splice(this.editedIndex, 1);
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
