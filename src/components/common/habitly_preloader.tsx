import { PreloaderContent } from "./preloader_part/preloader_content";
import { usePreloaderAnimations } from "./preloader_part/preloader_animations";

interface HabitlyPreloaderProps {
  message?: string;
}

export function HabitlyPreloader({
  message = "Preparing your habits...",
}: HabitlyPreloaderProps) {
  const { opacity, scale, rotateInterpolation, progressWidth } =
    usePreloaderAnimations();

  return (
    <PreloaderContent
      message={message}
      opacity={opacity}
      scale={scale}
      rotateInterpolation={rotateInterpolation}
      progressWidth={progressWidth}
    />
  );
}
