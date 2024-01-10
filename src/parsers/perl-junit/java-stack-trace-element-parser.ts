export interface StackTraceElement {
  filePath: string
  lineStr: string
}
 
// classloader and module name are optional:
// at <CLASSLOADER>/<MODULE_NAME_AND_VERSION>/<FULLY_QUALIFIED_METHOD_NAME>(<FILE_NAME>:<LINE_NUMBER>)
// https://github.com/eclipse-openj9/openj9/issues/11452#issuecomment-754946992
// perl: #   at t/test1.t line 23.
const re = /\s+at (.*) line (\d+)\.$/

export function parseStackTraceElement(stackTraceLine: string): StackTraceElement | undefined {
  const match = stackTraceLine.match(re)
  if (match !== null) {
    const [_, filePath, lineStr] = match
    return {
      filePath,
      lineStr
    }
  }
  return undefined
}

function parseClassLoaderAndModule(maybeClassLoaderAndModuleNameAndVersion?: string): {
  classLoader?: string
  moduleNameAndVersion?: string
} {
  if (maybeClassLoaderAndModuleNameAndVersion) {
    const res = maybeClassLoaderAndModuleNameAndVersion.split('/')
    const classLoader = res[0]
    let moduleNameAndVersion: string | undefined = res[1]
    if (moduleNameAndVersion === '') {
      moduleNameAndVersion = undefined
    }
    return {classLoader, moduleNameAndVersion}
  }
  return {classLoader: undefined, moduleNameAndVersion: undefined}
}
