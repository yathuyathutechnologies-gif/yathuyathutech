"use client";
import gsap from "gsap";
import React, { useEffect } from "react";

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");
    const cursorText = document.querySelector(".custom-text");

    if (!cursor) return;

    // Fast setters
    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    // Mouse position
    let mouseX = 0;
    let mouseY = 0;

    // Smooth position
    let pos = { x: 0, y: 0 };

    // Track mouse
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Smooth follow (trailing effect)
    const update = () => {
      pos.x += (mouseX - pos.x) * 0.2;
      pos.y += (mouseY - pos.y) * 0.2;

      xSet(pos.x);
      ySet(pos.y);
    };

    // Hover IN (event delegation)
    const onMouseOver = (e) => {
      const target = e.target.closest(
        "a, button, [role='button'], .menu, .menuItems li"
      );
      if (!target) return;

      gsap.to(cursor, {
        scale: 3,
        duration: 0.3,
        ease: "power3.out",
      });

      if (target.classList.contains("view") && cursorText) {
        cursorText.style.display = "block";
      }
    };

    // Hover OUT
    const onMouseOut = (e) => {
      const target = e.target.closest(
        "a, button, [role='button'], .menu, .menuItems li"
      );
      if (!target) return;

      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
      });

      if (cursorText) cursorText.style.display = "none";
    };

    // Listeners
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    // GSAP ticker
    gsap.ticker.add(update);

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <div id="custom-cursor" className="custom-cursor">
      <span className="custom-text">View</span>
    </div>
  );
};

export default CustomCursor;