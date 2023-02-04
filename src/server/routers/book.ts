import { z } from "zod"
import { publicProcedure, router } from "../trpc"

export const bookRouter = router({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        author: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.prisma.books.create({
        data: {
          title: input.title,
          author: input.author,
          description: input.description,
        },
      })
      return { data }
    }),
  get: publicProcedure
    .input(
      z.object({
        isFavorite: z.boolean(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const data = await ctx.prisma.books.findMany({
        select: {
          id: true,
          title: true,
          author: true,
          description: true,
          isFavorite: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        where: {
          isFavorite: input.isFavorite,
        },
      })
      return { data }
    }),
  delete: publicProcedure
    .input(
      z.object({
        bookId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.prisma.books.delete({
        where: {
          id: input.bookId,
        },
      })
      return { data }
    }),
  updateFavorite: publicProcedure
    .input(
      z.object({
        bookId: z.string(),
        isFavorite: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.prisma.books.update({
        where: {
          id: input.bookId,
        },
        data: { isFavorite: input.isFavorite },
      })
      return { data }
    }),
})
