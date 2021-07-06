<template>
    <div data-cy="cy-po-line-chart">
        <span class="-d--none">{{ data }}</span>
        <canvas id="lineChart" ref="lineChartRef" width="2" height="1" data-cy="cy-line-chart"></canvas>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ChartData, ChartDataset, Position, Style, GridStyle } from '@/components/LineChart/chart-data';
import Chart, { ChartDataSets as ChartjsDatasets, GridLineOptions as ChartjsGridLineOptions } from 'chart.js';
@Component
export default class PoLineChart extends Vue {
    @Prop() private data!: ChartData;
    ichart!: Chart;
    mounted() {
        (Chart as any).NewLegend = (Chart as any).Legend.extend({
            draw: function() {
                const disabledColor: string = '#ACB0B5'; //Grey 40
                const me = this;
                const opts = me.options;
                const labelOpts = opts.labels;
                const globalDefault = Chart.defaults.global,
                    lineDefault = (globalDefault as any).elements.line,
                    legendWidth = me.width,
                    lineWidths = me.lineWidths;
                function getBoxWidth(labelOpts: any, fontSize: any) {
                    return labelOpts.usePointStyle ? fontSize * Math.SQRT2 : labelOpts.boxWidth;
                }
                if (opts.display) {
                    let ctx = me.ctx,
                        cursor: { x: any; y: any; line: any },
                        itemOrDefault = Chart.helpers.getValueOrDefault,
                        fontColor = itemOrDefault(labelOpts.fontColor, globalDefault.defaultFontColor),
                        fontSize = itemOrDefault(labelOpts.fontSize, globalDefault.defaultFontSize),
                        fontStyle = itemOrDefault(labelOpts.fontStyle, globalDefault.defaultFontStyle),
                        fontFamily = itemOrDefault(labelOpts.fontFamily, globalDefault.defaultFontFamily),
                        labelFont = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                    // Canvas setup
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'top';
                    ctx.lineWidth = 0.5;
                    ctx.strokeStyle = fontColor; // for strikethrough effect
                    ctx.fillStyle = fontColor; // render in correct colour
                    ctx.font = labelFont;
                    let boxWidth = getBoxWidth(labelOpts, fontSize),
                        hitboxes = me.legendHitBoxes;
                    // current position
                    let drawLegendBox = (x: any, y: any, legendItem: any) => {
                        if (isNaN(boxWidth) || boxWidth <= 0) {
                            return;
                        }
                        // Set the ctx for the box
                        ctx.save();
                        ctx.fillStyle = itemOrDefault(legendItem.fillStyle, (globalDefault as any).defaultColor);
                        ctx.lineCap = itemOrDefault(legendItem.lineCap, lineDefault.borderCapStyle);
                        ctx.lineDashOffset = itemOrDefault(legendItem.lineDashOffset, lineDefault.borderDashOffset);
                        ctx.lineJoin = itemOrDefault(legendItem.lineJoin, lineDefault.borderJoinStyle);
                        ctx.lineWidth = itemOrDefault(legendItem.lineWidth, lineDefault.borderWidth);
                        ctx.strokeStyle = itemOrDefault(legendItem.strokeStyle, (globalDefault as any).defaultColor);
                        let isLineWidthZero = itemOrDefault(legendItem.lineWidth, lineDefault.borderWidth) === 0;
                        if (ctx.setLineDash) {
                            // IE 9 and 10 do not support line dash
                            ctx.setLineDash(itemOrDefault(legendItem.lineDash, lineDefault.borderDash));
                        }
                        if (opts.labels && opts.labels.usePointStyle) {
                            // Recalculate x and y for drawPoint() because its expecting
                            // x and y to be center of figure (instead of top left)
                            let radius = (fontSize * Math.SQRT2) / 2;
                            let offSet = radius / Math.SQRT2;
                            let centerX = x + offSet;
                            let centerY = y + offSet;
                            // Draw pointStyle as legend symbol
                            (Chart as any).canvasHelpers.drawPoint(
                                ctx,
                                legendItem.pointStyle,
                                radius,
                                centerX,
                                centerY
                            );
                        } else {
                            // Draw box as legend symbol
                            if (!isLineWidthZero) {
                                ctx.strokeRect(x, y, boxWidth, fontSize);
                            }
                            ctx.fillRect(x, y, boxWidth, fontSize);
                        }
                        ctx.restore();
                    };
                    let fillText = (x: any, y: any, legendItem: any, textWidth: any) => {
                        if (legendItem.hidden) {
                            // set legend text to disabled color when hidden
                            ctx.fillStyle = Chart.helpers.color(disabledColor).rgbString();
                        }
                        ctx.fillText(legendItem.text, boxWidth + fontSize / 2 + x, y);
                        // restore the original fillStyle so we dont impact the rest of the labels
                        ctx.fillStyle = fontColor;
                    };
                    // Horizontal
                    let isHorizontal = me.isHorizontal();
                    if (isHorizontal) {
                        cursor = {
                            x: me.left + (legendWidth - lineWidths[0]) / 2,
                            y: me.top + labelOpts.padding,
                            line: 0,
                        };
                    } else {
                        cursor = {
                            x: me.left + labelOpts.padding,
                            y: me.top + labelOpts.padding,
                            line: 0,
                        };
                    }
                    let itemHeight = fontSize + labelOpts.padding;
                    Chart.helpers.each(me.legendItems, function(legendItem: any, i: any) {
                        let textWidth = ctx.measureText(legendItem.text).width,
                            width = boxWidth + fontSize / 2 + textWidth,
                            x = cursor.x,
                            y = cursor.y;
                        if (isHorizontal) {
                            if (x + width >= legendWidth) {
                                y = cursor.y += itemHeight;
                                cursor.line++;
                                x = cursor.x = me.left + (legendWidth - lineWidths[cursor.line]) / 2;
                            }
                        } else if (y + itemHeight > me.bottom) {
                            x = cursor.x = x + me.columnWidths[cursor.line] + labelOpts.padding;
                            y = cursor.y = me.top + labelOpts.padding;
                            cursor.line++;
                        }
                        drawLegendBox(x, y, legendItem);
                        hitboxes[i].left = x;
                        hitboxes[i].top = y;
                        fillText(x, y, legendItem, textWidth);
                        if (isHorizontal) {
                            cursor.x += width + labelOpts.padding;
                        } else {
                            cursor.y += itemHeight;
                        }
                    });
                }
            },
        });
        const ctx: HTMLCanvasElement = this.$refs['lineChartRef'] as HTMLCanvasElement;
        this.ichart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [],
            },
            plugins: [
                {
                    beforeInit: (chartInstance: any) => {
                        var legendOpts = chartInstance.options.legend;
                        if (legendOpts) {
                            this.createNewLegendAndAttach(chartInstance, legendOpts);
                        }
                        chartInstance.options.legend.afterFit = function() {
                            this.height = this.height + 50;
                        };
                    },
                    beforeUpdate: (chartInstance: any) => {
                        let legendOpts = chartInstance.options.legend;
                        if (legendOpts) {
                            legendOpts = Chart.helpers.configMerge(Chart.defaults.global.legend, legendOpts);
                            if (chartInstance.newLegend) {
                                chartInstance.newLegend.options = legendOpts;
                            } else {
                                this.createNewLegendAndAttach(chartInstance, legendOpts);
                            }
                        } else {
                            (Chart as any).layoutService.removeBox(chartInstance, chartInstance.newLegend);
                            delete chartInstance.newLegend;
                        }
                    },
                    afterEvent: (chartInstance: any, e: any) => {
                        let legend = chartInstance.newLegend;
                        if (legend) {
                            legend.handleEvent(e);
                        }
                    },
                },
            ],
            options: {
                responsive: true,
                layout: {
                    padding: {
                        left: 16,
                        right: 16,
                        top: 8,
                        bottom: 8,
                    },
                },
                tooltips: {
                    backgroundColor: '#000000',
                    titleFontFamily: 'Open Sans',
                    titleFontSize: 14,
                    titleFontStyle: '600',
                    titleFontColor: '#F8F9F9',
                    titleMarginBottom: 16,
                    bodyFontFamily: 'Open Sans',
                    bodyFontSize: 13,
                    bodyFontColor: '#F8F9F9',
                    bodySpacing: 8,
                    xPadding: 16,
                    yPadding: 8,
                    caretPadding: 8,
                    caretSize: 6,
                    multiKeyBackground: '#F8F9F9',
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                padding: 16,
                                //fontColor: '#53565A',
                                fontColor: '#FFFFFF',
                                fontFamily: 'Open Sans',
                                fontSize: 14,
                                lineHeight: 1.5,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                padding: 16,
                                //fontColor: '#53565A',
                                fontColor: '#242526', // Chi Grey 100
                                //fontFamily: 'Open Sans',
                                fontFamily: 'sans-serif',
                                fontSize: 14,
                                lineHeight: 1.5,
                            },
                        },
                    ],
                },
                legend: {
                    display: true,
                    position: this.data.legendPosition ? this.data.legendPosition : Position.TOP,
                    labels: {
                        usePointStyle: false,
                        boxWidth: 10,
                        padding: 10,
                        fontColor: '#242526', // Chi Grey 100
                        fontFamily: 'sans-serif',
                        fontSize: 12,
                    },
                },
            },
        });
        this.addChartData();
    }
    updated() {
        this.addChartData();
    }
    createNewLegendAndAttach(chartInstance: any, legendOpts: any) {
        const legend = new (Chart as any).NewLegend({
            ctx: chartInstance.chart.ctx,
            options: legendOpts,
            chart: chartInstance,
        });
        if (chartInstance.legend) {
            (Chart as any).layoutService.removeBox(chartInstance, chartInstance.legend);
            delete chartInstance.newLegend;
        }
        chartInstance.newLegend = legend;
        (Chart as any).layoutService.addBox(chartInstance, legend);
    }
    addGridStyle(gridStyle?: GridStyle[]): ChartjsGridLineOptions {
        let gridLineOptions: ChartjsGridLineOptions = {
            color: '#D0D4D9',
            display: false,
            drawTicks: false,
            offsetGridLines: false,
        };
        gridStyle &&
            gridStyle.forEach((gridStyle: GridStyle) => {
                switch (gridStyle) {
                    case Style.LINE:
                        gridLineOptions.display = true;
                        break;
                    case Style.TICKS:
                        gridLineOptions.drawTicks = true;
                        break;
                    case Style.OFFSET:
                        gridLineOptions.offsetGridLines = true;
                        break;
                    default:
                }
            });
        return gridLineOptions;
    }
    addChartData() {
        if (this.data) {
            if (this.data.labelsOrdered && this.data.datasets) {
                let index: number = 0;
                let indexByLabel: { [label: string]: number } = this.data.labelsOrdered.reduce(
                    (total: { [label: string]: number }, label: string) => {
                        if (label && label.trim()) {
                            total[label.trim().toLowerCase()] = index;
                            index = index + 1;
                        }
                        return total;
                    },
                    {}
                );
                this.ichart.data.datasets = [];
                this.ichart.data.labels = [
                    ...Object.keys(indexByLabel).map(
                        (label: string) => label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()
                    ),
                ];
                this.data.datasets.map((lineData: ChartDataset, lineIndex: number) => {
                    if (lineData.color && lineData.legend && lineData.dataset) {
                        let chartDataset: ChartjsDatasets = {
                            label: lineData.legend,
                            backgroundColor: lineData.color,
                            borderColor: lineData.color,
                            borderWidth: 2,
                            fill: false,
                            data: this.ichart.data.labels ? Array(this.ichart.data.labels.length).fill(0) : [],
                        };
                        Object.keys(lineData.dataset).map((label: string) => {
                            const pointIndex: number = indexByLabel[label.trim().toLowerCase()];
                            if (chartDataset.data && pointIndex < chartDataset.data.length) {
                                chartDataset.data[pointIndex] = lineData.dataset[label];
                            }
                        });
                        this.ichart.data.datasets && this.ichart.data.datasets.push(chartDataset);
                        this.ichart.update(); //removes a transition error in console
                    }
                });
            }
            if (this.data.title) {
                this.ichart.options.title = {
                    display: true,
                    fontFamily: 'Open Sans',
                    fontColor: '#53565A',
                    fontSize: 18,
                    padding: 8,
                    text: this.data.title.charAt(0).toUpperCase() + this.data.title.slice(1).toLowerCase(),
                };
                this.ichart.options.title.position = this.data.titlePosition ? this.data.titlePosition : Position.TOP;
            }
            if (this.ichart.options.scales) {
                if (
                    this.ichart.options.scales.xAxes &&
                    this.ichart.options.scales.xAxes.length > 0 &&
                    this.ichart.options.scales.xAxes[0].gridLines
                ) {
                    this.ichart.options.scales.xAxes[0].gridLines = {
                        ...this.ichart.options.scales.xAxes[0].gridLines,
                        ...this.addGridStyle(this.data.xGridStyle),
                    };
                }
                if (
                    this.ichart.options.scales.yAxes &&
                    this.ichart.options.scales.yAxes.length > 0 &&
                    this.ichart.options.scales.yAxes[0].gridLines
                ) {
                    this.ichart.options.scales.yAxes[0].gridLines = {
                        ...this.ichart.options.scales.yAxes[0].gridLines,
                        ...this.addGridStyle(this.data.yGridStyle),
                    };
                }
            }
            this.ichart.update();
        }
    }
}
</script>
