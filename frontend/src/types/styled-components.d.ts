export interface Theme {
  main1: string;
  main2: string;
  black: string;
  white: string;
  bg: string;
}

declare module "styled-components" {
  interface DefaultTheme extends Theme {}
}
