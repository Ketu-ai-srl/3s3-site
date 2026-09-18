import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

// De ce e `output` conditionat: pe Windows fara drept de legaturi simbolice,
// `standalone` cade cu EPERM la copierea fisierelor urmarite (masurat 2026-09-05,
// symlink react -> .next/standalone). Build-ul care conteaza pentru livrare ruleaza
// in Docker si in CI, ambele pe Linux, si acolo variabila e pornita.
const standalone = process.env.BUILD_STANDALONE === '1'

const nextConfig: NextConfig = {
  output: standalone ? 'standalone' : undefined,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  poweredByHeader: false,
  reactStrictMode: true,
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
