"use client";

import { type ImgHTMLAttributes, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type PoemAnimationProps = {
  poemHTML: string;
  backgroundImageUrl: string;
  boyImageUrl: string;
  className?: string;
};

type DecorativeImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  className: string;
};

function DecorativeImage({
  className,
  alt = "",
  ...props
}: DecorativeImageProps) {
  // biome-ignore lint/performance/noImgElement: This component intentionally uses raw images for a cinematic layered composition.
  return <img className={className} alt={alt} {...props} />;
}

type FaceTextProps = {
  className: string;
  html: string;
};

function FaceText({ className, html }: FaceTextProps) {
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: The HTML is assembled from local project copy and rendered as part of a controlled animation effect.
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

/**
 * Renders the 3D poem animation hero section.
 */
function PoemAnimation({
  poemHTML,
  backgroundImageUrl,
  boyImageUrl,
  className,
}: PoemAnimationProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);

  // This effect handles the responsive scaling of the animation container.
  useEffect(() => {
    function adjustContentSize() {
      if (contentRef.current) {
        const viewportWidth = window.innerWidth;
        const baseWidth = 1000;
        const scaleFactor =
          viewportWidth < baseWidth
            ? Math.max(0.66, (viewportWidth / baseWidth) * 0.9)
            : 1;
        contentRef.current.style.transform = `scale(${scaleFactor})`;
      }
    }

    adjustContentSize();
    window.addEventListener("resize", adjustContentSize);
    return () => window.removeEventListener("resize", adjustContentSize);
  }, []);

  return (
    <header className={cn("hero-section poem-animation", className)}>
      <div className="container">
        <div
          ref={contentRef}
          className="content"
          style={{
            display: "block",
            width: "1000px",
            height: "562px",
            transformOrigin: "center top",
          }}
        >
          <div className="container-full">
            <div className="animated hue" />
            <DecorativeImage
              className="backgroundImage"
              src={backgroundImageUrl}
              alt="Abstract studio background"
              loading="eager"
              decoding="async"
              draggable={false}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <DecorativeImage
              className="boyImage"
              src={boyImageUrl}
              alt="Foreground studio layer"
              loading="eager"
              decoding="async"
              draggable={false}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />

            <div className="container">
              <div className="cube">
                <div className="face top" />
                <div className="face bottom" />
                <FaceText className="face left text" html={poemHTML} />
                <FaceText className="face right text" html={poemHTML} />
                <div className="face front" />
                <FaceText className="face back text" html={poemHTML} />
              </div>
            </div>

            <div className="container-reflect">
              <div className="cube">
                <div className="face top" />
                <div className="face bottom" />
                <FaceText className="face left text" html={poemHTML} />
                <FaceText className="face right text" html={poemHTML} />
                <div className="face front" />
                <FaceText className="face back text" html={poemHTML} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export { PoemAnimation };
