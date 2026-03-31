"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTransform, MotionValue } from "framer-motion";

interface ScrollyCanvasProps {
  scrollYProgress: MotionValue<number>;
  numFrames?: number;
}

export default function ScrollyCanvas({ scrollYProgress, numFrames = 89, onLoadProgress }: ScrollyCanvasProps & { onLoadProgress?: (pct: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Map 0 -> 1 scroll to frame indices
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, numFrames - 1]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < numFrames; i++) {
        const img = new Image();
        const frameNum = i.toString().padStart(3, "0");
        img.src = `/sequence/frame_${frameNum}_delay-0.07s.png`;
        
        const tick = () => {
          loadedCount++;
          if (onLoadProgress) onLoadProgress(loadedCount / numFrames);
          if (loadedCount === numFrames) {
            setImages(loadedImages);
            setLoaded(true);
          }
        };

        img.onload = tick;
        img.onerror = tick;
        
        loadedImages.push(img);
    }
  }, [numFrames, onLoadProgress]);

  useEffect(() => {
    if (!loaded || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set size once internally and on resize
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    let renderTask: number | null = null;
    let currentIndex = 0;

    const render = () => {
      const imgToDraw = images[currentIndex];
      if (imgToDraw && imgToDraw.complete && imgToDraw.naturalHeight !== 0) {
        drawCanvas(ctx, canvas, imgToDraw);
      }
      renderTask = null;
    };

    const handleResize = () => {
      setSize();
      if (renderTask === null) {
        renderTask = requestAnimationFrame(render);
      }
    };
    window.addEventListener("resize", handleResize);

    // Draw initial frame immediately
    const firstValidImage = images.find(img => img.complete && img.naturalHeight !== 0);
    if (firstValidImage) {
      drawCanvas(ctx, canvas, firstValidImage);
    }

    const unsubscribe = frameIndex.on("change", (latest) => {
      currentIndex = Math.max(0, Math.min(numFrames - 1, Math.floor(latest)));
      if (renderTask === null) {
        renderTask = requestAnimationFrame(render);
      }
    });

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
      if (renderTask !== null) cancelAnimationFrame(renderTask);
    };
  }, [loaded, images, frameIndex, numFrames]);

  const drawCanvas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      offsetY = 0;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw fading black background just in case
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-0">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm italic font-light tracking-wide">
          Loading Cinematic Experience...
        </div>
      )}
      <canvas ref={canvasRef} className="block h-full w-full object-cover" />
    </div>
  );
}
