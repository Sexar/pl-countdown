/**
 * Created by cesarmejia on 24/10/2017.
 */
module pl {

    export class Countdown extends Element<HTMLElement> {

        // region Properties
        /**
         * @type Element<HTMLElement>
         */
        private seconds: Element<HTMLElement>;

        /**
         * @type Element<HTMLElement>
         */
        private minutes: Element<HTMLElement>;

        /**
         * @type Element<HTMLElement>
         */
        private hours: Element<HTMLElement>;

        /**
         * @type Element<HTMLElement>
         */
        private days: Element<HTMLElement>;

        /**
         * @type Date
         */
        private deadline: Date;

        /**
         * @type Object
         */
        private settings: Object;
        // endregion

        /**
         * Create a countdown instance.
         * @param {Date} deadline
         * @param {Object} settings
         */
        constructor(deadline: Date, settings: Object = {}) {
            super(document.createElement('div'));

            this.addClass('pl-countdown');

            this.buildOut();
            this.update();
        }

        // region Private Methods
        /**
         * Create elements for countdown.
         */
        private buildOut() {
            // Create Wrapers
            let daysWraper    = Element.create('div.pl-days'),
                hoursWraper   = Element.create('div.pl-hours'),
                minutesWraper = Element.create('div.pl-minutes'),
                secondsWraper = Element.create('div.pl-seconds');

            // Create Labels
            let daysLabel    = Element.create('span.pl-label'),
                hoursLabel   = Element.create('span.pl-label'),
                minutesLabel = Element.create('span.pl-label'),
                secondsLabel = Element.create('span.pl-label');

            // Create Digits
            let daysDigits    = Element.create('span.pl-digits'),
                hoursDigits   = Element.create('span.pl-digits'),
                minutesDigits = Element.create('span.pl-digits'),
                secondsDigits = Element.create('span.pl-digits');


            // Append elements to DOM.
            this.append(ElementCollection.fromArray([ daysWraper, hoursWraper, minutesWraper, secondsWraper ]));

            daysWraper.append(ElementCollection.fromArray([daysLabel, daysDigits]));
            hoursWraper.append(ElementCollection.fromArray([hoursLabel, hoursDigits]));
            minutesWraper.append(ElementCollection.fromArray([minutesLabel, minutesDigits]));
            secondsWraper.append(ElementCollection.fromArray([secondsLabel, secondsDigits]));


            // Put digits to the class scope.
            this.days    = daysDigits;
            this.hours   = hoursDigits;
            this.minutes = minutesDigits;
            this.seconds = secondsDigits;
        }

        /**
         * Update countdown view.
         */
        private update() {
            this.days.text('31');
            this.hours.text('12');
            this.minutes.text('31');
            this.seconds.text('06');

        }
        // endregion

        // region Methods
        getObject() {

        }
        // endregion

    }

}
