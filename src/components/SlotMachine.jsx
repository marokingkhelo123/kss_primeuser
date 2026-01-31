import { useEffect, useMemo, useState } from "react";

// Single reel that can spin or snap to a target index.
const SlotReel = ({ images = [], reelState = {}, spinSpeed = 150 }) => {
  const { currentIndex = 0, isSpinning = false, targetIndex = null } = reelState;
  const totalImages = images?.length ?? 0;
  const [displayIndex, setDisplayIndex] = useState(() => {
    if (!totalImages) return 0;
    return ((currentIndex % totalImages) + totalImages) % totalImages;
  });

  // Keep display index in sync when images or starting index change
  useEffect(() => {
    if (!totalImages) return;
    setDisplayIndex(((currentIndex % totalImages) + totalImages) % totalImages);
  }, [currentIndex, totalImages]);

  // Spin continuously while isSpinning is true
  useEffect(() => {
    if (!totalImages || !isSpinning) return;

    const interval = setInterval(() => {
      setDisplayIndex((prev) => (prev + 1) % totalImages);
    }, spinSpeed);

    return () => clearInterval(interval);
  }, [isSpinning, spinSpeed, totalImages]);

  // When spinning stops, snap to the target (if provided)
  useEffect(() => {
    if (!totalImages || isSpinning) return;

    const nextIndex =
      targetIndex === null || targetIndex === undefined
        ? currentIndex
        : targetIndex;

    setDisplayIndex(((nextIndex % totalImages) + totalImages) % totalImages);
  }, [isSpinning, targetIndex, currentIndex, totalImages]);

  if (!images || totalImages === 0) return null;

  // Translate by one frame height at a time. Percent in transform is
  // relative to the element being transformed, so we scale by totalImages.
  const translateY =
    totalImages > 0
      ? `translateY(-${(displayIndex * 100) / totalImages}%)`
      : "translateY(0)";
  const transition = isSpinning
    ? `transform ${spinSpeed}ms linear`
    : "transform 650ms cubic-bezier(0.2, 0.7, 0.25, 1)";

  return (
    <div
      className="relative w-full h-full"
      style={{
        overflow: "hidden",
        borderRadius: "4px",
      }}
    >
      <div
        className="w-full h-full flex flex-col"
        style={{
          transform: translateY,
          transition,
          willChange: "transform",
          height: `${totalImages * 100}%`,
        }}
      >
        {images.map((src, idx) => (
          <img
            key={`${src}-${idx}`}
            src={src}
            alt="Slot"
            className="w-full object-fill flex-shrink-0"
            style={{ height: `${100 / totalImages}%` }}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Slot machine display that renders three reels on top of a machine image.
 *
 * Props:
 * - machineImage: background machine illustration.
 * - pictureImages, numberImages, multiplierImages: arrays of reel frames.
 * - state: { pictureReel, numberReel, multiplierReel } with { currentIndex, isSpinning, targetIndex }.
 * - speed: interval (ms) for spin tick while spinning.
 * - values: optional { picture, number, multiplier } to set display when stopped.
 * - positions: optional style overrides for reel hitboxes.
 */
const SlotMachine = ({
  machineImage,
  pictureImages = [],
  numberImages = [],
  multiplierImages = [],
  state = {},
  speed = 150,
  values = {},
  positions,
  className = "",
  style = {},
}) => {
  const defaultPositions = useMemo(
    () => ({
      picture: { width: "15%", height: "18%", right: "68%", bottom: "12%" },
      number: { width: "15%", height: "18%", right: "43%", bottom: "12%" },
      multiplier: { width: "15%", height: "18%", right: "17%", bottom: "12%" },
      ...positions,
    }),
    [positions]
  );

  const resolvedState = {
    pictureReel: {
      currentIndex:
        values?.picture ??
        state?.pictureReel?.currentIndex ??
        state?.picture ??
        0,
      isSpinning: state?.pictureReel?.isSpinning ?? false,
      targetIndex: state?.pictureReel?.targetIndex ?? null,
    },
    numberReel: {
      currentIndex:
        values?.number ??
        state?.numberReel?.currentIndex ??
        state?.number ??
        0,
      isSpinning: state?.numberReel?.isSpinning ?? false,
      targetIndex: state?.numberReel?.targetIndex ?? null,
    },
    multiplierReel: {
      currentIndex:
        values?.multiplier ??
        state?.multiplierReel?.currentIndex ??
        state?.multiplier ??
        0,
      isSpinning: state?.multiplierReel?.isSpinning ?? false,
      targetIndex: state?.multiplierReel?.targetIndex ?? null,
    },
  };

  return (
    <div className={`relative ${className}`} style={style}>
      {machineImage ? (
        <img
          src={machineImage}
          alt="Slot Machine"
          className="w-full h-full object-fill"
        />
      ) : null}

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute flex items-center justify-center"
          style={defaultPositions.picture}
        >
          <SlotReel
            images={pictureImages}
            reelState={resolvedState.pictureReel}
            spinSpeed={speed}
          />
        </div>

        <div
          className="absolute flex items-center justify-center"
          style={defaultPositions.number}
        >
          <SlotReel
            images={numberImages}
            reelState={resolvedState.numberReel}
            spinSpeed={speed}
          />
        </div>

        <div
          className="absolute flex items-center justify-center"
          style={defaultPositions.multiplier}
        >
          <SlotReel
            images={multiplierImages}
            reelState={resolvedState.multiplierReel}
            spinSpeed={speed}
          />
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;

