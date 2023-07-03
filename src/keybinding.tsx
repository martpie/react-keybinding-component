import { useCallback, useEffect } from "react";

export type KeybindingProps = {
  onKey: (e: Event) => void;
  type: "keydown" | "keyup";
  target: string | HTMLElement | Document | Window;
  preventInputConflict: boolean;
  preventDefault: boolean;
  stopPropagation: boolean;
};

const TARGETS_BLACKLIST = ["textarea", "input", "select"];

/**
 * Get the actual target to which we should attach the event
 */
function getTarget(
  target: KeybindingProps["target"]
): Element | HTMLElement | Document | Window {
  if (typeof target === "string") {
    const element = document.querySelector(target);
    if (!element) {
      throw new Error(
        `Selector "${target}" returned null (on keybinding mount)`
      );
    }

    return element;
  }

  return target;
}

/**
 * Attaches an event to the DOM
 */
export default function Keybinding(props: KeybindingProps) {
  const {
    type = "keydown",
    target = document, // Probably will make server-side rendering crash
    preventInputConflict = false,
    preventDefault = false,
    stopPropagation = false,
  } = props;

  const onKey = useCallback((e: Event) => {
    // is actually a KeyboardEvent
    if (preventDefault) e.preventDefault();
    if (stopPropagation) e.stopPropagation();

    const target = e.target as HTMLElement | null;

    if (target) {
      const canDispatch = !(
        preventInputConflict &&
        TARGETS_BLACKLIST.indexOf(target.tagName.toLowerCase()) > -1
      );

      if (canDispatch) onKey(e);
    }
  }, []);

  useEffect(() => {
    const actualTarget = getTarget(target);
    actualTarget.addEventListener(type, onKey);

    return () => {
      actualTarget.removeEventListener(type, onKey);
    };
  });

  return null;
}
