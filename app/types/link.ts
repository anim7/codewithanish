import { RouteUrlObject } from "blitz"

export default interface Link {
  text: string
  imageURL: string
  href: string | RouteUrlObject
}
