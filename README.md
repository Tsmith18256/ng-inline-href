# Angular Inline Href

This directive provides a fix for hrefs in Firefox. Notably, when trying to reference an inline SVG, as so:

```html
<svg>
  <use xlink:href="#icon-back" />
</svg>
```

Because of the base tag, Firefox does not resolve the SVG symbol the way that you would expect. This directive simply
appends the current path to the href, making it an absolute URL.

You can use this directive with a string:

```html
<svg>
  <use inlineHref="#icon-back" />
</svg>
```

You can also use it with JavaScript:

```html
<svg>
  <use [inlineHref]="getBackIcon()" />
</svg>
```

The resulting tag will look something like this:

```html
<svg>
  <use xlink:href="http://www.myawesomesite.com/currentpage#icon-back" />
</svg>
```

## Setup

Perform the following steps to add this directive to your project:

1. `npm install --save ng-inline-href`
2. Import the directive into your shared module and add it to the `declarations` and `exports` arrays

```typescript
import { NgModule } from '@angular/core';
import { InlineHrefDirective } from 'ng-inline-href';

@NgModule({
  declarations: [ InlineHrefDirective ],
  exports: [ InlineHrefDirective ]
})
export class SharedModule {}
```

3. Import the shared module into your other modules to use the directive in your templates

## The Xlink Namespace

The `xlink` namespace on the SVG tag
[has been deprecated](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/xlink:href); however, browser support
is not great, so this directive includes the namespace.
