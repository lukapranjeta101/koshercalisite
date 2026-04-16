"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

const TOTAL_FRAMES = 101; // Editable
const FRAME_PATH = "/mycomponents";
const BG_COLOR = "#F6F1E8";

type SpiralScrollProps = {
  totalFrames?: number;
  scrollHeightVh?: number;
};

function frameSrc(index: number): string {
  const frame = String(index + 1).padStart(3, "0");
  return `${FRAME_PATH}/ezgif-frame-${frame}.jpg`;
}

export default function SpiralScroll({
  totalFrames = TOTAL_FRAMES,
  scrollHeightVh = 400,
}: SpiralScrollProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const queuedFrameRef = useRef<number | null>(null);
  const currentFrameRef = useRef(-1);
  const [isReady, setIsReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    const image = imagesRef.current[frameIndex];
    if (!canvas || !image) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;
    if (!cssWidth || !cssHeight) return;

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = BG_COLOR;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    const scale = Math.max(cssWidth / image.naturalWidth, cssHeight / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    const x = (cssWidth - drawWidth) / 2;
    const y = (cssHeight - drawHeight) / 2;

    context.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);
    context.drawImage(image, x, y, drawWidth, drawHeight);
  };

  const queueDraw = (frameIndex: number) => {
    queuedFrameRef.current = frameIndex;
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const nextFrame = queuedFrameRef.current;
      queuedFrameRef.current = null;
      if (nextFrame === null || nextFrame === currentFrameRef.current) return;

      currentFrameRef.current = nextFrame;
      drawFrame(nextFrame);
    });
  };

  useEffect(() => {
    let isCancelled = false;

    const preload = async () => {
      const loaders = Array.from({ length: totalFrames }, (_, i) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.decoding = "async";
          img.src = frameSrc(i);
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load frame ${i + 1}`));
        });
      });

      const loaded = await Promise.all(loaders);
      if (isCancelled) return;

      imagesRef.current = loaded;
      setIsReady(true);
    };

    preload().catch(() => {
      if (!isCancelled) setIsReady(false);
    });

    return () => {
      isCancelled = true;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [totalFrames]);

  useEffect(() => {
    if (!isReady) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      queueDraw(Math.max(0, currentFrameRef.current));
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [isReady]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!isReady) return;
    const index = Math.max(0, Math.min(totalFrames - 1, Math.round(value * (totalFrames - 1))));
    queueDraw(index);
  });

  return (
    <section ref={sectionRef} className="relative bg-[#F6F1E8]" style={{ height: `${scrollHeightVh}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F6F1E8]">
        <canvas ref={canvasRef} className="h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.45),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.06),transparent_42%)]" />

        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-[#F6F1E8] transition-opacity duration-500 ${
            isReady ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-500" />
        </div>
      </div>
    </section>
  );
}
