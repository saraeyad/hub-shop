export const durations = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
} as const;

export const easings = {
  easeOut: [0.16, 1, 0.3, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  spring: [0.68, -0.55, 0.265, 1.55] as const,
} as const;

export const productCardAnimations = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
  },
  transition: {
    duration: durations.normal,
    ease: easings.easeOut,
  },
  staggerDelay: 0.05,
  hover: {
    scale: 1.02,
    transition: {
      duration: durations.fast,
    },
  },
} as const;

export const pageTransitions = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.4,
      ease: easings.easeOut,
    },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: {
      duration: 0.4,
      ease: easings.easeOut,
    },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: durations.normal,
    },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: durations.normal,
      ease: easings.easeOut,
    },
  },
} as const;

export const buttonAnimations = {
  hover: {
    scale: 1.05,
    transition: { duration: durations.fast },
  },
  tap: {
    scale: 0.95,
    transition: { duration: durations.fast },
  },
} as const;

export const badgeAnimations = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    type: "spring",
    stiffness: 500,
    damping: 30,
  },
} as const;

export const breadcrumbAnimations = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  transition: {
    duration: durations.normal,
    ease: easings.easeOut,
  },
} as const;

export const reviewCardAnimations = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: durations.normal,
    ease: easings.easeOut,
  },
  staggerDelay: 0.1,
} as const;

export const headerAnimations = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: durations.normal,
    ease: easings.easeOut,
  },
} as const;

export const imageAnimations = {
  initial: { opacity: 0, scale: 1.1 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    duration: durations.slow,
    ease: easings.easeOut,
  },
} as const;

export const getStaggerDelay = (
  index: number,
  delay: number = productCardAnimations.staggerDelay
): number => {
  return index * delay;
};
