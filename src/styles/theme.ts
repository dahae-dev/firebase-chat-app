import { transparentize } from 'polished';
import { CSSProperties, DefaultTheme } from 'styled-components';

type SpacingType = Record<
-3
| -2.5
| -2
| -1.75
| -1.5
| -1.25
| -1
| -0.75
| -0.5
| -0.25
| 0
| 0.25
| 0.5
| 0.75
| 1
| 1.25
| 1.5
| 1.75
| 2
| 2.5
| 3,
CSSProperties['padding'] | CSSProperties['margin']
>;

type HeightsType = Record<
'topbar'
| 'inputField',
CSSProperties['height']
>;

type ColorsType = Record<
'transparent'
| 'black'
| 'black10'
| 'black70'
| 'white'
| 'charcoalGrey'
| 'charcoalGreyTwo'
| 'coolGrey'
| 'battleshipGrey'
| 'paleLilac'
| 'purple',
CSSProperties['color']
>;

type FontSizesType = Record<
'xl'
| 'l'
| 'm'
| 's'
| 'xs',
CSSProperties['fontSize']
>;

type FontWeightsType = Record<
'normal'
| 'medium'
| 'semiBold'
| 'bold',
CSSProperties['fontSize']
>;

type BoxShadowsType = Record<
0,
CSSProperties['boxShadow']
>;

type ZIndexesType = Record<
0
| 1
| 2
| 3
| 4
| 5
| 6
| 7
| 8
| 9
| 10,
CSSProperties['zIndex']
>;

const theme: DefaultTheme = {
  spacing: {
    [-3]: '-24px',
    [-2.5]: '-20px',
    [-2]: '-16px',
    [-1.75]: '-14px',
    [-1.5]: '-12px',
    [-1.25]: '-10px',
    [-1]: '-8px',
    [-0.75]: '-6px',
    [-0.5]: '-4px',
    [-0.25]: '-2px',
    0: '0',
    0.25: '2px',
    0.5: '4px',
    0.75: '6px',
    1: '8px',
    1.25: '10px',
    1.5: '12px',
    1.75: '14px',
    2: '16px',
    2.5: '20px',
    3: '24px',
  },
  heights: {
    topbar: '50px',
    inputField: '52px',
  },
  colors: {
    transparent: 'transparent',
    black: '#000000',
    black10: transparentize(0.9, '#000000'),
    black70: transparentize(0.3, '#000000'),
    white: '#ffffff',
    charcoalGrey: '#464052',
    charcoalGreyTwo: '#363A42',
    coolGrey: '#A4A6B0',
    battleshipGrey: '#74747E',
    paleLilac: '#E6E6EB',
    purple: '#5b36ac',
  },
  fontSizes: {
    xl: '20px',
    l: '18px',
    m: '16px',
    s: '14px',
    xs: '12px',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  boxShadows: {
    0: `1px 1px 3px ${transparentize(0.9, '#000000')}`,
  },
  zIndexes: {
    0: 1,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
    6: 600,
    7: 700,
    8: 800,
    9: 900,
    10: 1000,
  },
};

declare module 'styled-components' {
  export interface DefaultTheme {
    spacing: SpacingType;
    heights: HeightsType;
    colors: ColorsType;
    fontSizes: FontSizesType;
    fontWeights: FontWeightsType;
    boxShadows: BoxShadowsType;
    zIndexes: ZIndexesType;
  }
}

export default theme;
