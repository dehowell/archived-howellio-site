import Typography from "typography";
import theme from "typography-theme-moraga";

theme.overrideThemeStyles = ({ rhythm }, options) => ({
  figcaption: {
    fontStyle: "italic",
    textAlign: "center"
  }
});

const typography = new Typography(theme);

export default typography;
export const { rhythm } = typography;
