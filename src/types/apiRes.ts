export interface GetRefreshTokenApiRes {
  statusCode: number
  data:
    | {
        token: string
      }
    | undefined
}
