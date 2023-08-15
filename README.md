# @aggarwal-h/react-echarts

![React ECharts Library](./assets/react-echarts-banner.png)

This React Library simplifies the process of integrating ECharts, a popular JavaScript charting library, into your React applications. This library provides a set of components and hooks that make it easy to create dynamic and interactive charts, graphs, and visualizations using ECharts within your React projects.

## Features

- 📊 Easy integration of ECharts into React applications.
- 🚀 Hooks for full control over your elements.
- ⏳️ Real-time data updates for dynamic visualizations.
- 📱 Responsive design for optimal viewing across devices.

## Installation

You can install this library using your favourite package manager:

```bash
pnpm add @aggarwal-h/react-echarts
```

or

```bash
npm install @aggarwal-h/react-echarts --save
```

or

```bash
yarn add @aggarwal-h/react-echarts
```

Note: You must also install the `echarts` library for this to work.

## Usage with Hooks (Recommended)

### Basic Usage

1. Import the `echarts` library:
```javascript
import * as echarts from "echarts";
```

2. Import the `useReactECharts` hook from this library:

```javascript
import useReactECharts from "@aggarwal-h/react-echarts";
```

3. Create a `ref` for the `div` element the chart will be rendered in:
```javascript
const chartRef = useRef(null);
```

4. Setup the hook imported above:
```javascript
useReactECharts({ echarts: echarts, option: option, ref: chartRef });
```
Note: you must create an `option` object. See more here: https://echarts.apache.org/en/option.html

5. Create an empty `div` element with the ref created above:
```jsx
<div ref={chartRef} style={{ height: "500px", width: "100%" }} />
```

6. In summary, you should have something that looks like this:

```jsx
import React, { useRef } from 'react';
import * as echarts from "echarts";
import useReactECharts from "@aggarwal-h/react-echarts";

const option = {
    // Your option configuration goes here...
}

function App() {
    const chartRef = useRef(null);

    useReactECharts({ echarts: echarts, option: option, ref: chartRef });

    return (
        <div>
            <h1>ECharts Demo</h1>
            <div ref={chartRef} style={{ height: "500px", width: "100%" }} />
        </div>
  );
}

export default App;
```

### Advanced Usage
To minimize the bundle size, import only the components you need. The rest remains the same as shown in the basic usage.
```jsx
import React, { useRef } from "react";
import * as echarts from "echarts/core";
import useReactECharts from "@aggarwal-h/react-echarts";
import { 
    LineChart,
    // ... Import the charts you need
 } from "echarts/charts";
import {
  GridComponent,
  AxisPointerComponent,
  // Import the components you need
} from "echarts/components";
import { 
    CanvasRenderer, 
    SVGRenderer 
} from "echarts/renderers";

import { 
    ScatterGLChart,
    // Import the WebGL components you need
} from "echarts-gl/charts";


// Register components with Echarts
echarts.use([
  LineChart,
  GridComponent,
  AxisPointerComponent,
  CanvasRenderer,
  SVGRenderer,
]);


// Configure theme
const DARK_THEME = {
    // Dark Theme Configs
}

// Register dark theme
echarts.registerTheme("darkTheme", DARK_THEME);

const option = {
    // Your option configuration goes here...
}

function App() {
    const chartRef = useRef(null);

    useReactECharts({
        echarts: echarts,
        option: option,
        ref: chartRef,
        notMerge: true,
        opts: { renderer: "canvas" },
        lazyUpdate: false,
        theme: "darkTheme",
    });

    return (
        <div>
            <h1>ECharts Demo</h1>
            <div ref={chartRef} style={{ height: "500px", width: "100%" }} />
        </div>
  );
}

export default App;
```

## Usage with Component

### Basic Usage

1. Import the `echarts` library:
```javascript
import * as echarts from "echarts";
```

2. Import the `ReactECharts` hook from this library:

```javascript
import { ReactECharts } from "@aggarwal-h/react-echarts";
```

3. Create a `ref` for the component the chart will be rendered in:
```javascript
const chartRef = useRef(null);
```

4. Use the imported element with the ref created above:
```jsx
<ReactECharts 
    ref={chartRef} 
    echarts={echarts}
    option={option}
    style={{ height: "500px", width: "100%" }}
/>
```
Note: you must create an `option` object. See more here: https://echarts.apache.org/en/option.html

6. In summary, you should have something that looks like this:

```jsx
import React, { useRef } from 'react';
import * as echarts from "echarts";
import { ReactECharts } from "@aggarwal-h/react-echarts";

const option = {
    // Your option configuration goes here...
}

function App() {
    const chartRef = useRef(null);

    return (
        <div>
            <h1>ECharts Demo</h1>
            <ReactECharts 
                ref={chartRef} 
                echarts={echarts}
                option={option}
                style={{ height: "500px", width: "100%" }}
            />
        </div>
  );
}

export default App;
```

## Contributing

We welcome contributions from the community! If you encounter a bug, have a feature request, or want to enhance this library, please open a pull request.

## License

This library is released under the [MIT License](https://opensource.org/licenses/MIT).

---

If you have any questions, feel free to [open an issue](https://github.com/aggarwal-h/react-echarts/issues).

Happy charting!
