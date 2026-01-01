export default function isJsxSvg(string: string) {
  const jsxAttributes = ["className", "strokeWidth", "strokeLinecap", "strokeLinejoin", "fillRule", "clipPath"];
  const attributesPattern = jsxAttributes.join("|");
  const jsxSvgPattern = new RegExp(
    `<(svg|path|g|rect|circle|ellipse|line|polyline|polygon|text|tspan)[^>]*(${attributesPattern})=`,
  );
  return jsxSvgPattern.test(string);
}
