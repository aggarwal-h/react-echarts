import { useCallback, useLayoutEffect, useRef } from "react";
import useResizeObserver from "use-resize-observer";
import debounce from "just-debounce-it";

import { EChartsType, ReactEChartsProps } from "../types";
import { typeIsFunction, typeIsString } from "../utils";

/**
 * A hook to setup ECharts.
 */
const useReactECharts = (props: ReactEChartsProps) => {
  const chartRef = useRef<EChartsType>();
  const isFirstResize = useRef<boolean>(true);

  const bindEvents = useCallback(
    (
      instance: EChartsType | undefined,
      events: ReactEChartsProps["onEvents"]
    ) => {
      for (const [eventType, eventCallback] of Object.entries(events ?? {})) {
        if (typeIsString(eventType) && typeIsFunction(eventCallback)) {
          instance?.on(eventType, (parameters) => {
            eventCallback(parameters, instance);
          });
        } else {
          console.warn(
            "The event passed in must be a string, and the callback must be a function.",
            eventType,
            eventCallback
          );
        }
      }
    },
    []
  );

  const disposeChart = useCallback(() => {
    if (props.ref.current) {
      props.echarts.dispose(props.ref.current);
    }
  }, [props.echarts]);

  const resizeChart = debounce(
    () => {
      const instance = getEchartsInstance();
      if (!isFirstResize.current && instance) {
        try {
          instance.resize({
            width: "auto",
            height: "auto",
          });
        } catch (e) {
          console.warn(e);
        }
      }
      isFirstResize.current = false;
    },
    props.debouncedResize ? 250 : 0
  );

  const getEchartsInstance = useCallback((): EChartsType | undefined => {
    if (props.ref.current) {
      return props.echarts.getInstanceByDom(props.ref.current) as EChartsType;
    }
    return undefined;
  }, [props.echarts]);

  useResizeObserver({
    ref: props.ref,
    onResize: resizeChart,
  });

  useLayoutEffect(() => {
    chartRef.current = props.echarts.init(
      props.ref.current,
      props.theme,
      props.opts
    );
    return () => {
      disposeChart();
    };
  }, []);

  useLayoutEffect(() => {
    bindEvents(chartRef.current as EChartsType, props.onEvents ?? {});
  }, [
    bindEvents,
    disposeChart,
    props.onEvents,
    props.theme,
    props.opts,
    props.echarts,
  ]);

  useLayoutEffect(() => {
    const instance = getEchartsInstance();
    instance?.setOption(props.option, props.notMerge, props.lazyUpdate);
    if (props.showLoading) {
      instance?.showLoading(props.loadingOption);
    } else {
      instance?.hideLoading();
    }
  }, [
    props.option,
    props.notMerge,
    props.lazyUpdate,
    props.showLoading,
    props.loadingOption,
    getEchartsInstance,
  ]);

  return chartRef.current;
};

export default useReactECharts;
