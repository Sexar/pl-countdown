/**
 * Created by cesarmejia on 22/10/2017.
 */
module pl {

    export class Util {

        /**
         * Merge objects and create a new one.
         * @param {Array<Object>} objects
         * @return {Object}
         */
        static extends(...objects) {
            let result: Object = {}, i: number;

            for (i = 0; i < objects.length; i++) {
                (currentObj => {
                    let prop;

                    for (prop in currentObj) {
                        if (currentObj.hasOwnProperty(prop)) {
                            result[prop] = currentObj[prop];
                        }
                    }
                })(objects[i]);
            }

            return result;
        }

    }

}