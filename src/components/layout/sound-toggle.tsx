"use client";

import { Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAudio } from "@/lib/audio/use-audio";

function SoundToggle() {
  const { muted, toggle } = useAudio();

  return (
    <Button
      variant="outline"
      size="icon-sm"
      aria-label={muted ? "Enable sound" : "Mute sound"}
      aria-pressed={!muted}
      onClick={toggle}
    >
      {muted ? (
        <VolumeX className="size-4" />
      ) : (
        <Volume2 className="size-4 text-signal" />
      )}
    </Button>
  );
}

export { SoundToggle };
