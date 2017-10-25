/**
 * Created by cesarmejia on 08/10/2017.
 */
module pl {

    export class Collection<T> {

        // region Static
        // endregion

        // region Fields
        /**
         * Indicates current position in the collection.
         * @type {number}
         */
        private pointer: number = 0;
        // endregion

        /**
         * Create a collection instance.
         */
        constructor() {

        }

        // region Methods

        /**
         * Adds an element.
         * @param {T} element
         */
        add(element: T) {
            this[this._length++] = element;
        }

        /**
         * Adds an array of elements.
         * @param {Array<T>} elements
         */
        addArray(elements: Collection<T>){
            for (let i = 0; i < elements.length; i++) {
                this.add(elements[i]);
            }
        }

        /**
         * Adds a collection of elements.
         * @param {Collection<T>} collection
         */
        addCollection(collection: Collection<T>){
            for (let i = 0; i < collection.length; i++) {
                this.add(collection[i]);
            }
        }

        /**
         * Clears the collection.
         */
        clear(){
            while(this.length > 0){
                this.removeAt(0);
            }
        }

        /**
         * Returns a value indicating if the specified element is contained.
         * @param {T} element
         */
        contains(element: T): boolean{
            for (let i = 0; i < this.length; i++) {
                if(this[i] == element) return true;
            }
            return false;
        }

        /**
         * Iterates through the collection.
         * @param {function} handler
         */
        each(handler: (item: T, index: number) => any) {
            for(let i = 0; i < this.count; i++){
                handler.call(this, this[i], i);
            }
        }

        /**
         * Gets the index of the specified element if found. -1 if not found.
         * @param {T} item
         * @returns {number}
         */
        indexOf(item: T){
            for(let i = 0; i < this.length; i++){
                if(this[i] === item){
                    return i;
                }
            }
            return -1;
        }

        /**
         * Gets the item at the specified position.
         * @param {number} index
         * @returns {T}
         */
        item(index: number): T{
            return this[index];
        }

        /**
         * Returns the object on current pointer and moves the pointer forward.
         * It returns null and resets pointer if end of collection reached.
         * @returns {T}
         */
        next(): T{
            if(this.pointer >= this.length){
                this.pointer = 0;
                return null;
            }

            return this[this.pointer++];
        }

        /**
         * Removes the specified item from the collection
         * @param {T} item
         */
        remove(item: T) {
            let buffer: T[] = [];
            let index: number = -1;

            //region Clear this
            for (let i = 0; i < this.length; i++) {
                let t: T = this[i];

                delete this[i];

                if (t === item) {
                    index = i;
                } else {
                    buffer.push(t);
                }
            }
            //endregion

            //region Apply buffer
            for (let j = 0; j < buffer.length; j++) {
                this[j] = buffer[j];
            }

            this._length = buffer.length;
            //endregion

            return this;
        }

        /**
         * Removes the item ath the specified index
         * @param {number} index
         */
        removeAt(index: number){
            this.remove(this[index]);
        }

        /**
         * Resets the internal pointer for calls to <c>next()</c> method.
         */
        resetPointer(){
            this.pointer = 0;
        }

        // endregion

        // region Properties
        /**
         * Counter of elements in collection.
         * @returns {number}
         */
        get count(): number {
            return this._length;
        }

        /**
         * Gets the first element of the collection
         * @returns {T}
         */
        get first(): T{
            return this.length > 0 ? this[0] : null;
        }

        /**
         * Gets the last element of the collection
         * @returns {T}
         */
        get last(): T{
            return (this.length > 0 ? this[this.length - 1] : null);
        }

        /**
         * Length of collection.
         * @type {number}
         * @private
         */
        private _length: number = 0;

        /**
         * Gets the length of the collection.
         * @returns {number}
         */
        get length(): number {
            return this._length;
        }
        // endregion

    }

}