const customMediaQuery = (minWidth: number) =>
  `@media (max-width: ${minWidth}px)`

export const media = {
  custom: customMediaQuery,
  md: customMediaQuery(500),
  lg: customMediaQuery(700),
  xl: customMediaQuery(900),
  xxl: customMediaQuery(1000),
}