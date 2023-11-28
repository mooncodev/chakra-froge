import bowser from 'bowser';

export function getDevice() {
  if (typeof window !== 'undefined') {
    const parsed = bowser.getParser(window.navigator.userAgent);
    return {
      type: parsed.getPlatform().type,
      os: parsed.getOS(),
      browser: parsed.getBrowser()
    };
  } else {
    return { type: null, os: null, browser: null };
  }
}
