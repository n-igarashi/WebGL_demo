<template>
  <div class="container">
    <div id="canvas" ref="canvas"></div>
  </div>
</template>

<script>
import three from '@/plugins/three.js'
export default {
  mounted() {
    // canvas取得
    const canvas = this.$refs.canvas
    this.three = new three({canvas})

  },

  methods: {
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
#canvas {
  width: 1000px;
  height: 1000px;
}
</style>
