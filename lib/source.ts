import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createElement } from 'react';

// Custom Flutter icon component (SVG)
function FlutterIcon() {
  return createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    width: '1em',
    height: '1em',
  }, [
    createElement('path', {
      key: 'flutter-path',
      d: 'M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z'
    })
  ]);
}

// Icon color mapping
const iconColors: Record<string, string> = {
  'Flutter': '#4FC3F7', // Flutter blue
  'Puzzle': '#10B981', // Green for problem solving
};

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return;

    // Handle custom Flutter icon
    if (icon === 'Flutter') {
      return createElement('span', {
        style: { color: iconColors['Flutter'], display: 'inline-flex' }
      }, createElement(FlutterIcon));
    }

    // Handle Lucide icons with custom colors
    if (icon in icons) {
      const iconColor = iconColors[icon];
      const iconElement = createElement(icons[icon as keyof typeof icons]);

      if (iconColor) {
        return createElement('span', {
          style: { color: iconColor, display: 'inline-flex' }
        }, iconElement);
      }

      return iconElement;
    }
  },
});
