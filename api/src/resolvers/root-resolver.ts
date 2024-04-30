import { Resolver } from "./resolver"

type Props = {
  host: string
}

export const rootResolver: Resolver<{ props: Props }> = async ({ host }) => {
  return {
    meta: {
      title: "Fruity API",
      status: "OK",
    },
    links: {
      stats: `${host}/stats`,
      purchase: `${host}/purchase`,
    },
  }
}
