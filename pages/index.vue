<template>
  <div class="container">
    <canvas id="canvas" ref="canvas" width="1000px" height="1000px"></canvas>
  </div>
</template>

<script>
import vertex from '@/plugins/vertex.glsl'
import fragment from "@/plugins/fragment.glsl"

// -1から1で設定する。
// ３点を指定して
const positions = [
  -1, -1,
  -1, 1,
  1, 1
];
export default {
  mounted() {
    // canvas取得
    const canvas = this.$refs.canvas
    // WebGLRenderingContextを取得
    const gl = canvas.getContext("webgl")

    // shaderを読み込む
    const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertex);
    const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragment);

    const program = this.createProgram(gl, vertexShader, fragmentShader);

    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // canvasをクリアする
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionAttributeLocation);

    // positionBufferをARRAY_BUFFERに結び付ける
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // 属性にどうやってpositionBuffer（ARRAY_BUFFER)からデータを取り込むか。
    const size = 2;           // 呼び出すごとに2つの数値
    const type = gl.FLOAT;    // データは32ビットの数値
    const normalize = false;  // データをnormalizeしない
    const stride = 0;         // シェーダーを呼び出すごとに進む距離
                              // 0 = size * sizeof(type)
    const offset = 0;         // バッファーの頭から取り始める
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)

    const primitiveType = gl.TRIANGLES;
    const offsetDraw = 0;
    const count = 3;
    gl.drawArrays(primitiveType, offsetDraw, count);

  },

  methods: {
    createShader(gl, type, source) {
      // シェーダーを作成
      const shader = gl.createShader(type);
      // GLSLのコードをGPUにアップロード
      gl.shaderSource(shader, source);
      // シェーダーをコンパイル
      gl.compileShader(shader);

      const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if (success) {
        return shader; // 成功。シェーダーを返す
      }

      console.log(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
    },

    createProgram(gl, vertexShader, fragmentShader) {
      // プログラムを作成
      const program = gl.createProgram();
      // プログラムに頂点シェーダーを付ける
      gl.attachShader(program, vertexShader);
      // プログラムにフラグメントシェーダーを付ける
      gl.attachShader(program, fragmentShader);
      // プログラムをリンクする
      gl.linkProgram(program);

      const success = gl.getProgramParameter(program, gl.LINK_STATUS);
      if (success) {
        return program;  // 成功。プログラムを返す
      }

      console.log(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
    }
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

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
