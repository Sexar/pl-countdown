/**
 * Created by cesarmejia on 20/08/2017.
 */
module pl {

    export class Element<T extends HTMLElement> {

        // region Static
        /**
         * Shortcut to create an element instance.
         * @param {string} tag
         * @returns {pl.Element}
         */
        static create(tag = 'div'): Element<HTMLElement> {
            let parts = tag.split('.');
            let tagName = parts.shift();

            let element = new Element<HTMLElement>(document.createElement(tagName));

            for (let i = 0; i < parts.length; i++) {
                element.addClass(parts[i]);
            }

            return element;
        }
        // endregion

        // region Fields
        // endregion

        /**
         * Creates an element instance.
         * @param {HTMLElement} element
         */
        constructor(element: HTMLElement) {
            if (!(element instanceof HTMLElement))
                throw "Element Required";

            this._element = <T>element;
        }

        // region Methods
        /**
         * Set one or more attributes to element.
         * @param {any} attrName
         * @param {string} value
         */
        attr(attrName: any, value: string = "") {
            let el = this.element;

            if (attrName instanceof Object) {
                for (let i in attrName) {
                    el.setAttribute(i, attrName[i]);
                }
            } else {
                el.setAttribute(attrName, value);
            }
        }

        /**
         * Adds the specified class to an element.
         * @param {string} className
         */
        addClass(className: string) {
            let el = this.element;

            if (el.classList) el.classList.add(className);
            else if (!this.hasClass(className)) el.className += " " + className;
        }

        /**
         * Append an element.
         * @param {any} element
         */
        append(elements: any) {
            if (elements instanceof ElementCollection) {
                let i, el;

                for(i = 0; el = elements[i], i < elements.length; i++) {
                    this.element.appendChild(el.element);
                }

            } else if (elements instanceof Element) {
                this.element.appendChild(elements.element);
            }
        }

        /**
         * Get children children elements.
         * @returns {pl.ElementCollection}
         */
        children(): ElementCollection {
            return ElementCollection.fromNodeList(this.element.childNodes);
        }

        /**
         * Create a deep copy of a DOM element.
         * @param {boolean} deep
         * @returns {pl.Element}
         */
        clone(deep: boolean): Element<HTMLElement> {
            return new Element(<HTMLElement>this.element.cloneNode(deep));
        }

        /**
         * Get the first element that matches the selector by testing the element itself and traversing
         * up through its ancestors in the DOM tree.
         * TODO: Remember that exists native method matches in Element.
         * @param {string} selector
         * @returns {pl.Element}
         */
        closest(selector: string): Element<HTMLElement> {
            let el: Element<HTMLElement> = this;

            while (el && !el.match(selector)) {
                el = el.parent();
            }
            return el ? el : null;
        }

        /**
         * Get the value of a computed style property for the element.
         * @param {any} prop
         * @param {any} value
         * @returns {string|null}
         */
        css(prop: any, value: any = undefined) {
            let el = this.element;

            if (prop instanceof Object) {
                for (let i in prop) {
                    el.style[i] = prop[i];
                }
            } else if ("string" === typeof prop && "string" === typeof value) {
                el.style[prop] = value;

            } else {
                let style = window.getComputedStyle ? window.getComputedStyle(el, null) : el['currentStyle'];
                return style[prop];

            }
        }

        /**
         * Remove all child nodes of an element from the DOM
         */
        empty() {
            this.element.innerHTML = '';
        }

        /**
         * Find first element match
         * @param {string} selector
         * @returns {pl.Element}
         */
        find(selector: string) {
            return new Element(<HTMLElement>this.element.querySelector(selector));
        }

        /**
         * Find elements match.
         * @param {string} selector
         * @returns {pl.ElementCollection}
         */
        findAll(selector: string): ElementCollection {
            return ElementCollection.fromNodeList(<NodeList>this.element.querySelectorAll(selector));
        }

        /**
         * Get first child of element.
         * @returns {Element|null}
         */
        firstChild(): Element<HTMLElement>{
            let firstChild = this.element.firstChild;
            return firstChild ? new Element(<HTMLElement>this.element.firstChild) : null;
        }

        /**
         * Determine whether any of the matched elements are assigned the given class.
         * @param {string} className
         * @returns {boolean}
         */
        hasClass(className: string): boolean {
            let el = this.element;

            return el.classList
                ? el.classList.contains(className)
                : new RegExp("\\b" + className + "\\b").test(el.className);
        }

        /**
         * Get or set the HTML contents of the element.
         * @param {any} html
         * @returns {string}
         */
        html(html: any): string {
            let el = this.element;

            if ("string" === typeof html) {
                el.innerHTML = html;
            } else {
                return el.innerHTML;
            }
        }

        /**
         * Get the current computed inner height for the element, including padding but not border.
         * @returns {number}
         */
        innerHeight(): number {
            return this.element.clientHeight;
        }

        /**
         * Get the current computed inner width for the element, including padding but not border.
         * @returns {number}
         */
        innerWidth(): number {
            return this.element.clientWidth;
        }

        /**
         * Insert an HTML structure before a given DOM tree element.
         * @param {HTMLElement|Element} refElem
         */
        insertAfter(refElem: any) {
            let el = this.element;
            let refEl = (refElem instanceof Element) ? refElem.element : refElem;

            refEl.parentNode.insertBefore(el, refEl.nextSibling);
        }

        /**
         * Insert an HTML structure after a given DOM tree element.
         * @param {HTMLElement|Element} refElem
         */
        insertBefore(refElem: any) {
            let el = this.element;
            let refEl = (refElem instanceof Element) ? refElem.element : refElem;

            refEl.parentNode.insertBefore(el, refEl);
        }

        /**
         * Returns a boolean it the element would be selected by the specified selector.
         * TODO: Remember that exists native method matches in Element.
         * @param {string} selector
         * @returns {boolean}
         */
        match(selector: string): boolean {
            let el = this.element,
                nodes = (el['parentNode'] || el['document']).querySelectorAll(selector),
                i = -1;

            while (nodes[++i] && nodes[i] != el);

            return !!nodes[i];
        }

        /**
         * Get next sibling.
         * @returns {pl.Element}
         */
        nextSibling(): Element<HTMLElement>{
            return this.element.nextSibling
                ? new Element(<HTMLElement>this.element.nextSibling)
                : null;
        }

        /**
         * Get next siblings.
         * @param {function} filter
         * @returns {pl.ElementCollection}
         */
        nextSiblings(filter): ElementCollection {
            let siblings: ElementCollection = new ElementCollection();
            let el: Element<HTMLElement>= this.nextSibling();

            do { if (!filter || filter(el)) { siblings.add(el); } } while (el = el.nextSibling());

            return siblings;
        }

        /**
         * Remove an event handler.
         * @param {string} type
         * @param {function} handler
         */
        off(type, handler) {
            let el = this.element;

            if ("detachEvent" in el) el['detachEvent'](`on${type}`, handler);
            else el.removeEventListener(type, handler);
        }

        /**
         * Get the current computed outer height (including padding, border, and optionally margin) for the element.
         * @param {boolean} includeMargin
         * @returns {number}
         */
        outerHeight(includeMargin: boolean): number {
            let marginTop = includeMargin ? parseFloat(this.css('margin-top')) : 0,
                marginBottom = includeMargin ? parseFloat(this.css('margin-bottom')) : 0;

            return this.element.offsetHeight + marginTop + marginBottom;
        }

        /**
         * Get the current computed outer width (including padding, border, and optionally margin) for the element.
         * @param {boolean} includeMargin
         * @returns {number}
         */
        outerWidth(includeMargin: boolean): number {
            let marginLeft = includeMargin ? parseFloat(this.css('margin-left')) : 0,
                marginRight = includeMargin ? parseFloat(this.css('margin-right')) : 0;

            return this.element.offsetHeight + marginLeft + marginRight;
        }

        /**
         * Get the current coordinates of the element relative to his parent.
         * @returns {Object}
         */
        position(): Object {
            return {
                left: this.element.offsetLeft,
                top: this.element.offsetTop
            }
        }

        /**
         * Insert an element at the beginning of the element in context.
         * @param {pl.Element} element
         */
        prepend(element: Element<HTMLElement>) {
            let el = this.element;

            //el.insertBefore(element.element, el.firstChild);
            el.insertBefore(element.element, el.childNodes[0]);
        }

        /**
         * Get the current coordinates of the element relative to his parent.
         * @returns {Object}
         */
        offset(): Object {
            let rect = this.element.getBoundingClientRect();
            let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }

        /**
         * Attach an event handler function for selected element.
         * @param {string} type
         * @param {function} handler
         * @param {boolean} useCapture
         */
        on(type, handler, useCapture = false) {
            let el = this.element;

            if ("attachEvent" in el) el['attachEvent'](`on${type}`, handler);
            else el.addEventListener(type, handler, useCapture);
        }

        /**
         * Get parent element.
         * TODO: Check for possible errors with validation with HTMLDocument.
         * @returns {pl.Element|null}
         */
        parent(): Element<HTMLElement>{
            let parent = this.element.parentNode;
            return !(parent instanceof HTMLDocument) && parent ? new Element(<HTMLElement>parent) : null;
        }

        /**
         * Get previous sibling.
         * @returns {pl.Element}
         */
        prevSibling(): Element<HTMLElement>{
            return this.element.previousSibling
                ? new Element(<HTMLElement>this.element.previousSibling)
                : null;
        }

        /**
         * Get previous siblings.
         * @param {function} filter
         * @returns {pl.ElementCollection}
         */
        prevSiblings(filter): ElementCollection {
            let siblings: ElementCollection = new ElementCollection();
            let el: Element<HTMLElement>= this.prevSibling();

            do { if (!filter || filter(el)) { siblings.add(el); } } while (el = el.prevSibling());

            return siblings;
        }

        /**
         * Remove element from DOM.
         */
        remove() {
            let el = this.element;
            el.parentNode.removeChild(el);
        }

        /**
         * Remove an attribute from element.
         * @param {string} attrName
         */
        removeAttr(attrName: string) {
            let el = this.element;

            el.removeAttribute(attrName);
        }

        /**
         * Remove class from element.
         * @param {string} className
         */
        removeClass(className: string) {
            let el = this.element;

            if (el.classList) el.classList.remove(className);
            else el.className = el.className.replace(new RegExp("\\b\s?" + className + "\\b"), "");
        }

        /**
         * Remove an element from the DOM tree and insert a new one in its place.
         * @param newElement
         */
        replace(newElement: Element<HTMLElement>) {
            let el = this.element;

            el.parentNode.replaceChild(newElement.element, el);
        }

        /**
         * Get or set the current vertical position of the scroll bar for the element.
         * @param {any} value
         * @returns {number|null}
         */
        scrollLeft(value: any) {
            if ("number" === typeof value) {
                this.element.scrollLeft = value;
            } else {
                return this.element.scrollLeft;
            }
        }

        /**
         * Get or set the current vertical position of the scroll bar for the element.
         * @param {any} value
         * @returns {number|null}
         */
        scrollTop(value: any) {
            if ("number" === typeof value) {
                this.element.scrollTop = value;
            } else {
                return this.element.scrollTop;
            }
        }

        /**
         * Get siblings of element or retrieve siblings that match a given selector.
         * @param {function} filter
         * @returns {pl.ElementCollection}
         */
        siblings(filter): ElementCollection {
            let siblings: ElementCollection = new ElementCollection();
            let parent: Element<HTMLElement>= this.parent();
            let el: Element<HTMLElement>= parent.firstChild();

            do { if (!filter || filter(el)) siblings.add(el); } while (el = el.nextSibling());

            return siblings;
        }

        /**
         * Get or set element text.
         * @param {any} value
         * @returns {undefined|text}
         */
        text(value: any) {
            if ("string" === typeof value) {
                this._element.innerText = value;
            } else {
                return this._element.innerText;
            }
        }

        /**
         * Add or remove class from element.
         * @param {string} className
         */
        toggleClass(className: string) {
            let el = this.element;

            if (el.classList) el.classList.toggle(className);
            else this.hasClass(className)
                ? this.removeClass(className)
                : this.addClass(className);
        }

        /**
         * Remove the parents of an element fromthe DOM, leaving the element's content in place.
         */
        unwrap() {
            let el = this.element;
            let parent = el.parentNode;

            while (el.firstChild) parent.insertBefore(el.firstChild, el);

            parent.removeChild(el);
        }

        /**
         * Wrap element into a new container.
         * @param {pl.Element} container
         */
        wrap(container: Element<HTMLElement>) {
            let el = this.element;
            let containerEl = container.element;

            el.parentNode.insertBefore(containerEl, el);

            containerEl.appendChild(el);
        }

        // endregion

        // region Properties
        /**
         * Property element.
         */
        private _element: T;

        /**
         * Gets the HTMLElement.
         * @returns {T}
         */
        get element(): T {
            return this._element;
        }
        // endregion

    }

}