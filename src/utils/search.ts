export interface SearchResult {
  id: number
  slug: string
  title: string
  excerpt: string
  featured_media_data: {
    url: string
    alt_text: string
    width: number
    height: number
  } | null
}

export interface SearchElements {
  form: HTMLFormElement | null
  input: HTMLInputElement | null
  submitBtn: HTMLButtonElement | null
  submitText: HTMLElement | null
  submitSpinner: HTMLElement | null
  placeholder: HTMLElement | null
  loading: HTMLElement | null
  empty: HTMLElement | null
  error: HTMLElement | null
  resultsList: HTMLElement | null
}

export interface SearchConfig {
  lang: string
  elements: SearchElements
  renderOptions?: RenderOptions
}

export function initializeSearch(config: SearchConfig) {
  const { lang, elements, renderOptions = {} } = config
  const {
    form,
    input,
    submitBtn,
    submitText,
    submitSpinner,
    placeholder,
    loading,
    empty,
    error,
    resultsList
  } = elements

  if (!form || !input) {
    return
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const query = input.value.trim()

    if (!query) {
      return
    }

    // Show loading state
    submitBtn?.setAttribute('disabled', 'true')
    submitText?.classList.add('hidden')
    submitSpinner?.classList.remove('hidden')
    placeholder?.classList.add('hidden')
    loading?.classList.remove('hidden')
    empty?.classList.add('hidden')
    error?.classList.add('hidden')
    resultsList?.classList.add('hidden')

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&lang=${lang}`)
      const data = await response.json()

      // Hide loading
      loading?.classList.add('hidden')
      submitBtn?.removeAttribute('disabled')
      submitText?.classList.remove('hidden')
      submitSpinner?.classList.add('hidden')

      if (!response.ok || data.error) {
        error?.classList.remove('hidden')
        return
      }

      if (!data.results || data.results.length === 0) {
        empty?.classList.remove('hidden')
        return
      }

      // Display results
      if (resultsList) {
        const basePath = (lang as string) === 'en' ? '/en' : ''
        resultsList.innerHTML = data.results
          .map((result: SearchResult) => renderSearchResult(result, basePath, renderOptions))
          .join('')
        resultsList.classList.remove('hidden')
      }
    } catch (err) {
      console.error('Search error:', err)
      loading?.classList.add('hidden')
      submitBtn?.removeAttribute('disabled')
      submitText?.classList.remove('hidden')
      submitSpinner?.classList.add('hidden')
      error?.classList.remove('hidden')
    }
  })
}

export interface RenderOptions {
  borderWidth?: 'border' | 'border-2'
  onResultClick?: string
}

function renderSearchResult(
  result: SearchResult,
  basePath: string,
  options: RenderOptions = {}
): string {
  const { borderWidth = 'border-2', onResultClick } = options
  const onClick = onResultClick ? `onclick="${onResultClick}"` : ''

  return `
    <a
      href="${basePath}/${result.slug}"
      class="group flex gap-4 rounded-lg ${borderWidth} border-black bg-white p-3 transition-all hover:shadow-lg"
      ${onClick}
    >
      ${
        result.featured_media_data
          ? `
        <img
          src="${result.featured_media_data.url}"
          alt="${result.featured_media_data.alt_text}"
          class="h-20 w-20 shrink-0 rounded object-cover ${borderWidth} border-black"
          loading="lazy"
        />
      `
          : `<div class="h-20 w-20 shrink-0 rounded ${borderWidth} border-black bg-vanille"></div>`
      }
      <div class="flex min-w-0 flex-1 flex-col gap-1">
        <h3 class="text-sm font-bold text-black line-clamp-2">
          ${decodeHtmlEntities(result.title)}
        </h3>
        ${
          result.excerpt
            ? `<div class="text-xs text-black line-clamp-2">${decodeHtmlEntities(result.excerpt.replace(/<[^>]*>/g, ''))}</div>`
            : ''
        }
      </div>
    </a>
  `
}

function decodeHtmlEntities(text: string): string {
  // Decode HTML entities (like &rsquo; -> ') and escape any remaining HTML tags
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  const decoded = textarea.value
  // Escape any HTML tags that might be in the decoded text
  return decoded.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function resetSearchState(elements: SearchElements) {
  const {
    placeholder,
    loading,
    empty,
    error,
    resultsList,
    submitBtn,
    submitText,
    submitSpinner,
    input
  } = elements

  // Only manage placeholder if it exists (desktop has it, mobile doesn't)
  placeholder?.classList.remove('hidden')
  loading?.classList.add('hidden')
  empty?.classList.add('hidden')
  error?.classList.add('hidden')
  resultsList?.classList.add('hidden')
  submitBtn?.removeAttribute('disabled')
  submitText?.classList.remove('hidden')
  submitSpinner?.classList.add('hidden')
  if (input) {
    input.value = ''
  }
}

