export const Routes = {
  home: "/",
  login: "/login",
  wallet: {
    root: "/wallet",
    //garden: {
    //  root: "/wallet/garden",
    //  id: {
    //    root: (id: string) => `/wallet/garden/${id}`,
    //    settings: (id: string) => `/wallet/garden/${id}/settings`,
    //  },
    //  new: "/wallet/garden/new",
    //},
  },
} as const
