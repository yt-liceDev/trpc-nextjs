import { PrismaClient } from "@prisma/client"

type Global = typeof globalThis

interface CustomGlobalNodeJs extends Global {
  prisma: PrismaClient
}

declare const global: CustomGlobalNodeJs

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === "development") global.prisma = prisma

export default prisma
