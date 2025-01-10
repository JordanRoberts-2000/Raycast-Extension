import { z } from "zod";
import isJsxSvg from "./isJsxSvg";
import ReactDOMServer from "react-dom/server";

export const contentSchema = z
  .string()
  .trim()
  .min(1, "Content is required")
  .refine((content) => content.startsWith("<svg") && content.endsWith("</svg>"), {
    message: "Content must be a valid Svg",
  })
  .transform(async (content, ctx) => {
    if (isJsxSvg(content)) {
      try {
        const parse = (await import("html-react-parser")).default;
        const Component = () => <>{parse(content)}</>;
        let htmlSVG = ReactDOMServer.renderToStaticMarkup(<Component />);
        return htmlSVG;
      } catch (error) {
        ctx.addIssue({ message: "Detected JSX: Failed to parse to valid HTML", code: z.ZodIssueCode.custom });
        return z.NEVER;
      }
    }
    return content;
  });

export const keywordsSchema = z
  .string()
  .default("")
  .transform((keywords) =>
    keywords
      .split(",")
      .filter(Boolean)
      .map((word) => word.trim().replace(/\s+/g, "").toLowerCase()),
  );

export const svgFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  content: contentSchema,
  keywords: keywordsSchema,
});

export const libraryDataSchema = z.record(
  z.string().trim().min(1, "Name is required"),
  z.object({
    content: z
      .string()
      .trim()
      .min(1, "Content is required")
      .refine((content) => content.startsWith("<svg") && content.endsWith("</svg>"), {
        message: "Content must be a valid Svg",
      }),
    keywords: z.array(z.string()),
  }),
);
