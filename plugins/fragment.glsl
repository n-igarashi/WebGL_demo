precision mediump float;
uniform float t; // time
uniform vec2  r; // resolution

void main(void){
  // 緑色
  gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);

  // グラデーション
  // float a = gl_FragCoord.x / 512.0;
  // gl_FragColor = vec4(vec3(a), 1.0);
}
