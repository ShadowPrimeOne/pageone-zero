export const colors = {
  // Base colors
  black: '#000000',
  white: '#FFFFFF',
  
  // Brand colors
  celeste: '#BFFFFC',    // Light cyan
  aqua: '#41FEFF',      // Bright cyan
  fuchsia: '#FF00FE',   // Magenta
  hollywood: '#EE018F', // Deep pink
  purple: '#3E1340',    // Dark purple
  
  // Semantic colors
  primary: {
    light: '#BFFFFC',   // Celeste
    main: '#41FEFF',    // Aqua
    dark: '#3E1340',    // Purple
  },
  secondary: {
    light: '#FF00FE',   // Fuchsia
    main: '#EE018F',    // Hollywood
    dark: '#3E1340',    // Purple
  },
  
  // Text colors
  text: {
    primary: '#000000',   // Black
    secondary: '#3E1340', // Purple
    light: '#FFFFFF',     // White
  },
  
  // Background colors
  background: {
    default: '#FFFFFF',   // White
    paper: '#BFFFFC',     // Celeste
    dark: '#3E1340',      // Purple
  },
  
  // Gradient presets
  gradients: {
    primary: 'linear-gradient(135deg, #41FEFF 0%, #BFFFFC 100%)',
    secondary: 'linear-gradient(135deg, #FF00FE 0%, #EE018F 100%)',
    dark: 'linear-gradient(135deg, #3E1340 0%, #000000 100%)',
  }
} as const

export type ColorKey = keyof typeof colors 