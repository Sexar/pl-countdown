/**
 * Created by cesarmejia on 01/10/2017.
 */
module pl {

    export class ElementCollection extends Collection<Element<HTMLElement>> {

        // region Static
        /**
         * Create an element collection from a node list.
         * @param {NodeList} list
         * @returns {pl.ElementCollection}
         */
        static fromNodeList(list: NodeList): ElementCollection {
            let collection = new ElementCollection();
            let i, el;

            for (i = 0; el = list[i], i < list.length; i++) {
                collection.add(new Element(el as HTMLElement));
            }

            return collection;
        }

        /**
         * Create an element collection from an array.
         * @param {Array<Element>} list
         * @returns {pl.ElementCollection}
         */
        static fromArray(list: Array<Element<HTMLElement>>): ElementCollection {
            let collection = new ElementCollection();
            let i, el;

            for (i = 0; el = list[i], i < list.length; i++) {
                collection.add(new Element(el as HTMLElement));
            }

            return collection;
        }
        // endregion

        /**
         * Create an element collection instance.
         */
        constructor() {
            super();
        }

        // region Methods
        /**
         * Set one or more attributes to elements in collection.
         * @param {any} attrName
         * @param {string} value
         */
        attr(attrName: any, value: string = "") {
            let i, el;

            this.each((el, index) => { el.attr(attrName, value); });
        }

        /**
         * Adds the specified class to elements in collection.
         * @param {string} className
         */
        addClass(className: string) {
            let i, el;

            this.each((el, index) => { el.addClass(className); });
        }

        /**
         * Remove elements from DOM.
         */
        removeItems() {
            let i, el;

            this.each((el, index) => { el.remove(); });
        }

        /**
         * Remove an attribute from elements in collection.
         * @param {string} attrName
         */
        removeAttr(attrName: string) {
            let i, el;

            this.each((el, index) => { el.removeAttr(attrName); });
        }

        /**
         * Remove class from elements in collection.
         * @param {string} className
         */
        removeClass(className: string) {
            let i, el;

            this.each((el, index) => { el.removeClass(className); });
        }
        // endregion

    }

}
