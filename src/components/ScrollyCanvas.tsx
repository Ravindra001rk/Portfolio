"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTransform, MotionValue } from "framer-motion";

interface ScrollyCanvasProps {
  scrollYProgress: MotionValue<number>;
  numFrames?: number;
  onLoadProgress?: (pct: number) => void;
}

export default function ScrollyCanvas({
  scrollYProgress,
  numFrames = 120,
  onLoadProgress,
}: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Ref holds all image elements immediately — renderer always sees latest loaded frames
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Map 0 -> 1 scroll progress to frame indices
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, numFrames - 1]);

  // ── Load all frames; unlock canvas after first 15 ──────────────────────────
  useEffect(() => {
    const requiredToStart = Math.min(15, numFrames);
    let count = 0;

    for (let i = 0; i < numFrames; i++) {
      const img = new Image();
      img.src = `/sequence/frame_${String(i).padStart(3, "0")}_delay-0.07s.webp`;
      imagesRef.current[i] = img; // immediately available by index

      const tick = () => {
        count++;
        if (onLoadProgress)
          onLoadProgress(Math.min(1, count / requiredToStart));
        if (count === requiredToStart) setLoaded(true);
      };
      img.onload = tick;
      img.onerror = tick;
    }
  }, [numFrames, onLoadProgress]);

  // ── Canvas rendering engine ─────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number | null = null;
    let currentIdx = 0;

    const draw = () => {
      const img = imagesRef.current[currentIdx];
      if (img && img.complete && img.naturalHeight !== 0) {
        drawCover(ctx, canvas, img);
      }
      raf = null;
    };

    const schedule = () => {
      if (raf === null) raf = requestAnimationFrame(draw);
    };

    // Use ResizeObserver on the canvas element itself so the bitmap is always
    // in sync with the element's rendered size — including when the mobile
    // URL bar shows/hides and changes h-screen height (which caused the stretch).
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { inlineSize: w, blockSize: h } = entry.contentBoxSize?.[0] ?? {
          inlineSize: entry.contentRect.width,
          blockSize: entry.contentRect.height,
        };
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        schedule();
      }
    });
    ro.observe(canvas);

    // Paint frame 0 right away
    const first = imagesRef.current[0];
    if (first && first.complete && first.naturalHeight !== 0)
      drawCover(ctx, canvas, first);

    const unsub = frameIndex.on("change", (v) => {
      currentIdx = Math.max(0, Math.min(numFrames - 1, Math.floor(v)));
      schedule();
    });

    return () => {
      unsub();
      ro.disconnect();
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [loaded, frameIndex, numFrames]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

// ── Cover-fit helper ─────────────────────────────────────────────────────────
function drawCover(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  img: HTMLImageElement
) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.width / dpr;
  const h = canvas.height / dpr;
  const cr = w / h;
  const ir = img.naturalWidth / img.naturalHeight;

  let dw: number, dh: number, dx: number, dy: number;
  if (cr > ir) {
    dw = w; dh = w / ir; dx = 0; dy = (h - dh) / 2;
  } else {
    dh = h; dw = h * ir; dy = 0; dx = (w - dw) / 2;
  }

  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, dx, dy, dw, dh);
}
