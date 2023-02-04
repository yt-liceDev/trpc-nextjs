import { router } from "../trpc"
import { bookRouter } from "./book"

export const appRouter = router({
  book: bookRouter,
})

export type AppRouter = typeof appRouter
