import { z } from "zod";

const svgFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  content: z
    .string()
    .trim()
    .min(1, "Content is required")
    .refine((content) => content.startsWith("<svg") && content.endsWith("</svg>"), {
      message: "Content must be a valid SVG starting with <svg> and ending with </svg>.",
    }),
  keywords: z
    .string()
    .default("")
    .transform((keywords) =>
      keywords
        .split(",")
        .filter(Boolean)
        .map((word) => word.trim().replace(/\s+/g, "").toLowerCase()),
    ),
});

export default svgFormSchema;
