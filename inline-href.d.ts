import { Location } from '@angular/common';
import { ElementRef, OnInit, Renderer2 } from '@angular/core';
export declare class InlineHrefDirective implements OnInit {
    private element;
    private location;
    private renderer;
    inlineHref: string;
    private static readonly HREF_ATTR;
    private static readonly SVG_USE_TAG;
    private static readonly XLINK_NS;
    constructor(element: ElementRef, location: Location, renderer: Renderer2);
    ngOnInit(): void;
}
