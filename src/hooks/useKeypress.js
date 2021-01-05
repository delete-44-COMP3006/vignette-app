import { useEffect } from "react";

// Code adapted from [Michael Ashton's](https://www.caktusgroup.com/about/michael-ashton/) tutorial
// found [here](https://www.caktusgroup.com/blog/2020/07/01/usekeypress-hook-react/)

export default function useKeypress(key, action) {
  useEffect(() => {
    function onKeyDown(e) {
      // If event key matches the key assigned on hook creation,
      // run agiven action
      if (e.key === key) {
        e.preventDefault();
        action();
      }
    }

    // Bind hook to keydown event
    window.addEventListener("keydown", onKeyDown);

    // At end of function run, unbind hook
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [key, action]);
}
