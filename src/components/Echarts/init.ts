/*
 * @Description:按需引用echarts
 * @Autor: xiukun@herry
 * @Date: 2021-03-05 10:06:44
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-05 11:53:45
 */

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';

// 引入图表，图表后缀都为 Chart
import {
    BarChart,
    LineChart,
    PieChart,
    RadarChart,
    // 系列类型
    BarSeriesOption,
    LineSeriesOption,
    PieSeriesOption,
    RadarSeriesOption
} from 'echarts/charts';
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    RadarComponent,
    // 组件类型
    TitleComponentOption,
    GridComponentOption
} from 'echarts/components';
// 引入 Canvas或Svg 渲染器，注意至少引入CanvasRenderer或者SVGRenderer其一，是必须的一步
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ComposeOption = echarts.ComposeOption<
    | BarSeriesOption
    | LineSeriesOption
    | PieSeriesOption
    | RadarSeriesOption
    | TitleComponentOption
    | GridComponentOption
>;

echarts.use([
    BarChart,
    LineChart,
    PieChart,
    RadarChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    RadarComponent,
    CanvasRenderer,
    SVGRenderer
]);

export { ComposeOption, echarts };
