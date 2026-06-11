import { PointerHighlight } from "@/components/ui/pointer-highlight";

export default function PointerHighlightDemo3() {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 py-10 sm:grid-cols-3">
      <div className="rounded-xl border border-white/15 bg-[rgba(11,28,58,0.58)] p-6">
        <div className="h-28 w-full rounded-lg bg-[linear-gradient(135deg,rgba(137,214,255,0.45),rgba(125,255,230,0.35))]" />
        <div className="mx-auto mt-4 max-w-lg text-base font-bold tracking-tight md:text-base">
          <PointerHighlight
            rectangleClassName="bg-[rgba(137,214,255,0.2)] border-[color:var(--chart-2)]/45 leading-loose"
            pointerClassName="text-[color:var(--chart-2)] h-3 w-3"
            containerClassName="mr-1 inline-block"
          >
            <span className="relative z-10">Delivery speed</span>
          </PointerHighlight>
          with resilient architecture.
        </div>
      </div>
      <div className="rounded-xl border border-white/15 bg-[rgba(11,28,58,0.58)] p-6">
        <div className="h-28 w-full rounded-lg bg-[linear-gradient(135deg,rgba(255,151,188,0.36),rgba(137,214,255,0.32))]" />
        <div className="mx-auto mt-4 max-w-lg text-base font-bold tracking-tight md:text-base">
          Teams choose our
          <PointerHighlight
            rectangleClassName="mx-1 inline-block bg-[rgba(255,151,188,0.2)] border-[color:var(--chart-4)]/45 leading-loose"
            pointerClassName="text-[color:var(--chart-4)] h-3 w-3"
            containerClassName="mx-1 inline-block"
          >
            <span className="relative z-10">engineering clarity</span>
          </PointerHighlight>
          every sprint.
        </div>
      </div>
      <div className="rounded-xl border border-white/15 bg-[rgba(11,28,58,0.58)] p-6">
        <div className="h-28 w-full rounded-lg bg-[linear-gradient(135deg,rgba(255,191,138,0.35),rgba(168,255,233,0.3))]" />
        <div className="mx-auto mt-4 max-w-lg text-base font-bold tracking-tight md:text-base">
          Built for
          <PointerHighlight
            rectangleClassName="ml-1 inline-block bg-[rgba(255,191,138,0.2)] border-[color:var(--chart-5)]/45 leading-loose"
            pointerClassName="text-[color:var(--chart-5)] h-3 w-3"
            containerClassName="ml-1 inline-block"
          >
            <span className="relative z-10">production launches</span>
          </PointerHighlight>
          at startup pace.
        </div>
      </div>
    </div>
  );
}
