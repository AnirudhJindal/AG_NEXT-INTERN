import PixelSnow from "./PixelSnow";

export const BackgroundSnow = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <PixelSnow
        color="#ffffff"
        flakeSize={0.01}
        minFlakeSize={1.25}
        pixelResolution={4800}
        speed={1.25}
        density={0.5}
        direction={125}
        brightness={1}
      />
    </div>
  );
};
