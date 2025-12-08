/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  plausible: (event: string, options?: { revenue?: { currency: string; amount: number } }) => void
}
