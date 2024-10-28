import { useEffect, useRef } from "react";

export function useOutsideClick(handler: () => void, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        // TODO this is for temporary fix a bug that toggle button cannot close menu; better fix later
        if ((e.target as HTMLElement).tagName === "svg") return;
        if (
          ref.current &&
          !(ref.current as HTMLElement).contains(e.target as HTMLElement)
        ) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
