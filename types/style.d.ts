// module.cssをimportすると警告がでるので型を定義しているけど必要なさそう
declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}
