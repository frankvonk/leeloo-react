import type { ComponentProps } from "react";
import styles from "./Button.module.css";

type ButtonProps = ComponentProps<"button"> & {
  // "actionBar" uses the original .action-bar_button class from stylesheet.css.
  variant?: "default" | "actionBar";
};

export default function Button({
  variant = "default",
  className = "",
  children = "btn",
  ...rest
}: ButtonProps) {
  const variantClass = variant === "actionBar" ? "action-bar_button" : styles.button;
  return (
    <button type="button" className={`${variantClass} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}
