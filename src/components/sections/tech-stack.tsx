import { SectionContainer } from "@/components/layout/section-container";
import { CLIENT_CAPABILITY_GROUPS, STACK_GROUPS } from "@/lib/data/tech-stack";

function TechStackSection() {
  return (
    <SectionContainer id="tech" className="pb-14 sm:pb-18">
      <div className="max-w-3xl">
        <p className="section-kicker">Capabilities</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          What a client can actually hand off to Akxost Studio.
        </h1>
        <p className="section-copy mt-4 text-sm sm:text-base">
          Start with the outcome, not the tools. These are the areas where the
          studio can take direct ownership, from customer-facing products to the
          backend and operational systems behind them.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {CLIENT_CAPABILITY_GROUPS.map((group) => (
          <section
            key={group.name}
            className="rounded-[1.6rem] border border-border bg-card px-6 py-6"
          >
            <div>
              <p className="section-kicker">{group.name}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {group.summary}
              </p>
            </div>

            <ul className="mt-5 space-y-2">
              {group.examples.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-foreground/84"
                >
                  <span className="mt-[0.48rem] h-1.5 w-1.5 rounded-full bg-[color:var(--chart-1)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-12 border-t border-border pt-8">
        <div className="max-w-2xl">
          <p className="section-kicker">Implementation Stack</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            If your team does care about the underlying stack, these are the
            primary tools used most often across delivery.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          {STACK_GROUPS.map((group) => (
            <section
              key={group.name}
              className="rounded-[1.4rem] border border-border bg-transparent px-5 py-5"
            >
              <p className="text-sm font-semibold tracking-tight">
                {group.name}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

export { TechStackSection };
