import styles from "./Signature.module.css";

// "FRANK VO" signature, converted from the old canvas drawing.
// Same coordinates as the canvas version: M = moveTo, L = lineTo, A = arc.
// The stroke colour comes from Signature.module.css, per theme.
export default function Signature() {
  return (
    <svg className={`signature ${styles.signature}`} viewBox="0 0 399 300" aria-hidden="true">
      <path
        d={[
          "M10 25 L60 25 M10 65 L10 115 M10 65 L60 65", // F
          "M90 25 L120 25 M90 65 L121.41 64.95 A20 20 0 0 0 120 25 M90 65 L160 135", // R
          "M215 25 L260 115", // A
          "M280 75 L320 165", // N
          "M340 120 L390 75 M340 120 L390 165", // K
          "M10 145 L95 265 L215 25", // V
          "M255 225 A40 40 0 1 0 175 225 A40 40 0 1 0 255 225", // O
        ].join(" ")}
      />
    </svg>
  );
}
