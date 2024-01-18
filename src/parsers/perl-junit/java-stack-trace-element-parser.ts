export interface StackTraceElement {
  filePath: string
  lineStr: string
}
 
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
