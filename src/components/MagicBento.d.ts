import type { ComponentType, ReactNode } from "react";

type MagicBentoProps = {
  items?: unknown[];
  renderCard?: (item: unknown, index: number) => ReactNode;
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
};

declare const MagicBento: ComponentType<MagicBentoProps>;

export default MagicBento;
