import { forwardRef } from "react";
import useReactECharts from "../hooks/useReactECharts";
import { ReactEChartsComponentProps, Ref } from "../types";

/**
 * A component that wraps the ReactECharts hook and displays the chart.
 */
const ReactECharts = forwardRef<Ref, ReactEChartsComponentProps>(
  ({ className, style, ...hookProps }, ref): JSX.Element => {
    useReactECharts({ ...hookProps, ref: ref as Ref });
    const defaultStyle = { height: "300px", width: "100%" };
    return (
      <div
        className={className}
        style={{ ...defaultStyle, ...style }}
        ref={ref as Ref}
      />
    );
  }
);

export default ReactECharts;
