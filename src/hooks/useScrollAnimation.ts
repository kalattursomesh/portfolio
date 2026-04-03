'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollAnimationConfig {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
}

export const useScrollAnimation = () => {
  const elementsRef = useRef<(Element | null)[]>([]);

  // Cleanup function
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el: Element | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  const fadeInUp = (
    element: Element | string,
    config: AnimationConfig & ScrollAnimationConfig = {}
  ) => {
    const {
      duration = 0.8,
      delay = 0,
      ease = 'power2.out',
      start = 'top 80%',
      end = 'bottom 20%',
      from: _from,
      to: _to,
      ...scrollConfig
    } = config;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
        ...config.from
      },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease,
        ...config.to,
        scrollTrigger: {
          trigger: element as any,
          start,
          end,
          toggleActions: 'play none none reverse',
          ...scrollConfig
        }
      }
    );
  };

  const fadeInLeft = (
    element: Element | string,
    config: AnimationConfig & ScrollAnimationConfig = {}
  ) => {
    const {
      duration = 0.8,
      delay = 0,
      ease = 'power2.out',
      start = 'top 80%',
      from: _from,
      to: _to,
      ...scrollConfig
    } = config;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: -50,
        ...config.from
      },
      {
        opacity: 1,
        x: 0,
        duration,
        delay,
        ease,
        ...config.to,
        scrollTrigger: {
          trigger: element as any,
          start,
          toggleActions: 'play none none reverse',
          ...scrollConfig
        } as any
      }
    );
  };

  const fadeInRight = (
    element: Element | string,
    config: AnimationConfig & ScrollAnimationConfig = {}
  ) => {
    const {
      duration = 0.8,
      delay = 0,
      ease = 'power2.out',
      start = 'top 80%',
      from: _from,
      to: _to,
      ...scrollConfig
    } = config;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: 50,
        ...config.from
      },
      {
        opacity: 1,
        x: 0,
        duration,
        delay,
        ease,
        ...config.to,
        scrollTrigger: {
          trigger: element as any,
          start,
          toggleActions: 'play none none reverse',
          ...scrollConfig
        } as any
      }
    );
  };

  const scaleIn = (
    element: Element | string,
    config: AnimationConfig & ScrollAnimationConfig = {}
  ) => {
    const {
      duration = 0.6,
      delay = 0,
      ease = 'back.out(1.7)',
      start = 'top 80%',
      from: _from,
      to: _to,
      ...scrollConfig
    } = config;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.8,
        ...config.from
      },
      {
        opacity: 1,
        scale: 1,
        duration,
        delay,
        ease,
        ...config.to,
        scrollTrigger: {
          trigger: element as any,
          start,
          toggleActions: 'play none none reverse',
          ...scrollConfig
        } as any
      }
    );
  };

  const staggerAnimation = (
    elements: Element[] | string,
    config: AnimationConfig & ScrollAnimationConfig = {}
  ) => {
    const {
      duration = 0.6,
      delay = 0,
      ease = 'power2.out',
      stagger = 0.1,
      start = 'top 80%',
      from: _from,
      to: _to,
      ...scrollConfig
    } = config;

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 30,
        ...config.from
      },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease,
        stagger,
        ...config.to,
        scrollTrigger: {
          trigger: (Array.isArray(elements) ? elements[0] : elements) as any,
          start,
          toggleActions: 'play none none reverse',
          ...scrollConfig
        } as any
      }
    );
  };

  const progressBar = (
    element: Element | string,
    config: ScrollAnimationConfig = {}
  ) => {
    const {
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = true,
      ...scrollConfig
    } = config;

    gsap.fromTo(
      element,
      {
        scaleX: 0,
        transformOrigin: 'left center'
      },
      {
        scaleX: 1,
        scrollTrigger: {
          trigger: element as any,
          start,
          end,
          scrub,
          ...scrollConfig
        } as any
      }
    );
  };

  const parallax = (
    element: Element | string,
    config: ScrollAnimationConfig & { speed?: number } = {}
  ) => {
    const {
      speed = 0.5,
      start = 'top bottom',
      end = 'bottom top',
      scrub = true,
      ...scrollConfig
    } = config;

    gsap.to(element, {
      y: (i, target) => -ScrollTrigger.maxScroll(window) * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element as any,
        start,
        end,
        scrub,
        invalidateOnRefresh: true,
        ...scrollConfig
      } as any
    });
  };

  const typewriter = (
    element: Element | string,
    config: AnimationConfig & ScrollAnimationConfig & { text?: string } = {}
  ) => {
    const {
      duration = 2,
      delay = 0,
      start = 'top 80%',
      text,
      ...scrollConfig
    } = config;

    const targetElement = typeof element === 'string'
      ? document.querySelector(element)
      : element;

    if (!targetElement) return;

    const originalText = text || targetElement.textContent || '';
    targetElement.textContent = '';

    gsap.to(targetElement, {
      duration,
      delay,
      ease: 'none',
      onUpdate: function () {
        const progress = this.progress();
        const currentLength = Math.round(originalText.length * progress);
        targetElement.textContent = originalText.substring(0, currentLength);
      },
      scrollTrigger: {
        trigger: element as any,
        start,
        toggleActions: 'play none none reverse',
        ...scrollConfig
      } as any
    });
  };

  const morphPath = (
    element: Element | string,
    config: AnimationConfig & ScrollAnimationConfig & {
      paths?: string[];
      repeat?: number;
    } = {}
  ) => {
    const {
      duration = 1,
      delay = 0,
      ease = 'power2.inOut',
      paths = [],
      repeat = 0,
      start = 'top 80%',
      ...scrollConfig
    } = config;

    if (paths.length < 2) return;

    const tl = gsap.timeline({
      repeat,
      scrollTrigger: {
        trigger: element as any,
        start,
        toggleActions: 'play none none reverse',
        ...scrollConfig
      } as any
    });

    paths.forEach((path, index) => {
      if (index === 0) return;
      tl.to(element, {
        attr: { d: path },
        duration,
        delay: index === 1 ? delay : 0,
        ease
      });
    });
  };

  // Utility function to refresh ScrollTrigger
  const refresh = () => {
    ScrollTrigger.refresh();
  };

  // Utility function to kill all ScrollTriggers
  const killAll = () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };

  return {
    addToRefs,
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    staggerAnimation,
    progressBar,
    parallax,
    typewriter,
    morphPath,
    refresh,
    killAll
  };
};

export default useScrollAnimation;