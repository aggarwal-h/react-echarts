import { init, type SetOptionOpts, type EChartsType } from "echarts";
import type { CSSProperties, RefObject } from "react";

type EChartsInit = typeof init;
type EChartsInitParameters = Parameters<EChartsInit>;
type EChartsTheme = NonNullable<EChartsInitParameters[1]>;
type EChartsInitOpts = NonNullable<EChartsInitParameters[2]>;
type EChartsOption = any;

type Ref = RefObject<HTMLDivElement>;

type ReactEChartsProps = {
  /**
   * The global ECharts object (full or core).
   */
  echarts: any;

  /**
   * The ref of the customized model.
   */
  ref: Ref;

  /**
   * The ECharts options object containing the chart's configuration and data.
   * See: https://echarts.apache.org/en/api.html#echarts.init
   */
  option: EChartsOption;

  /**
   * The ECharts theme to be applied.
   */
  theme?: EChartsTheme;

  /**
   * Optional chart configurations when initializing the chart.
   */
  opts?: EChartsInitOpts;

  /**
   * An object mapping the ECharts event name to its callback function.
   * Events: https://echarts.apache.org/en/api.html#events
   */
  onEvents?: Record<string, Function>;

  /**
   * Whether or not to merge with the previous option when setting a new option.
   * (false by default)
   */
  notMerge?: boolean;

  /**
   * Whether or not to update the chart immediately on change.
   * (false by default)
   */
  lazyUpdate?: boolean;

  /**
   * Whether or not show loading on the chart.
   * (false by default)
   */
  showLoading?: boolean;

  /**
   * The loading configuration.
   * (null by default)
   */
  loadingOption?: any;

  /**
   * Whether or not to debounce the resize functionality by 250ms.
   * (false by default)
   */
  debouncedResize?: boolean;
};
type ReactEChartsComponentProps = ReactEChartsProps & {
  /**
   * Additional CSS classes to pass down to the chart container.
   */
  className?: string;

  /**
   * Inline styles to customize the chart container.
   */
  style?: CSSProperties;
};

export type {
  Ref,
  ReactEChartsProps,
  ReactEChartsComponentProps,
  SetOptionOpts as EChartsSetOptionOpts,
  EChartsTheme,
  EChartsInitOpts,
  EChartsType,
  EChartsOption,
  EChartsInit,
};
