import { rootResolver } from "./root-resolver"

describe("rootResolver", () => {
  it("returns the API meta information", async () => {
    const result = await rootResolver({
      host: "https://my-site.com",
    })

    expect(result).toEqual({
      meta: {
        title: "Fruity API",
        status: "OK",
      },
      links: {
        stats: "https://my-site.com/stats",
        purchase: "https://my-site.com/purchase",
      },
    })
  })
})
