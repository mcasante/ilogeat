import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

const transform = `translateX(var(--un-translate-x)) translateY(var(--un-translate-y))
translateZ(var(--un-translate-z)) rotate(var(--un-rotate))
rotateX(var(--un-rotate-x)) rotateY(var(--un-rotate-y))
rotateZ(var(--un-rotate-z)) skewX(var(--un-skew-x)) skewY(var(--un-skew-y))
scaleX(var(--un-scale-x)) scaleY(var(--un-scale-y))
scaleZ(var(--un-scale-z))`

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  variants: [
    (matcher) => {
      switch (matcher.split(':')[0]) {
        case 'hover': {
          return {
            matcher: matcher.slice(6),
            selector: s => `${s}:hover`,
          }
        }
        case 'active': {
          return {
            matcher: matcher.slice(7),
            selector: s => `${s}:active`,
          }
        }
        default: {
          return matcher
        }
      }
    },
  ],
  rules: [
    [
      /^text-border-\[(.*)]$/,
      ([, color]: any[]) => ({
        '--text-border-offset': '1px',
        '--text-border-color': color,
        'text-shadow': `
            var(--text-border-offset) 0 var(--text-border-color),
            calc(-1*var(--text-border-offset)) 0 var(--text-border-color),
            0 var(--text-border-offset) var(--text-border-color),
            0 calc(-1*var(--text-border-offset)) var(--text-border-color),
            var(--text-border-offset) var(--text-border-offset) var(--text-border-color),
            calc(-1*var(--text-border-offset)) calc(-1*var(--text-border-offset)) var(--text-border-color),
            var(--text-border-offset) calc(-1*var(--text-border-offset)) var(--text-border-color),
            calc(-1*var(--text-border-offset)) var(--text-border-offset) var(--text-border-color)
          `,
      }),
      { layer: 'utilities' },
    ],
    [/^text-border-(\d+(?:\.\d+))$/, ([, d]: any[]) => ({ '--text-border-offset': `${d}px` }), { layer: 'utilities' }],
    ['brutal', { 'border': 'var(--brutal-border)', 'box-shadow': 'var(--brutal-shadow)' }, { layer: 'utilities' }],
    [/^brutal-border-\[(.*)]$/, ([, style]: any[]) => ({ '--brutal-border': style.replace('_', ' ') }), { layer: 'utilities' }],
    [/^brutal-shadow-\[(.*)]$/, ([, style]: any[]) => ({ '--brutal-shadow-color': style.replace('_', ' ') }), { layer: 'utilities' }],
    ['brutal-translate', {
      '--un-translate-x': 'var(--brutal-shadow-size)',
      '--un-translate-y': 'var(--brutal-shadow-size)',
      'transform': transform,
    }, { layer: 'utilities' }],
    ['brutal--translate', {
      '--un-translate-x': 'calc(-1*var(--brutal-shadow-size))',
      '--un-translate-y': 'calc(-1*var(--brutal-shadow-size))',
      'transform': transform,
    }, { layer: 'utilities' }],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
