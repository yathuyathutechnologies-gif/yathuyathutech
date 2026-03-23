"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/VideoSlider.module.css";

const VideoSlider = ({
  slides = [],
  showText = true,
  interval = 5000,
}) => {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides, interval]);

  // Force reload + play when src changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [current]);

  if (!slides.length) return null;

  const currentSlide = slides[current];
  const nextIndex = (current + 1) % slides.length;

  return (
    <div className={styles.slider}>
      {/* SINGLE VIDEO */}
      <video
        ref={videoRef}
        key={currentSlide.src}
        className={`${styles.video} ${styles.active}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={currentSlide.src} type="video/mp4" />
      </video>

      {/* Preload NEXT video (no render cost) */}
      <link
        rel="preload"
        as="video"
        href={slides[nextIndex].src}
        type="video/mp4"
      />

      {showText && currentSlide.text && (
        <div className={styles.overlay} id="primaryColor">
          <h1 key={currentSlide.text} className={styles.text}>
            {currentSlide.text}
          </h1>
        </div>
      )}
    </div>
  );
};

export default VideoSlider;