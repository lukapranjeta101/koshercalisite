"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useSpring } from "motion/react";

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
  const queuedProgressRef = useRef<number | null>(null);
  const currentProgressRef = useRef(-1);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.22,
    restDelta: 0.0005,
  });

  const drawCoverImage = useCallback((context: CanvasRenderingContext2D, image: HTMLImageElement, alpha = 1) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;
    if (!cssWidth || !cssHeight) return;

    const scale = Math.max(cssWidth / image.naturalWidth, cssHeight / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    const x = (cssWidth - drawWidth) / 2;
    const y = (cssHeight - drawHeight) / 2;

    context.globalAlpha = alpha;
    context.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);
    context.drawImage(image, x, y, drawWidth, drawHeight);
    context.globalAlpha = 1;
  }, []);

  const resolveLoadedFrame = useCallback(
    (targetFrame: number) => {
      if (imagesRef.current[targetFrame]) return targetFrame;

      for (let distance = 1; distance < totalFrames; distance += 1) {
        const before = targetFrame - distance;
        if (before >= 0 && imagesRef.current[before]) return before;

        const after = targetFrame + distance;
        if (after < totalFrames && imagesRef.current[after]) return after;
      }

      return -1;
    },
    [totalFrames]
  );

  const drawProgress = useCallback(
    (frameProgress: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      const baseFrame = Math.max(0, Math.min(totalFrames - 1, Math.floor(frameProgress)));
      const nextFrame = Math.min(totalFrames - 1, baseFrame + 1);
      const mix = frameProgress - baseFrame;
      const baseResolved = resolveLoadedFrame(baseFrame);
      const nextResolved = resolveLoadedFrame(nextFrame);

      if (baseResolved < 0 && nextResolved < 0) return;

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = BG_COLOR;
      context.fillRect(0, 0, canvas.width, canvas.height);

      if (baseResolved >= 0 && nextResolved >= 0 && baseResolved !== nextResolved) {
        const baseImage = imagesRef.current[baseResolved];
        const nextImage = imagesRef.current[nextResolved];
        if (baseImage && nextImage) {
          drawCoverImage(context, baseImage, 1 - mix);
          drawCoverImage(context, nextImage, mix);
          return;
        }
      }

      const fallback = baseResolved >= 0 ? baseResolved : nextResolved;
      if (fallback >= 0) {
        const fallbackImage = imagesRef.current[fallback];
        if (fallbackImage) drawCoverImage(context, fallbackImage, 1);
      }
    },
    [drawCoverImage, resolveLoadedFrame, totalFrames]
  );

  const queueDraw = useCallback((frameProgress: number) => {
    queuedProgressRef.current = frameProgress;
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const nextProgress = queuedProgressRef.current;
      queuedProgressRef.current = null;
      if (nextProgress === null) return;
      if (Math.abs(nextProgress - currentProgressRef.current) < 0.015) return;

      currentProgressRef.current = nextProgress;
      drawProgress(nextProgress);
    });
  }, [drawProgress]);

  useEffect(() => {
    let isCancelled = false;

    const loadFrame = (index: number) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.decoding = "async";
        img.src = frameSrc(index);
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load frame ${index + 1}`));
      });

    const preload = async () => {
      try {
        const first = await loadFrame(0);
        if (isCancelled) return;

        imagesRef.current[0] = first;
        setIsReady(true);
        queueDraw(0);
      } catch {
        if (!isCancelled) setHasError(true);
        return;
      }

      const backgroundLoads = Array.from({ length: totalFrames - 1 }, (_, idx) => idx + 1).map(
        async (index) => {
          try {
            const image = await loadFrame(index);
            if (!isCancelled) imagesRef.current[index] = image;
          } catch {
            // Skip missing/corrupt frames and keep animation usable.
          }
        }
      );

      await Promise.allSettled(backgroundLoads);
    };

    preload().catch(() => {
      if (!isCancelled) setHasError(true);
    });

    return () => {
      isCancelled = true;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [queueDraw, totalFrames]);

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
      queueDraw(Math.max(0, currentProgressRef.current));
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [isReady, queueDraw]);

  useMotionValueEvent(smoothProgress, "change", (value) => {
    if (!isReady) return;
    const normalized = Math.max(0, Math.min(1, value));
    queueDraw(normalized * (totalFrames - 1));
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
          {hasError ? (
            <p className="text-xs font-semibold tracking-[0.14em] text-zinc-500">LOADING PREVIEW...</p>
          ) : (
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-500" />
          )}
        </div>
      </div>
    </section>
  );
}
