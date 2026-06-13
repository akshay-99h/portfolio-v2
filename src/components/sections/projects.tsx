import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { PlatePreview } from "@/components/projects/plate-preview";
import { PROJECT_GROUPS, PROJECTS } from "@/lib/data/projects";

function ProjectsSection() {
  return (
    <section
      className="px-4 pt-16 pb-16 sm:px-6 sm:pt-24"
      aria-label="Work index"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="rule-x reg-tick" />
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4">
          <p className="section-kicker">Sheet 02 — Work index</p>
          <p className="dim-label">
            {String(PROJECTS.length).padStart(2, "0")} builds ·{" "}
            {PROJECT_GROUPS.length} sets
          </p>
        </div>

        <h1 className="display-section mt-10 max-w-3xl lg:mt-14">
          Every build on the board, drawn to scale.
        </h1>
        <p className="section-copy mt-5 max-w-xl text-sm sm:text-base">
          Mobile products, public platforms, operational web systems, and the
          occasional game build. Each plate is redrawn from the project's real
          entry page — its palette, its type, its first screen.
        </p>

        <div className="mt-14 space-y-16 lg:mt-20 lg:space-y-20">
          {PROJECT_GROUPS.map((group, groupIndex) => {
            const setLetter = String.fromCharCode(65 + groupIndex);
            const projects = PROJECTS.filter(
              (project) => project.group === group.id,
            );

            return (
              <section key={group.id} aria-label={group.label}>
                <div className="rule-x" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4">
                  <p className="section-kicker">
                    Set {setLetter} — {group.label}
                  </p>
                  <p className="dim-label">
                    {String(projects.length).padStart(2, "0")} plate
                    {projects.length === 1 ? "" : "s"}
                  </p>
                </div>
                <p className="section-copy mt-3 max-w-xl text-sm">
                  {group.description}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {projects.map((project, index) => (
                    <article
                      key={project.slug}
                      className="flex flex-col border border-border bg-card transition-colors duration-300 hover:border-foreground/35"
                    >
                      <PlatePreview
                        project={project}
                        plateLabel={`PLT.${setLetter}${String(
                          index + 1,
                        ).padStart(2, "0")}`}
                      />
                      <div className="flex flex-1 flex-col border-t border-border/80 p-4">
                        <p className="text-sm leading-6 text-muted-foreground">
                          {project.summary}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
                          {project.stack.slice(0, 4).map((item) => (
                            <span
                              key={item}
                              className="dim-label text-[0.6rem]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                        <div className="mt-auto pt-4">
                          {project.link ? (
                            <a
                              href={project.link.href}
                              target="_blank"
                              rel="noreferrer"
                              className="dim-label inline-flex items-center gap-1.5 text-foreground/80 transition-colors hover:text-[color:var(--signal)]"
                            >
                              {project.link.label}
                              <ArrowUpRight className="size-3" />
                            </a>
                          ) : (
                            <span className="dim-label text-muted-foreground/70">
                              Private build — demo on request
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="rule-x mt-16 lg:mt-20" />
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4">
          <p className="dim-label">End of index</p>
          <Link
            href="/contact"
            className="dim-label text-foreground/80 transition-colors hover:text-foreground"
          >
            Commission a build →
          </Link>
        </div>
      </div>
    </section>
  );
}

export { ProjectsSection };
