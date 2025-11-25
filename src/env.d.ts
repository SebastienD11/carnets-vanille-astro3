/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  plausible?: {
    (eventName: string, options?: { props?: Record<string, string | number | boolean> }): void
    q: any[]
    init: (options?: Record<string, any>) => void
    o?: Record<string, any>
  }
}
