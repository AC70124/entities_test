export enum Position {
    TOP = 'top',
    LEFT = 'left',
    BOTTOM = 'bottom',
    RIGHT = 'right',
}
export type ChartPosition = Position.TOP | Position.LEFT | Position.BOTTOM | Position.RIGHT;

export enum Line {
    X = 'lineX',
    Y = 'lineY',
}
export enum LineTicks {
    X = 'lineTicksX',
    Y = 'lineTicksY',
}
export enum Offset {
    X = 'offsetX',
    Y = 'offsetY',
}
export enum OffsetTicks {
    X = 'offsetTicksX',
    Y = 'offsetTicksY',
}
export enum Style {
    LINE = 'line',
    TICKS = 'ticks',
    OFFSET = 'offset',
}
export type GridStyle = Style.LINE | Style.TICKS | Style.OFFSET;

export interface ChartDataset {
    legend: string;
    color: string;
    dataset: { [label: string]: number };
}

export interface ChartData {
    labelsOrdered: string[];
    datasets: ChartDataset[];

    title?: string;
    titlePosition?: ChartPosition;
    legendPosition?: ChartPosition;
    xGridStyle?: GridStyle[];
    yGridStyle?: GridStyle[];
}
