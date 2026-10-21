export type StepHrefBuilder = (params: { school?: string; level?: string; course?: string }) => string

export function createStepHref(basePath: string): StepHrefBuilder {
  return (params) => {
    const segments = [params.school, params.level, params.course].filter(Boolean)
    return [basePath, ...segments].join("/")
  }
}
