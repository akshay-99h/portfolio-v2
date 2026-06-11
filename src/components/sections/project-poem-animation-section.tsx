import { PoemAnimation } from "@/components/ui/3d-animation";
import { PROJECTS } from "@/lib/data/projects";

const lifestyleProjects = PROJECTS.filter(
  (project) => project.group === "lifestyle",
);
const communityProjects = PROJECTS.filter(
  (project) => project.group === "community",
);

const ANIMATION_DATA = {
  poemHTML: `
    <p>
      The <span>Lifestyle</span> line — <span>${lifestyleProjects[0].name}</span>, <span>${lifestyleProjects[1].name}</span>, and <span>${lifestyleProjects[2].name}</span> — focuses on Android and iOS products shaped for quick repeat actions, clear task flow, and releases that stay small enough to ship cleanly.
    </p>
    <p>
      The <span>Community</span> line — <span>${communityProjects[0].name}</span>, <span>${communityProjects[1].name}</span>, and <span>${communityProjects[2].name}</span> — turns public-facing web work into maintainable content systems, simple navigation, and dependable deployment.
    </p>
    <p>
      Across every build, the studio keeps <span>clarity</span>, <span>ownership</span>, and <span>restraint</span> at the center so the product stays easy to use, easy to hand off, and easier to grow.
    </p>
  `,
  backgroundImageUrl:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2000&q=80",
  boyImageUrl:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
};

function ProjectPoemAnimationSection() {
  return (
    <section className="pt-6 sm:pt-10">
      <PoemAnimation
        poemHTML={ANIMATION_DATA.poemHTML}
        backgroundImageUrl={ANIMATION_DATA.backgroundImageUrl}
        boyImageUrl={ANIMATION_DATA.boyImageUrl}
      />
    </section>
  );
}

export { ProjectPoemAnimationSection };
