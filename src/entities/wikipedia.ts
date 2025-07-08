import z from "zod";

export const WikipediaActionData = z.object({
  parse: z.object({
    title: z.string(),
    text: z.object({
      "*": z.string(),
    }),
  }),
});

export type WikipediaActionData = z.infer<typeof WikipediaActionData>;
