import { Location } from '@angular/common';
import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

/**
 * Provides a fix for broken href attributes in Firefox when referring to an ID. This is an especially common issue when
 * using the SVG <use> tag with an inline SVG file. Any href that refers to a local ID, such as href="#icon-close", will
 * be broken in Firefox because of the <base> tag.
 *
 * This directive fixes this issue by appending the absolute URL of the current page to the href. For example,
 * <use inlineHref="#icon-close" /> could create <use xlink:href="http://www.mysite.com/mypage#icon-close />.
 *
 * Note that this directive uses the xlink namespace for SVG <use> tags, but just normal href for everything else. The
 * spec has called for the xlink namespace to be removed, but it stays in this directive, for now, to maintain browser
 * support.
 *
 * @version 1.0.0
 * @author Tyler Smith
 */
@Directive({ selector: '[inlineHref]' })
export class InlineHrefDirective implements OnInit {
  @Input() inlineHref: string;

  private static readonly HREF_ATTR: string = 'href';
  private static readonly SVG_USE_TAG: string = 'use';
  private static readonly XLINK_NS: string = 'xlink';

  constructor(private element: ElementRef, private location: Location, private renderer: Renderer2) {}

  /**
   * Takes the relative href that has been provided and converts it to an absolute URL. The URL is applied to either the
   * href or xlink:href attribute, depending on the tag type.
   */
  ngOnInit(): void {
    const includeHash = false;
    const fixedHref = this.location.path(includeHash) + this.inlineHref;

    const isSvgUseTag = this.element.nativeElement.tagName === InlineHrefDirective.SVG_USE_TAG;
    const namespace = isSvgUseTag ? InlineHrefDirective.XLINK_NS : undefined;

    this.renderer.setAttribute(this.element.nativeElement, InlineHrefDirective.HREF_ATTR, fixedHref, namespace);
  }
}
