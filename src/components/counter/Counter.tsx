import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h1>Counter</h1>
      <p>The current count is {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
