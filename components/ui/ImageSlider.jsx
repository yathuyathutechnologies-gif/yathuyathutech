"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./styles/ImageSlider.module.css";

const ImageSlider = ({ slides = [], interval = 5000 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides, interval]);

  if (!slides.length) return null;

  const currentSlide = slides[current];
  const nextIndex = (current + 1) % slides.length;
  const nextSlide = slides[nextIndex];

  return (
    <>
      {/* Current image */}
      <Image
        key={currentSlide.src}
        src={currentSlide.src}
        alt=""
        fill
        priority={current === 0}
        sizes="150px"           // match the container width
        className={`${styles.image} ${styles.active}`}
      />

      {/* Preload next image */}
      <Image
        src={nextSlide.src}
        alt=""
        fill
        sizes="150px"           // match the container width
        className={styles.preload}
      />
    </>
  );
};

export default ImageSlider;