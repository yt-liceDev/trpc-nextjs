import { httpBatchLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import SuperJSON from "superjson"
import type { AppRouter } from "../routers"

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return ""
  }

  return "http://localhost:3000"
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: SuperJSON,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    }
  },
})
