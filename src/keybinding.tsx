import * as React from "react";

interface KeybindingProps {
  onKey: (e: KeyboardEvent) => void;
  type: "keydown" | "keyup";
  target: string | HTMLElement | Document | Window;
  preventInputConflict: boolean;
  preventDefault: boolean;
  stopPropagation: boolean;
}

class Keybinding extends React.Component<KeybindingProps> {
  static defaultProps = {
    type: "keydown",
    target: document, // Probably will make server-side rendering crash
    preventInputConflict: false,
    preventDefault: false,
    stopPropagation: false,
  };

  targetsBlacklist: string[] = ["textarea", "input", "select"];

  constructor(props: KeybindingProps) {
    super(props);
    this.state = {};
    this.onKey = this.onKey.bind(this);
  }

  render() {
    return null;
  }

  onKey(e: Event) {
    // is actually a KeyboardEvent
    if (this.props.preventDefault) e.preventDefault();
    if (this.props.stopPropagation) e.stopPropagation();

    const target = e.target as HTMLElement | null;

    if (target) {
      const canDispatch = !(
        this.props.preventInputConflict &&
        this.targetsBlacklist.indexOf(target.tagName.toLowerCase()) > -1
      );

      if (canDispatch && this.props.onKey) this.props.onKey(e as KeyboardEvent);
    }
  }

  componentDidMount() {
    const { target, type } = this.props;

    if (typeof target === "string") {
      const element = document.querySelector(target);
      if (!element)
        throw new Error(
          `Selector "${target}" returned null (on keybinding mount)`
        );

      element.addEventListener(type, this.onKey);
    } else if (typeof target === "object") {
      target.addEventListener(type, this.onKey);
    }
  }

  componentWillUnmount() {
    const { target, type } = this.props;

    if (typeof target === "string") {
      const element = document.querySelector(target);

      if (!element)
        throw new Error(
          `Selector "${target}" returned null (on keybinding unmount)`
        );

      element.removeEventListener(type, this.onKey);
    } else if (typeof target === "object") {
      target.removeEventListener(type, this.onKey);
    }
  }
}

export default Keybinding;
