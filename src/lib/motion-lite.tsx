"use client";

import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  type ReactNode,
  type CSSProperties,
} from "react";

/**
 * ═══════════════════════════════════════════════════════════════════════
 * MOTION-LITE: Lightweight drop-in replacement for framer-motion
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Replaces framer-motion's ~150KB bundle with a ~2KB CSS-transition-based
 * implementation. Supports the subset of the API used in this project:
 *
 * - motion.{element} with initial/animate/whileInView/viewport/transition
 * - AnimatePresence (renders children with CSS transitions, no exit animation)
 * - useInView hook (IntersectionObserver-based)
 *
 * Trade-offs:
 * - No spring physics (uses CSS ease-out instead)
 * - No exit animations (AnimatePresence is a passthrough)
 * - No layout animations
 * - No gesture support (whileHover, whileTap are ignored)
 *
 * These trade-offs are acceptable for a content site where animations
 * are decorative, and the ~150KB JS savings dramatically improves
 * Lighthouse Performance score.
 */

// ─── Types ───────────────────────────────────────────────────────────

interface MotionValues {
  opacity?: number;
  y?: number;
  x?: number;
  scale?: number;
  rotate?: number;
}

interface MotionTransition {
  delay?: number;
  duration?: number;
  type?: string;
  stiffness?: number;
  damping?: number;
}

// Props that motion components accept ON TOP of normal HTML props
const MOTION_PROP_NAMES = new Set([
  "initial",
  "animate",
  "whileInView",
  "viewport",
  "transition",
  "exit",
  "whileHover",
  "whileTap",
  "whileFocus",
  "whileDrag",
  "layout",
  "layoutId",
  "variants",
  "onAnimationStart",
  "onAnimationComplete",
  "custom",
  "inherit",
  "mode",
]);

// ─── Helpers ─────────────────────────────────────────────────────────

function buildTransform(v: MotionValues): string {
  const parts: string[] = [];
  if (v.y != null) parts.push(`translateY(${v.y}px)`);
  if (v.x != null) parts.push(`translateX(${v.x}px)`);
  if (v.scale != null) parts.push(`scale(${v.scale})`);
  if (v.rotate != null) parts.push(`rotate(${v.rotate}deg)`);
  return parts.join(" ") || "";
}

function stripMotionProps(props: Record<string, unknown>): Record<string, unknown> {
  const clean: Record<string, unknown> = {};
  for (const key of Object.keys(props)) {
    if (!MOTION_PROP_NAMES.has(key)) {
      clean[key] = props[key];
    }
  }
  return clean;
}

function resolveStyle(
  base: CSSProperties | undefined,
  values: MotionValues | undefined,
  duration: number,
  delay: number
): CSSProperties {
  const s: CSSProperties = { ...base };

  // Apply CSS transition for smooth animation
  const transitionStr = `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`;
  s.transition = base?.transition
    ? `${base.transition}, ${transitionStr}`
    : transitionStr;

  if (values) {
    if (values.opacity != null) s.opacity = values.opacity;
    const tf = buildTransform(values);
    if (tf) s.transform = tf;
  }

  return s;
}

// ─── Motion Component Factory ────────────────────────────────────────

function createMotionComponent(tag: string) {
  const Component = forwardRef<HTMLElement, any>(function MotionElement(
    props,
    forwardedRef
  ) {
    const {
      initial,
      animate,
      whileInView,
      viewport,
      transition,
      exit,
      style,
      children,
      ...rest
    } = props;

    const domProps = stripMotionProps(rest);
    const internalRef = useRef<HTMLElement>(null);

    // Merge refs
    const setRef = (el: HTMLElement | null) => {
      (internalRef as React.MutableRefObject<HTMLElement | null>).current = el;
      if (typeof forwardedRef === "function") forwardedRef(el);
      else if (forwardedRef)
        (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = el;
    };

    // For whileInView: start hidden, reveal on scroll
    // For animate-only: show immediately with transition
    const needsObserver = !!whileInView;
    const [visible, setVisible] = useState(!needsObserver);

    useEffect(() => {
      if (!needsObserver) return;
      const el = internalRef.current;
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (viewport?.once !== false) obs.unobserve(el);
          } else if (viewport?.once === false) {
            setVisible(false);
          }
        },
        {
          threshold: viewport?.amount || 0.1,
          rootMargin: viewport?.margin || "0px 0px -50px 0px",
        }
      );

      obs.observe(el);
      return () => obs.disconnect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dur = transition?.duration ?? 0.5;
    const del = transition?.delay ?? 0;

    // Determine current visual state
    const targetValues = whileInView || animate;
    const currentValues = visible ? targetValues : initial;
    const computedStyle = resolveStyle(style, currentValues, dur, del);

    // If no motion values, keep opacity at 1
    if (!initial && !targetValues) {
      delete computedStyle.opacity;
      delete computedStyle.transform;
    }

    return React.createElement(
      tag,
      { ref: setRef, style: computedStyle, ...domProps },
      children
    );
  });

  Component.displayName = `motion.${tag}`;
  return Component;
}

// ─── Motion Proxy ────────────────────────────────────────────────────
// Usage: <motion.div>, <motion.span>, <motion.article>, etc.

const componentCache = new Map<string, ReturnType<typeof createMotionComponent>>();

export const motion = new Proxy(
  {} as Record<string, ReturnType<typeof createMotionComponent>>,
  {
    get(_target, prop: string) {
      if (!componentCache.has(prop)) {
        componentCache.set(prop, createMotionComponent(prop));
      }
      return componentCache.get(prop)!;
    },
  }
);

// ─── AnimatePresence ─────────────────────────────────────────────────
// Lightweight passthrough — children get CSS transitions, no exit anim.

export function AnimatePresence({
  children,
}: {
  children: ReactNode;
  mode?: "sync" | "wait" | "popLayout";
  initial?: boolean;
  onExitComplete?: () => void;
}) {
  return <>{children}</>;
}

// ─── useInView Hook ──────────────────────────────────────────────────
// Drop-in replacement for framer-motion's useInView

export function useInView(
  ref: React.RefObject<HTMLElement | null>,
  options?: { once?: boolean; margin?: string; amount?: number | "some" | "all" }
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const threshold =
      typeof options?.amount === "number" ? options.amount : 0.1;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options?.once !== false) obs.unobserve(el);
        } else if (options?.once === false) {
          setInView(false);
        }
      },
      {
        threshold,
        rootMargin: options?.margin || "0px",
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return inView;
}

// ─── useScroll / useTransform stubs ──────────────────────────────────
// Some components may import these — provide no-op stubs

export function useScroll(_options?: Record<string, unknown>) {
  return {
    scrollY: { get: () => 0, onChange: () => () => {} },
    scrollYProgress: { get: () => 0, onChange: () => () => {} },
    scrollX: { get: () => 0, onChange: () => () => {} },
    scrollXProgress: { get: () => 0, onChange: () => () => {} },
  };
}

export function useTransform(
  _value: unknown,
  _inputRange: number[],
  _outputRange: unknown[]
) {
  return { get: () => _outputRange[0] };
}
