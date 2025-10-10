import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import {
  BookOpen,
  Star,
  CheckCircle2,
  AlertCircle,
  Map,
  icons
} from 'lucide-react';
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
  'BookOpen': '#FFFFFF', // White
  'Star': '#FFFFFF', // White
  'CheckCircle2': '#FFFFFF', // White
  'AlertCircle': '#FFFFFF', // White
  'Map': '#FFFFFF', // White
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
        key: 'icon-wrapper-flutter',
        style: { color: iconColors['Flutter'], display: 'inline-flex' }
      }, createElement(FlutterIcon, { key: 'icon-flutter' }));
    }

    // Map icon names to components
    const iconMap: Record<string, any> = {
      'BookOpen': BookOpen,
      'Star': Star,
      'CheckCircle2': CheckCircle2,
      'AlertCircle': AlertCircle,
      'Map': Map,
    };

    // Get the icon component
    const IconComponent = iconMap[icon];

    if (IconComponent) {
      const iconColor = iconColors[icon];
      const iconElement = createElement(IconComponent, { key: `icon-${icon}` });

      if (iconColor) {
        return createElement('span', {
          key: `icon-wrapper-${icon}`,
          style: { color: iconColor, display: 'inline-flex' }
        }, iconElement);
      }

      return iconElement;
    }

    // Fallback to icons object for other icons
    const iconWithSuffix = `${icon}Icon`;
    const iconKey = (icon in icons ? icon : iconWithSuffix) as keyof typeof icons;

    if (iconKey in icons) {
      const iconColor = iconColors[icon];
      const iconElement = createElement(icons[iconKey], { key: `icon-${icon}` });

      if (iconColor) {
        return createElement('span', {
          key: `icon-wrapper-${icon}`,
          style: { color: iconColor, display: 'inline-flex' }
        }, iconElement);
      }

      return iconElement;
    }
  },
});
