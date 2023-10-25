import { initWebGL, createShader, createProgram } from './gl-utils.js';

const vertexShaderSource = `
  attribute vec2 coordinates;
  void main(void) {
    gl_Position = vec4(coordinates, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  void main(void) {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

const vertices = new Float32Array([
    0.0, 0.5,
    -0.5, -0.5,
    0.5, -0.5,
]);

const glCanvas = document.getElementById('glCanvas');
const gl = initWebGL(glCanvas);

if (!gl) {
    console.log('WebGL not supported, falling back on experimental-webgl');
    gl = glCanvas.getContext('experimental-webgl');
}

if (!gl) {
    alert('Your browser does not support WebGL');
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

const shaderProgram = createProgram(gl, vertexShader, fragmentShader);
gl.useProgram(shaderProgram);

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const coord = gl.getAttribLocation(shaderProgram, 'coordinates');
gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coord);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.viewport(0, 0, glCanvas.width, glCanvas.height);
gl.drawArrays(gl.TRIANGLES, 0, 3);
