export type LoaderProps = {
  loading: boolean
  overlay?: boolean
  size?: number
  delay?: number
  content?: JSX.Element | JSX.Element[] | string | null
  children?: JSX.Element | JSX.Element[] | string | null
}
