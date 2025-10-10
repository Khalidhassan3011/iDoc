Console Error

Each child in a list should have a unique "key" prop.

Check the render method of `LinkComponent`. It was passed a child from Layout. See https://react.dev/link/warning-keys for more information.

lib/source.ts (72:29) @ Object.icon [as resolveIcon]


  70 |
  71 |       if (iconColor) {
> 72 |         return createElement('span', {
     |                             ^
  73 |           style: { color: iconColor, display: 'inline-flex' }
  74 |         }, iconElement);
  75 |       }
Call Stack
24

Show 20 ignore-listed frame(s)
span