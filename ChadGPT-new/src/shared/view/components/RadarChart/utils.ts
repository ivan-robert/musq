const degToRadians = (degree: number): number => (degree * Math.PI) / 180;

export type Point = [number, number];

export const edgePointCalculatorFor =
  (center: Point, radius: number) =>
  (degree: number, radiusPercentage = 100): Point => {
    const degreeInRadians = degToRadians(degree);
    return [
      center[0] + (Math.cos(degreeInRadians) * radius * radiusPercentage) / 100,
      center[1] + (Math.sin(degreeInRadians) * radius * radiusPercentage) / 100,
    ];
  };
