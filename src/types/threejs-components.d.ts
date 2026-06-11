declare module "threejs-components/build/cursors/tubes1.min.js" {
  type TubesApp = {
    tubes: {
      setColors: (colors: string[]) => void;
      setLightsColors: (colors: string[]) => void;
    };
    dispose?: () => void;
  };

  type TubesCursorOptions = {
    tubes: {
      colors: string[];
      lights: {
        intensity: number;
        colors: string[];
      };
    };
  };

  const TubesCursor: (
    canvas: HTMLCanvasElement,
    options: TubesCursorOptions,
  ) => TubesApp;

  export default TubesCursor;
}
