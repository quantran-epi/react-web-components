import { LiteralUnion } from "type-fest";

export type PseudoSelectorType = LiteralUnion<":hover" | ":active" | ":focus" | "::before" | "::after", string>;