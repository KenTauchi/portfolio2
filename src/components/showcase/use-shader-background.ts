import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./hooks";

/* Fullscreen-triangle fbm field. The cursor injects an exp(-d) ripple into
   the domain warp, so the fluid bends toward the pointer. */

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;

const FRAG = `
  precision highp float;
  uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse;
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f*f*(3.-2.*f);
    return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0., a = .5;
    for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.03; a *= .5; }
    return v;
  }
  void main(){
    vec2 uv = gl_FragCoord.xy / u_res;
    vec2 p = uv - .5; p.x *= u_res.x / u_res.y;
    vec2 m = u_mouse - .5; m.x *= u_res.x / u_res.y;

    float d = length(p - m);
    float ripple = exp(-d * 2.6);

    float warp = fbm(p * 1.7 + vec2(u_time * .05, -u_time * .035) + ripple * 1.1);
    float n = fbm(p * 2.6 + warp * 1.25 - vec2(u_time * .02));

    vec3 base  = vec3(.020, .020, .024);
    vec3 lime  = vec3(.843, .984, .227);
    vec3 flame = vec3(1.0, .361, .208);

    float bands = smoothstep(.42, .78, n);
    float edge  = smoothstep(.52, .56, n) - smoothstep(.56, .62, n);

    vec3 col = base;
    col = mix(col, lime * .26, bands * .40);
    col = mix(col, flame * .26, smoothstep(.62, .92, warp) * .35);
    col += lime * edge * .30;
    col += lime * ripple * .22;

    float vig = smoothstep(1.25, .25, length(uv - .5) * 1.5);
    col *= vig;
    col += (hash(uv * u_time) - .5) * .015;
    gl_FragColor = vec4(col, 1.);
  }`;

const FALLBACK = "radial-gradient(60% 60% at 50% 30%, rgba(215,251,58,.10), transparent 70%)";
const RENDER_SCALE = 0.6;

/**
 * Drives a WebGL canvas behind the hero.
 *
 * Renders at 0.6x resolution, pauses when scrolled out of view, holds a single
 * static frame under `prefers-reduced-motion`, and falls back to a CSS radial
 * gradient wherever a `webgl` context or shader compile is unavailable.
 */
export function useShaderBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const paintFallback = () => {
      canvas.style.background = FALLBACK;
    };

    const gl = canvas.getContext("webgl", { antialias: false, alpha: true });
    if (!gl) {
      paintFallback();
      return;
    }

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) {
      paintFallback();
      return;
    }

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      paintFallback();
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    const mouse = [0.5, 0.6];
    const target = [0.5, 0.6];
    let visible = true;
    let raf = 0;

    const resize = () => {
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * RENDER_SCALE));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * RENDER_SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const draw = (time: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse[0], mouse[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    resize();

    // Reduced motion: paint one frame and stop. No loop, no listeners.
    if (prefersReducedMotion()) {
      draw(0);
      const staticResize = () => {
        resize();
        draw(0);
      };
      window.addEventListener("resize", staticResize);
      return () => {
        window.removeEventListener("resize", staticResize);
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      };
    }

    const onMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      target[0] = (e.clientX - r.left) / r.width;
      target[1] = 1 - (e.clientY - r.top) / r.height;
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        visible = entry.isIntersecting;
      });
    });
    io.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    const start = performance.now();
    const render = () => {
      raf = requestAnimationFrame(render);
      if (!visible) return;
      mouse[0] += (target[0] - mouse[0]) * 0.05;
      mouse[1] += (target[1] - mouse[1]) * 0.05;
      draw((performance.now() - start) / 1000);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return ref;
}
