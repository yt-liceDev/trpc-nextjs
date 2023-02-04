import type { inferAsyncReturnType } from "@trpc/server"
import type { CreateNextContextOptions } from "@trpc/server/adapters/next"
import prisma from "./db"

export function createContext(_opt: CreateNextContextOptions) {
  return {
    prisma,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
