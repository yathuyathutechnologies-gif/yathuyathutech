"use client";
import React, { useLayoutEffect, useRef, useState, useEffect, use } from "react";
import style from "./styles/homeStyle.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
import VideoSlider from '../../components/ui/VideoSlider';
import ImageSlider from "../../components/ui/ImageSlider";

import { Canvas } from '@react-three/fiber';
import IphoneScene from '../../components/IphoneScene';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

export default function Page() {
  const containerRef = useRef(null);
  const firstsectionRef = useRef(null);
  const secondsectionRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoLandingPointRef = useRef(null);
  const spacingRef = useRef(null);
  const textRowRef = useRef(null);

  const topNavBarRef = useRef(null);
  const menuRef = useRef(null);
  const menuItemsRef = useRef(null);
  const menuContainerRef = useRef(null);

  // text to animate in second section
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);
  const thirdTextRef = useRef(null);
  const fourthTextRef = useRef(null);
  const fifthTextRef = useRef(null);
  const sixthTextRef = useRef(null);

  const [textRowHeight, setTextRowHeight] = useState(0);


  const whiteTextRef = useRef(null);
  const orangeYathuRef = useRef(null);
  const orangeTechRef = useRef(null);

  const aboutSectionRef = useRef(null);

  const menuItems = [
    { id: 1, label: "Home" },
    { id: 2, label: "About" },
    { id: 3, label: "Contact" }
  ];
  const imageSlides = [
    { src: "/images/slide1.jpg" },
    { src: "/images/slide2.jpg" },
    { src: "/images/slide3.jpg" },
  ];

  const [isHeroSectionText, setHeroSectionText] = useState(true);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 800px)", () => {
      const video = videoContainerRef.current;
      const landing = videoLandingPointRef.current;
      const spacing = spacingRef.current;
      const textRow = textRowRef.current;

      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: firstsectionRef.current,
          start: "top+=50 top",
          end: "bottom 60%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true
        }
      });

      const videoRect = video.getBoundingClientRect();
      const landingRect = landing.getBoundingClientRect();
      const scaleX = landingRect.width / videoRect.width;
      const scaleY = landingRect.height / videoRect.height;

      t1.to(video, {
        scaleX,
        scaleY,
        transformOrigin: "center center",
        ease: "none"
      });

      const t2 = gsap.timeline({
        scrollTrigger: {
          trigger: video,
          start: "bottom 80%",
          end: "bottom 30%",
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      const calculatePosition = () => {
        const videoCurrentRect = video.getBoundingClientRect();
        const landingRect = landing.getBoundingClientRect();

        setTextRowHeight(landingRect.height);

        const videoCenterY = videoCurrentRect.top + videoCurrentRect.height / 2;
        const landingCenterY = landingRect.top + landingRect.height / 2;

        const transform = gsap.getProperty(video, "transform");
        const matrix = new DOMMatrix(transform.toString());
        const currentY = matrix.m42 || 0;

        return currentY + (landingCenterY - videoCenterY);
      };

      t2.to(video, {
        y: calculatePosition(),
        x: 0,
        ease: "none",
        duration: 1
      });

      gsap.to(spacing, {
        width: () => {
          const textRowRect = textRow.getBoundingClientRect();
          const landingRect = landing.getBoundingClientRect();
          const landingCenterX = landingRect.left + landingRect.width / 2;
          return landingCenterX - textRowRect.left - landingRect.width / 2 - 400;
        },
        duration: 2,
        delay: 1,
        scrollTrigger: {
          trigger: firstsectionRef.current,
          start: "bottom 75%",
          end: "bottom 40%",
          scrub: true,
        }
      });

      let isNavWhite = false;

      const topNavBarOnScrollAnimate = gsap.timeline({
        scrollTrigger: {
          trigger: firstsectionRef.current,
          start: "top top",
          end: "+=30",
          scrub: true,
          markers: true,

          onEnter: () => setHeroSectionText(false),
          onLeaveBack: () => setHeroSectionText(true),
        }
      });

      topNavBarOnScrollAnimate
        .to([menuRef.current, menuItemsRef.current.children, topNavBarRef.current], {
          color: "#666",
          backgroundColor: "#fff",
          ease: "none"
        })
        .to(menuRef.current, {
          opacity: 1,
          duration: 1,
          x: 0
        });
      topNavBarOnScrollAnimate
        .to(menuItemsRef.current, { x: 20, opacity: 0, ease: "power2.out" }, "+=1")
        .to(menuRef.current, { x: 0 }, "<");

      const refreshScrollTrigger = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", refreshScrollTrigger);

      return () => {
        t1.kill();
        t2.kill();
        topNavBarOnScrollAnimate.kill();
        window.removeEventListener("resize", refreshScrollTrigger);
      };
    });

    // --- Mobile ---
    mm.add("(max-width: 799px)", () => {
      const t2 = gsap.timeline({
        scrollTrigger: {
          trigger: firstsectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      t2.to(videoContainerRef.current, {
        scaleX: 0.5,
        scaleY: 0.5,
        transformOrigin: "center center",
        ease: "power1.out"
      });

      return () => t2.kill();
    });

    return () => mm.revert();
  }, []);

  useLayoutEffect(() => {
    const menu = menuRef.current;
    const items = menuItemsRef.current;
    const container = menuContainerRef.current;


    gsap.set(items, {
      x: 0,
      opacity: 1
    });

    const tl = gsap.timeline({ paused: true });

    tl.to(items, {
      x: 50,
      opacity: 1,
      duration: 0.4,
      ease: "power3.out"
    });

    const onMenuEnter = () => tl.play();
    const onContainerLeave = () => tl.reverse();

    menu.addEventListener("mouseenter", onMenuEnter);
    container.addEventListener("mouseleave", onContainerLeave);

    return () => {
      menu.removeEventListener("mouseenter", onMenuEnter);
      container.removeEventListener("mouseleave", onContainerLeave);
    };
  }, []);

  useLayoutEffect(() => {
    const textAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: secondsectionRef.current,
        start: "top 80%",
        end: "+=100",
        scrub: true,
      }
    })
      .to(firstTextRef.current, {
        y: 0,
        opacity: 1,
        ease: "power3.inOut"
      })
      .to(secondTextRef.current, {
        y: 0,
        opacity: 1,
        ease: "power3.inOut"
      }, '<');
    const secondTextAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: secondsectionRef.current,
        start: "top 65%",
        end: "+=150",
        scrub: true,
      }
    }).to(thirdTextRef.current, {
      y: 0,
      opacity: 1,
      ease: "power3.inOut"
    })
      .to(fourthTextRef.current, {
        y: 0,
        opacity: 1,
        ease: "power3.in"
      }, '<');

    const thirdTextAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: secondsectionRef.current,
        start: "top 50%",
        end: "+=150",
        scrub: true,
      }
    })
      .to(fifthTextRef.current, {
        y: 0,
        opacity: 1,
        ease: "power2.inOut"
      })
      .to(sixthTextRef.current, {
        y: 0,
        opacity: 1,
        ease: "power2.in"
      }, '<');


    return () => {
      textAnimation.kill();
      secondTextAnimation.kill();
      thirdTextAnimation.kill();
    }
  }, []);


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const white = whiteTextRef.current;
      const yathu = orangeYathuRef.current;
      const tech = orangeTechRef.current;
      const trigger = firstsectionRef.current;

      if (!white || !yathu || !tech || !trigger) return;

      // Initial state: full brand
      gsap.set(white, { color: "#fff", text: "Yathu" });
      gsap.set(yathu, { color: "#ff7a00", text: "Yathu" });
      gsap.set(tech, { color: "#ff7a00", text: "Tech" });

      ScrollTrigger.create({
        trigger,
        start: "top top",
        end: "bottom top",
        onEnter: () => {
          // collapse to YYTech
          gsap.to([white, yathu], {
            text: "Y",
            color: "#666",
            duration: 0.5,
            ease: "power3.inOut"
          });
          gsap.to(tech, {
            text: "Tech",
            color: "#ff7a00",
            duration: 0.5,
            ease: "power3.inOut"
          });
        },
        onLeaveBack: () => {
          // expand back to full brand when scrolling up
          gsap.to(white, { text: "Yathu", color: "#fff", duration: 0.5 });
          gsap.to(yathu, { text: "Yathu", color: "#ff7a00", duration: 0.5 });
          gsap.to(tech, { text: "Tech", color: "#ff7a00", duration: 0.5 });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);





  // const lineRefs = useRef([]);
  // lineRefs.current = []; // reset on each render

  // const addToRefs = (el) => {
  //   if (el && !lineRefs.current.includes(el)) {
  //     lineRefs.current.push(el);
  //   }
  // };
  // useLayoutEffect(() => {
  //   const ctx = gsap.context(() => {
  //     // initial state for all lines
  //     gsap.set(lineRefs.current, { y: 50, opacity: 0 });

  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: storyTellingRef.current,
  //         start: "top 70%",
  //         end: "top 10%",
  //         scrub: 1.2
  //       }
  //     });

  //     // Animate heading first (if you have a heading)
  //     tl.from("#headingPhrase", {
  //       y: 60,
  //       opacity: 0,
  //       duration: 0.6,
  //       ease: "power3.out"
  //     });

  //     // Then stagger the lines using refs
  //     tl.to(lineRefs.current, {
  //       y: 0,
  //       opacity: 1,
  //       stagger: 0.4, // controls reading rhythm
  //       duration: 0.6,
  //       ease: "power3.out"
  //     }, "-=0.2");

  //   }, containerRef);

  //   return () => ctx.revert();
  // }, []);
  const firstStoryVideoRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(firstStoryVideoRef.current, {
        width: "50vw",
      });

      const videoAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: storyTellingRef.current,
          start: "top top",
          end: "bottom 30%",
          scrub: true,
          pin: storyTellingRef.current,
          invalidateOnRefresh: true,
          pinSpacing: true,
        },
      });

      videoAnimation.to(firstStoryVideoRef.current, {
        width: () => storyTellingRef.current.offsetWidth,
        x: 0,
        borderRadius: "0px",
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const [progress, setProgress] = useState(0);
  const iphoneSceneContainerRef = useRef();
  const storyTellingRef = useRef(null);
  const secondStoryTellingRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {


      const firstAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: secondStoryTellingRef.current,
          start: 'top 90%',
          end: '+=500',
          scrub: true,
        }
      })
        .to(iphoneSceneContainerRef.current, {
          x: 0,
          duration: 1,
          opacity: 1,
          ease: 'power3.inOut',
        })

      //second animation

      const secondAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: secondStoryTellingRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => { setProgress(self.progress) },
          pin: iphoneSceneContainerRef.current,
          invalidateOnRefresh: true
        }
      })
      // .to(iphoneSceneContainerRef.current,{
      //   yPercent:100,
      //   duration:3,
      //   ease:'power3.inOut'
      // })


    }, containerRef);

    return () => ctx.revert()
  }, []);
  return (
    <div ref={containerRef} className={style.container}>
      <div className={style.topNavBar} ref={topNavBarRef}>
        <div className={style.brand}>
          <span ref={whiteTextRef} />
          <span ref={orangeYathuRef} />
          <span ref={orangeTechRef} />
        </div>
        <div className={style.menuContainer} ref={menuContainerRef}>
          <div className={style.menu} ref={menuRef}>
            Menu
          </div>

          <ul className={style.menuItems} ref={menuItemsRef}>
            {menuItems.map((item) => (
              <li key={item.id}>{item.label}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={style.iphoneSceneContainer} ref={iphoneSceneContainerRef} >
        <Canvas>
          <IphoneScene progress={progress} />
        </Canvas>
      </div>
      <section ref={firstsectionRef} className={style.firstsection}>
        <div ref={videoContainerRef} className={style.videoContainer}>
          <VideoSlider
            slides={[
              {
                src: "/videos/hero.mp4",
                text: "Build the future with confidence",
              },
              {
                src: "/videos/hero2.mp4",
                text: "Innovate beyond limits",
              },
              {
                src: "/videos/hero3.mp4",
                text: "Technology that empowers growth"
              },
            ]}
            showText={isHeroSectionText}
            interval={6000}
          />
        </div>
      </section>

      <section ref={secondsectionRef} className={style.secondsection}>
        <div className={style.firstRow}>
          <div
            className={style.videoLandingPoint}
            ref={videoLandingPointRef}
          ></div>
        </div>

        <div
          className={style.firstRowTextContainer}
          ref={textRowRef}
          style={{ height: textRowHeight }}
        >
          <div className={style.firstText} ref={firstTextRef}>Innovate</div>
          <div className={style.calculatedSpacing} ref={spacingRef} />
          <div className={style.secondText} ref={secondTextRef}>, connect</div>
        </div>

        <div className={style.secondRow}>
          <div className={style.secondVideoContainer}>
            <VideoSlider
              slides={[
                {
                  src: "/videos/hero.mp4",
                },
                {
                  src: "/videos/hero2.mp4",
                },
                {
                  src: "/videos/hero3.mp4"
                },
              ]}
              showText={false}
              interval={10000}
            />
          </div>
          <span className={style.thirdText} ref={thirdTextRef}>
            and inspire
          </span>
          <span id="primaryColor" className={style.fourthText} ref={fourthTextRef}>
            &nbsp;change
          </span>
        </div>
        <div className={style.thirdRow} id="primaryColor">
          <span className={style.fifthText} ref={fifthTextRef}>
            that matters
          </span>
          <div className={style.slideShowcontainer}>
            <ImageSlider slides={imageSlides} interval={4000} />
          </div>
          <span className={style.sixthText} ref={sixthTextRef}>
            for all.
          </span>
        </div>
      </section>
      <section className={style.storyTellingSection} ref={storyTellingRef}>
        {/* <div>
  <span ref={addToRefs} className={style.line}>
    In today’s digital world, having an idea isn’t enough.
  </span>
  <span ref={addToRefs} className={style.line}>
    Businesses struggle to stand out, reach the right audience,
  </span>
  <span ref={addToRefs} className={style.line}>
    and turn attention into real growth.
  </span>
  <span ref={addToRefs} className={`${style.line} ${style.highlight}`}>
    That’s where the difference is made.
  </span>
  <span ref={addToRefs} className={style.line}>
    We build experiences that perform, connect, and scale.
  </span>
</div> */}
        <div className={style.stroryPhrase}>
          <span className="">
            Our name, Yathuyathu technologies, reflects our commitment of being part of a solution
            that is not only technology, but a part of an innovation towards a changed world
          </span>
        </div>
        <div className={style.firstStoryVideo} ref={firstStoryVideoRef}>
          {/* 
          when i animate the scale here it doesmt look good */}

          <VideoSlider
            slides={[
              {
                src: "/videos/hero.mp4",
              },
              {
                src: "/videos/hero2.mp4",
              },
              {
                src: "/videos/hero3.mp4"
              },
            ]}
            showText={false}
            interval={10000}
          />
        </div>
      </section>
      <section ref={secondStoryTellingRef} className={style.secondStoryTelling}>

      </section>

      <section className={style.serviceSection}>

      </section>

      <section className={style.aboutSection} ref={aboutSectionRef}>
        <div className={style.Aboutontainer}>

        </div>
        <div className={style.parteners}>

        </div>
      </section>
    </div>
  );
}