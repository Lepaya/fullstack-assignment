export interface DbClient {
  query: (query: string, params: any[]) => Promise<any>
}
