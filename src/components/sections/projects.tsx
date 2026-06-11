import { ArrowUpRight } from "lucide-react";

import { SectionContainer } from "@/components/layout/section-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROJECT_GROUPS, PROJECTS } from "@/lib/data/projects";

function ProjectsSection() {
  return (
    <SectionContainer id="projects" className="pb-14 sm:pb-18">
      <div className="max-w-3xl">
        <p className="section-kicker">Selected work</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          A cross-section of the products and platforms Akxost Studio has
          shipped.
        </h1>
        <p className="section-copy mt-4 text-sm sm:text-base">
          The work spans mobile products, public platforms, and operationally
          useful web systems. Each project shows the kinds of problems the
          agency is built to take on.
        </p>
      </div>

      <div className="mt-10 space-y-10">
        {PROJECT_GROUPS.map((group) => {
          const projects = PROJECTS.filter(
            (project) => project.group === group.id,
          );

          return (
            <section key={group.id} className="space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-3">
                <div>
                  <p className="section-kicker">{group.label}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {group.description}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {projects.length} project{projects.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="divide-y divide-border">
                {projects.map((project, index) => (
                  <article
                    key={project.slug}
                    className="grid gap-4 py-5 lg:grid-cols-[0.18fr_1fr_0.92fr]"
                  >
                    <div className="text-xs font-mono tracking-[0.3em] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-xl font-semibold tracking-tight">
                          {project.name}
                        </h3>
                        <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                          {project.platform}
                        </span>
                      </div>
                      <p className="text-sm leading-7 text-muted-foreground">
                        {project.summary}
                      </p>
                    </div>

                    <div className="space-y-3 lg:justify-self-end lg:text-right">
                      <p className="text-sm leading-7 text-foreground/82">
                        {project.details}
                      </p>

                      <div className="flex flex-wrap gap-2 lg:justify-end">
                        {project.stack.slice(0, 3).map((item) => (
                          <Badge
                            key={item}
                            variant="outline"
                            className="px-2.5 py-1 text-[11px]"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                        {project.link ? (
                          <Button asChild variant="outline" size="sm">
                            <a
                              href={project.link.href}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {project.link.label}
                              <ArrowUpRight className="size-4" />
                            </a>
                          </Button>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Private project
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
    </SectionContainer>
  );
}

export { ProjectsSection };
