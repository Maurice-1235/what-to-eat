<script>
export default {};
</script>
<template>
  <div>
    <h1>后台管理</h1>
  </div>
  <div class="btn-container">
    <!-- <nav> -->
    <RouterLink to="/" style="text-decoration: none; color: inherit"
      ><v-btn size="large" color="#FEC988"
        ><text> 建议平台类</text>
      </v-btn></RouterLink
    >
    <RouterLink to="/suggestion" style="text-decoration: none; color: inherit"
      ><v-btn size="large" color="#B5A490">
        <text>推荐菜品类</text>
      </v-btn></RouterLink
    >
    <!-- </nav> -->
  </div>
</template>
<style>
h1 {
  font-weight: 700;
  font-size: 2.6rem;
  top: -10px;
  text-align: center;
}
.btn-container {
  text-align: center;
}
text {
  color: #666464;
  text-decoration: none;
}
</style>
