import { nanoid } from "nanoid";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  shortenUrl: publicProcedure
    .input(
      z.object({
        longUrl: z.string().trim().url(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input: { longUrl } }) => {
      const shortUrl = nanoid(5);
      const data = await prisma.urlModel.create({
        data: {
          longUrl,
          shortUrl,
        },
      });
      return { shortUrl: data.shortUrl };
    }),

  fetchLongUrl: publicProcedure
    .input(
      z.object({
        shortUrl: z.string().length(5),
      })
    )
    .query(async ({ ctx: { prisma }, input: { shortUrl } }) => {
      const data = await prisma.urlModel.findUnique({
        where: {
          shortUrl,
        },
      });
      return data?.longUrl;
    }),
});
