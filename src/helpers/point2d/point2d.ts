export type Direction = {
  Up: string;
  Right: string;
  Left: string;
  Down: string;
};

export class Point2D {
  x: number;
  y: number;
  data: any;
  connections: Record<string, PointConnector>;

  constructor(x: number, y: number, data?: any) {
    this.x = x;
    this.y = y;
    this.data = data;
    this.connections = {};
  }

  getLocationAsString(): string {
    return this.x + ', ' + this.y
  }
}

export class PointConnector {
  start: Point2D;
  end: Point2D;
  weight: number;

  constructor(start: Point2D, end: Point2D, weight: number = 1) {
    this.start = start;
    this.end = end;
    this.weight = weight;
  }
}

export class Point2DMap {
  start: Point2D;
  map: Map<string, Point2D>
  allConnectors: PointConnector[] = [];

  constructor(start: Point2D) {
    this.start = start;
  }
  addPoint(p: Point2D) {
    this.map.set(p.getLocationAsString(), p)
  }
}

const upDownLeftRight: Point2D[] = [
  new Point2D(-1, 0),
  new Point2D(1, 0),
  new Point2D(0, -1),
  new Point2D(0, 1),
];
