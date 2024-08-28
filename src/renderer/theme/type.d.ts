export interface ColorType {
  main?: string;
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
}

export interface LinearType {
  orange: string;
  purple: string;
  lagoon: string;
  red: string;
  green: string;
  blue_purple: string;
  blue_green: string;
}

export interface ColorCustom {
  yellow_green: ColorType;
  aqua: ColorType;
  black: ColorType;
  white: ColorType;
  purple: ColorType;
  bluebird: ColorType;
  orange: ColorType;
  linear: LinearType;
}

declare module "@mui/material/styles" {
  interface PaletteOptions extends ColorCustom {}
  interface Palette extends ColorCustom {}

  interface TypographyVariants {
    paragraph: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    paragraph?: React.CSSProperties;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    action: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    paragraph: true;
  }
}
