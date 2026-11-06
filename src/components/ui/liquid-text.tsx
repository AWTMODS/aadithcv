"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface LiquidTextProps {
  text: string;
  tone?: "light" | "dark";
  viscosity?: number;
  trailLength?: number;
  autoplay?: boolean;
  className?: string;
  fontSize?: number;
}

function createShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGL2RenderingContext,
  vs: string,
  fs: string
): WebGLProgram | null {
  const vert = createShader(gl, gl.VERTEX_SHADER, vs);
  const frag = createShader(gl, gl.FRAGMENT_SHADER, fs);
  if (!vert || !frag) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vert);
  gl.attachShader(prog, frag);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn("Program link error:", gl.getProgramInfoLog(prog));
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

export default function LiquidText({
  text,
  tone = "dark",
  viscosity = 0.55,
  trailLength = 8,
  autoplay = false,
  className = "",
  fontSize,
}: LiquidTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5, px: 0.5, py: 0.5, active: false });
  const [webglSupported, setWebglSupported] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const textColor = tone === "light" ? "#ffffff" : "#111111";

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let gl: WebGL2RenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl2", {
        alpha: true,
        antialias: false,
        premultipliedAlpha: true,
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    if (!gl) {
      setWebglSupported(false);
      return;
    }

    // Try color buffer float extension
    gl.getExtension("EXT_color_buffer_float");

    const SIM_SIZE = 256;
    let W = container.offsetWidth || 300;
    let H = container.offsetHeight || 120;

    canvas.width = W;
    canvas.height = H;

    const quadVS = `#version 300 es
      in vec2 a_pos;
      out vec2 v_uv;
      void main() {
        v_uv = a_pos * 0.5 + 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const simFS = `#version 300 es
      precision highp float;
      uniform sampler2D u_prev;
      uniform vec2 u_mouse;
      uniform vec2 u_prevMouse;
      uniform float u_viscosity;
      uniform bool u_hasMouse;
      in vec2 v_uv;
      out vec4 outColor;
      void main() {
        vec2 uv = v_uv;
        vec4 prev = texture(u_prev, uv);
        vec2 disp = prev.xy;
        if (u_hasMouse) {
          vec2 delta = uv - u_mouse;
          float dist = length(delta);
          float strength = exp(-dist * dist * 700.0);
          vec2 vel = (u_mouse - u_prevMouse) * 22.0;
          disp += vel * strength;
        }
        disp *= u_viscosity;
        vec2 texel = 1.0 / vec2(float(${SIM_SIZE}));
        vec2 n = texture(u_prev, uv + vec2(0.0, texel.y)).xy;
        vec2 s = texture(u_prev, uv - vec2(0.0, texel.y)).xy;
        vec2 e = texture(u_prev, uv + vec2(texel.x, 0.0)).xy;
        vec2 w = texture(u_prev, uv - vec2(texel.x, 0.0)).xy;
        disp = mix(disp, (n + s + e + w) * 0.25, 0.09);
        outColor = vec4(disp, 0.0, 1.0);
      }
    `;

    const displayFS = `#version 300 es
      precision highp float;
      uniform sampler2D u_text;
      uniform sampler2D u_disp;
      in vec2 v_uv;
      out vec4 outColor;
      void main() {
        vec2 disp = texture(u_disp, v_uv).xy;
        vec2 displaced = v_uv + disp * 0.35;
        displaced = clamp(displaced, 0.0, 1.0);
        outColor = texture(u_text, displaced);
      }
    `;

    const simProg = createProgram(gl, quadVS, simFS);
    const displayProg = createProgram(gl, quadVS, displayFS);

    if (!simProg || !displayProg) {
      setWebglSupported(false);
      return;
    }

    // Quad buffer
    const quadData = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quadData, gl.STATIC_DRAW);

    [simProg, displayProg].forEach((prog) => {
      gl!.useProgram(prog);
      const loc = gl!.getAttribLocation(prog, "a_pos");
      if (loc >= 0) {
        gl!.enableVertexAttribArray(loc);
        gl!.vertexAttribPointer(loc, 2, gl!.FLOAT, false, 0, 0);
      }
    });

    // Determine texture format
    let internalFormat: number = gl.RGBA16F;
    let format: number = gl.RGBA;
    let type: number = gl.HALF_FLOAT;

    function makeSimTex(): WebGLTexture | null {
      const tex = gl!.createTexture();
      if (!tex) return null;
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.texImage2D(
        gl!.TEXTURE_2D,
        0,
        internalFormat,
        SIM_SIZE,
        SIM_SIZE,
        0,
        format,
        type,
        null
      );
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      return tex;
    }

    let texA = makeSimTex();
    let texB = makeSimTex();
    const fbA = gl.createFramebuffer();
    const fbB = gl.createFramebuffer();

    if (!texA || !texB || !fbA || !fbB) {
      setWebglSupported(false);
      return;
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, fbA);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texA,
      0
    );

    // Verify framebuffer completeness; fallback to RGBA8 if float framebuffers fail
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      internalFormat = gl.RGBA8;
      format = gl.RGBA;
      type = gl.UNSIGNED_BYTE;
      texA = makeSimTex();
      texB = makeSimTex();
      if (!texA || !texB) {
        setWebglSupported(false);
        return;
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbA);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texA,
        0
      );
      if (
        gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE
      ) {
        setWebglSupported(false);
        return;
      }
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, fbB);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texB,
      0
    );

    // Text texture - render onto 2D canvas
    function makeTextTexture(): WebGLTexture | null {
      const tc = document.createElement("canvas");
      tc.width = W;
      tc.height = H;
      const ctx2d = tc.getContext("2d");
      if (!ctx2d) return null;
      ctx2d.clearRect(0, 0, W, H);

      const fsize = fontSize ?? Math.min(W * 0.16, H * 0.72, 110);
      ctx2d.font = `italic 700 ${fsize}px 'Clash Display', 'Satoshi', sans-serif`;
      ctx2d.fillStyle = textColor;
      ctx2d.textAlign = "center";
      ctx2d.textBaseline = "middle";
      ctx2d.fillText(text, W / 2, H / 2);

      const textTex = gl!.createTexture();
      if (!textTex) return null;
      gl!.bindTexture(gl!.TEXTURE_2D, textTex);
      gl!.pixelStorei(gl!.UNPACK_FLIP_Y_WEBGL, true);
      gl!.texImage2D(
        gl!.TEXTURE_2D,
        0,
        gl!.RGBA,
        gl!.RGBA,
        gl!.UNSIGNED_BYTE,
        tc
      );
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      return textTex;
    }

    let textTex = makeTextTexture();
    if (!textTex) {
      setWebglSupported(false);
      return;
    }

    let pingA = true;

    // Mouse & touch handlers
    const onMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY =
        "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const m = mouseRef.current;
      m.px = m.x;
      m.py = m.y;
      m.x = (clientX - rect.left) / rect.width;
      m.y = 1.0 - (clientY - rect.top) / rect.height;
      m.active = true;
    };

    const onLeave = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("touchmove", onMove, { passive: true });
    container.addEventListener("mouseleave", onLeave);

    // Initial subtle motion pulse if autoplay
    let frameCount = 0;
    const render = () => {
      rafRef.current = requestAnimationFrame(render);
      const m = mouseRef.current;

      // Autoplay subtle ripple wave
      if (autoplay && !m.active && frameCount < 200) {
        frameCount++;
        m.px = m.x;
        m.py = m.y;
        m.x = 0.5 + Math.sin(frameCount * 0.04) * 0.25;
        m.y = 0.5 + Math.cos(frameCount * 0.04) * 0.15;
        m.active = true;
      }

      // SIMULATION PASS
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, pingA ? fbB : fbA);
      gl!.viewport(0, 0, SIM_SIZE, SIM_SIZE);
      gl!.useProgram(simProg);
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, pingA ? texA : texB);
      gl!.uniform1i(gl!.getUniformLocation(simProg, "u_prev"), 0);
      gl!.uniform2f(gl!.getUniformLocation(simProg, "u_mouse"), m.x, m.y);
      gl!.uniform2f(gl!.getUniformLocation(simProg, "u_prevMouse"), m.px, m.py);
      gl!.uniform1f(
        gl!.getUniformLocation(simProg, "u_viscosity"),
        Math.min(0.98, viscosity + 0.42)
      );
      gl!.uniform1i(
        gl!.getUniformLocation(simProg, "u_hasMouse"),
        m.active ? 1 : 0
      );
      gl!.bindVertexArray(vao);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);

      pingA = !pingA;

      // DISPLAY PASS
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      gl!.viewport(0, 0, canvas.width, canvas.height);
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.useProgram(displayProg);
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, textTex);
      gl!.uniform1i(gl!.getUniformLocation(displayProg, "u_text"), 0);
      gl!.activeTexture(gl!.TEXTURE1);
      gl!.bindTexture(gl!.TEXTURE_2D, pingA ? texA : texB);
      gl!.uniform1i(gl!.getUniformLocation(displayProg, "u_disp"), 1);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    };

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    render();

    // Resize observer
    const ro = new ResizeObserver(() => {
      W = container.offsetWidth || 300;
      H = container.offsetHeight || 120;
      canvas.width = W;
      canvas.height = H;
      if (textTex) gl!.deleteTexture(textTex);
      textTex = makeTextTexture();
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("touchmove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      ro.disconnect();
      if (gl) {
        if (texA) gl.deleteTexture(texA);
        if (texB) gl.deleteTexture(texB);
        if (textTex) gl.deleteTexture(textTex);
        if (fbA) gl.deleteFramebuffer(fbA);
        if (fbB) gl.deleteFramebuffer(fbB);
        if (buf) gl.deleteBuffer(buf);
        if (vao) gl.deleteVertexArray(vao);
        if (simProg) gl.deleteProgram(simProg);
        if (displayProg) gl.deleteProgram(displayProg);
      }
    };
  }, [text, tone, viscosity, textColor, prefersReducedMotion, fontSize, autoplay]);

  if (prefersReducedMotion || !webglSupported) {
    return (
      <div
        className={`flex items-center justify-center select-none ${className}`}
        style={{ height: "clamp(80px, 15vw, 150px)" }}
      >
        <span
          className="font-display italic font-bold tracking-tight text-center"
          style={{
            fontSize: fontSize ?? "clamp(48px, 10vw, 110px)",
            color: textColor,
          }}
        >
          {text}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none cursor-pointer ${className}`}
      style={{ height: "clamp(80px, 15vw, 150px)" }}
      title="Hover or move to ripple the text"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ background: "transparent" }}
      />
    </div>
  );
}
