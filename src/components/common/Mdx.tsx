import * as React from 'react'
import * as runtime from 'react/jsx-runtime'

interface MdxProps {
  code: string
  components?: Record<string, React.ComponentType<any>>
}

export default function Mdx({ code, components }: MdxProps) {
  const Content = React.useMemo(() => {
    if (!code) return null
    const fn = new Function('require', 'exports', 'React', 'jsx', 'jsxs', 'Fragment', code)
    const exports = {}
    fn(
      (id: string) => {
        if (id === 'react') return React
        if (id === 'react/jsx-runtime') return runtime
        throw new Error(`Unknown dependency: ${id}`)
      },
      exports,
      React,
      runtime.jsx,
      runtime.jsxs,
      runtime.Fragment
    )
    return (exports as any).default
  }, [code])

  if (!Content) return null

  return <Content components={components} />
}
