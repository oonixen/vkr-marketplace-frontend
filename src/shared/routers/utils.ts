import { ROUTER_PATHS } from './routs'

type GetRouterUrlProps = { routName: ROUTER_PATHS; dynamicRoutNames?: Array<string> }

const dynamicRouteNameRegExp = /:.+/

export const getRouterUrl = ({ routName, dynamicRoutNames }: GetRouterUrlProps): string => {
  if (!dynamicRoutNames) return routName

  let resultRouteName: string = routName

  dynamicRoutNames.forEach((value) => (resultRouteName = resultRouteName.replace(dynamicRouteNameRegExp, value)))
  return resultRouteName
}
