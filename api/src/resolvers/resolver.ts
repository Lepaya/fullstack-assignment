export type Resolver<
  T extends {
    data?: Record<string, unknown>
    links?: Record<string, unknown>
    meta?: Record<string, unknown>
    props?: Record<string, unknown>
  },
> = (props: T["props"]) => Promise<{
  data?: T["data"]
  errors?: ResolverError[]
  links?: Record<string, string>
  meta?: Record<string, unknown>
}>

type ResolverError = {
  status: string
  title: string
  detail: string
}
