import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// JSX AUTOMAT PENTRU PROBE (Vite 8 transforma cu oxc, deci optiunea e `oxc.jsx`, nu `esbuild.jsx`): tsconfig.json are `jsx: preserve`, cum cere Next, iar Vite -
// care transforma fisierele probei - citeste aceeasi setare si lasa JSX-ul netransformat, deci
// un import direct al unei componente din src/components crapa la analiza cu „content contains
// invalid JS syntax". Prima varianta a probelor eroului ocolea asta copiind componentele in
// node_modules/.cache si importandu-le de acolo cu o cale LITERALA: local mergea, fiindca
// directorul exista de la rularea anterioara, iar in CI `typecheck` (care ruleaza INAINTEA
// probelor, cand copia nu exista inca) a picat cu TS2307 pe lot/s2-b0. Setarea de aici e
// citita doar de Vite/vitest; Next si tsc nu o vad.
export default defineConfig({
  oxc: { jsx: { runtime: 'automatic' } },
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
  },
})
