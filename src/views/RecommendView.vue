<template>
  <TopTitle></TopTitle>
  <RecommendTable
    label="待审核："
    :headers="headers"
    :delOnly="isDeleteOnly"
    :check="isCheck"
    :foodData="foodData"
  ></RecommendTable>
  <RecommendTable
    label="正式数据："
    :headers="headers"
    :check="false"
  ></RecommendTable>
</template>
<script setup>
import RecommendTable from "@/components/RecommendTable.vue";
import TopTitle from "@/components/TopTitle.vue";
import { ref } from "vue";
import { watchEffect } from "vue";
watchEffect(async () => {
  const response = await fetch(
    "https://www.qsc.zju.edu.cn/playground/eat/api/recommend/get",
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
    let image = new Image();
    image.src = json.data[0].image;
    console.log("data", json.data);
    // console.log("image", json.data[0].spiciness);
    // findDiet(json.data.diet);
    // findHalal(json.data.halal);
    // findSpicyness(json.data.spiciness);
    foodData.value = json.data;
    // console.log(foodData.value);
  }
});
function findDiet(num) {
  switch (num) {
    case 0:
      return "无";
    case 1:
      return "生冷类";
    case 2:
      return "发物类";
    case 3:
      return "海腥类";
    case 4:
      return "油腻类";
  }
}
function findHalal(type) {
  switch (type) {
    case false:
      return "非清真";
    case true:
      return "清真";
  }
}
function findLocation(num) {
  switch (num) {
    case 0:
      return "大食堂";
    case 1:
      return "东二";
    case 2:
      return "银泉";
    case 3:
      return "临湖";
    case 4:
      return "麦香";
    case 5:
      return "玉湖";
    case 6:
      return "澄湖";
    case 7:
      return "校外";
  }
}
function findDishes(num) {
  switch (num) {
    case 0:
      return "铁勺打菜";
    case 1:
      return "异国风情";
    case 2:
      return "传统中式";
    case 3:
      return "不吃正餐";
  }
}
function findWindow(num) {
  switch (num) {
    case 11:
      return "休闲餐厅F1";
    case 12:
      return "风味餐厅F1";
    case 13:
      return "有窗有空调";
    case 14:
      return "有窗有空调有风扇";
    case 15:
      return "有窗有空调有风扇有电扇";
    case 16:
      return "有窗有空调有风扇有电扇有风扇";
    case 21:
      return "无窗";
    case 22:
      return "有窗";
    case 31:
      return "无窗";
    case 32:
      return "有窗";
    case 33:
      return "有窗有空调";
    case 34:
      return "有窗有空调有风扇";
    case 35:
      return "有窗有空调有风扇有电扇";
    case 36:
      return "有窗有空调有风扇有电扇有风扇";
    case 41:
      return "无窗";
    case 42:
      return "有窗";
    case 51:
      return "无窗";
    case 61:
      return "无窗";
    case 62:
      return "有窗";
    case 71:
      return "无窗";
    case 72:
      return "有窗";
    case 73:
      return "有窗有空调";
    case 81:
      return "东";
    case 82:
      return "南";
    case 83:
      return "西";
    case 84:
      return "北";
  }
}
function findSpicyness(num) {
  switch (num) {
    case 0:
      return "不辣";
    case 1:
      return "微辣";
    case 2:
      return "中辣";
    case 3:
      return "重辣";
  }
}
const headers = [
  {
    title: "ID",
    key: "userid",
    sortable: false,
    width: "10%",
  },
  {
    title: "食物名称",
    key: "name",
    sortable: false,
    width: "20%",
  },
  {
    title: "tags",
    key: "tags",
    sortable: false,
  },
  {
    title: "文字描述",
    key: "description",
    sortable: false,
  },
  {
    title: "图片",
    key: "image",
    sortable: false,
  },
  {
    title: "Actions",
    key: "actions",
    sortable: false,
    width: "200px",
  },
];
const isDeleteOnly = ref(false);
const isCheck = ref(true);
const foodData = ref([]);
</script>
<style></style>
