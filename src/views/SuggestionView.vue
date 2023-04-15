<template>
  <TopTitle> </TopTitle>
  <SuggestionTable
    label="待审核:"
    :headers="headers"
    :delOnly="isDeleteOnly"
    :foodData="foodData"
  ></SuggestionTable>
</template>
<script setup>
import TopTitle from "@/components/TopTitle.vue";
// import DataTable from "@/components/DataTable.vue";
import SuggestionTable from "@/components/SuggestionTable.vue";
import { ref } from "vue";
import { watchEffect } from "vue";
watchEffect(async () => {
  const response = await fetch(
    "https://www.qsc.zju.edu.cn/playground/eat/api/suggestion/get",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ pwd: "233" }),
    }
  );
  // console.log("watched");
  // console.log(response);
  const json = await response.json();
  console.log(json);
  if (json.code === 0) {
    foodData.value = json.data;
    console.log(foodData.value);
  }
});

const headers = [
  {
    title: "ID",
    key: "userid",
    sortable: false,
    width: "10%",
  },
  {
    title: "平台建议",
    key: "details",
    sortable: false,
  },
  {
    title: "Actions",
    key: "actions",
    sortable: false,
    width: "100px",
  },
];
const isDeleteOnly = ref(true);
const foodData = ref([]);
</script>
