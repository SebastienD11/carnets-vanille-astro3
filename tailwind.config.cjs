/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mulish: ['Mulish Variable', 'ui-sans-serif', 'system-ui']
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              overflow: 'visible',
              fontSize: '1rem',
              lineHeight: '1.75',
              paddingRight: '5.5em'
            },
            strong: {
              color: 'inherit',
              fontWeight: '700'
            },
            h2: {
              fontWeight: '800'
            },
            h3: {
              fontWeight: '700'
            },
            h4: {
              fontWeight: '700',
              fontStyle: 'italic'
            }
          }
        },
        sm: {
          css: {
            fontSize: '1rem',
            pre: {
              fontSize: '1rem',
              lineHeight: '1.75',
              paddingRight: '5em'
            },
            h2: {
              fontSize: '1.6rem',
              lineHeight: '1.3'
            },
            h3: {
              fontSize: '1.3rem',
              lineHeight: '1.5'
            },
            h4: {
              fontSize: '1.2rem',
              lineHeight: '1.2'
            }
          }
        },
        lg: {
          css: {
            pre: {
              fontSize: '1.125rem',
              lineHeight: '1.75',
              paddingRight: '5em'
            },
            h4: {
              fontSize: '1.2rem',
              lineHeight: '1.2'
            }
          }
        },
        xl: {
          css: {
            pre: {
              fontSize: '1.225rem',
              lineHeight: '1.75',
              paddingRight: '5em'
            },
            h4: {
              fontSize: '1.3rem',
              lineHeight: '1.35'
            }
          }
        },
        '2xl': {
          css: {
            pre: {
              fontSize: '1.5rem',
              lineHeight: '1.66667',
              paddingRight: '5em'
            },
            h2: {
              // fontSize: '1.7em',
            },
            h4: {
              fontSize: '1.5rem',
              lineHeight: '1.5'
            }
          }
        }
      }),
      colors: {
        twitter: {
          DEFAULT: '#1DA1F2'
        },
        facebook: {
          DEFAULT: '#1877F2'
        },
        vanille: {
          DEFAULT: '#FFE14C'
        },
        framboise: {
          DEFAULT: '#FF8B99'
        },
        pistache: {
          DEFAULT: '#A9DE63'
        },
        beige: {
          DEFAULT: '#F8F5F0'
        }
      },
      letterSpacing: {
        ultratight: '-0.13em'
      },
      translate: {
        center: 'calc(50vw - 50%)',
        right: 'calc(100vw - 100% - 1rem)'
      },
      transitionDuration: {
        3000: '3000ms',
        5000: '5000ms',
        10000: '10000ms',
        20000: '20000ms'
      },
      transitionProperty: {
        maxHeight: 'max-h'
      },
      scale: {
        200: '2'
      },
      borderRadius: {
        large: '50px'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
