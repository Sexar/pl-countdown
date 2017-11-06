/**
 * Created by cesarmejia on 24/10/2017.
 */
module pl {

    export class Countdown extends Element<HTMLElement> {

        // region Properties
        /**
         * @type {Element<HTMLElement>}
         */
        private days: Element<HTMLElement>;

        /**
         * @type {Element<HTMLElement>}
         */
        private hours: Element<HTMLElement>;

        /**
         * @type {Element<HTMLElement>}
         */
        private minutes: Element<HTMLElement>;

        /**
         * @type {Element<HTMLElement>}
         */
        private seconds: Element<HTMLElement>;

        /**
         * @type {Date}
         */
        private endtime: Date;

        /**
         * @type {Object}
         */
        private settings: Object;

        /**
         * @type {number}
         */
        private interval: number;
        // endregion

        /**
         * Create a countdown instance.
         * @param {Date} endtime
         * @param {Object} settings
         */
        constructor(endtime: Date, settings: Object = {}) {
            super(document.createElement('div'));

            this.endtime = endtime;
            this.settings = Util.extends({
                'separator': ':',
                'daysLabel': 'Days',
                'hoursLabel': 'Hours',
                'minutesLabel': 'Minutes',
                'secondsLabel': 'Seconds'
            }, settings);

            this.addClass('pl-countdown');
            this.buildOut();
            this.start();

        }

        // region Private Methods
        /**
         * Create countdown elements.
         */
        private buildOut() {
            // Create digit wrappers.
            let daysWrapper    = Element.create('div'),
                hoursWrapper   = Element.create('div'),
                minutesWrapper = Element.create('div'),
                secondsWrapper = Element.create('div');

            // Create digits.
            let days    = Element.create('span.pl-days'),
                hours   = Element.create('span.pl-hours'),
                minutes = Element.create('span.pl-minutes'),
                seconds = Element.create('span.pl-seconds');

            // Create labels.
            let daysLabel    = Element.create('span.pl-days-label'),
                hoursLabel   = Element.create('span.pl-hours-label'),
                minutesLabel = Element.create('span.pl-minutes-label'),
                secondsLabel = Element.create('span.pl-seconds-label');


            // Set labels.
            daysLabel.text(this.settings['daysLabel']);
            hoursLabel.text(this.settings['hoursLabel']);
            minutesLabel.text(this.settings['minutesLabel']);
            secondsLabel.text(this.settings['secondsLabel']);


            // Append elements to DOM.
            this.append(ElementCollection.fromArray([
                daysWrapper, hoursWrapper, minutesWrapper, secondsWrapper
            ]));

            daysWrapper.append(days);
            daysWrapper.append(daysLabel);

            hoursWrapper.append(hours);
            hoursWrapper.append(hoursLabel);

            minutesWrapper.append(minutes);
            minutesWrapper.append(minutesLabel);

            secondsWrapper.append(seconds);
            secondsWrapper.append(secondsLabel);


            // Point to digit elements.
            this.days    = days;
            this.hours   = hours;
            this.minutes = minutes;
            this.seconds = seconds;

        }

        /**
         * Update countdown view.
         * @param {Object} timeRemaining
         */
        private update(timeRemaining: Object) {
            this.days.text(timeRemaining['days']);
            this.hours.text(timeRemaining['hours']);
            this.minutes.text(timeRemaining['minutes']);
            this.seconds.text(timeRemaining['seconds']);

        }
        // endregion

        // region Methods
        /**
         * Get time remaining from a now to a endtime.
         * @param {Date} endtime
         * @returns {Object}
         */
        getTimeRemaining(endtime): Object {
            let timeRemaining = endtime.getTime() - new Date().getTime();
            let days    = Math.floor( timeRemaining / ( 1000 * 60 * 60 * 24 ) ),
                hours   = Math.floor( timeRemaining % ( 1000 * 60 * 60 * 24 ) / ( 1000 * 60 * 60 ) ),
                minutes = Math.floor( timeRemaining % ( 1000 * 60 * 60 ) / ( 1000 * 60 ) ),
                seconds = Math.floor( timeRemaining % ( 1000 * 60 ) / ( 1000 ) );

            return {
                'total'  : timeRemaining,
                'days'   : days,
                'hours'  : hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        /**
         * Validate date.
         * @param {string} date
         * @returns {boolean}
         */
        isDateValid(date: string): boolean {
            return /^((\d{1,2})[\-\/]){2}(\d{1,4})$/.test(date);
        }

        /**
         * Validate time.
         * @param {string} time
         * @returns {boolean}
         */
        isTimeValid(time: string): boolean {
            return /^([1-9]|(0|1)[0-9]|2[0-4])(:[0-5]?[0-9]){2}$/.test(time);
        }

        /**
         * Validate endtime.
         * @param {string} endtime
         * @returns {boolean}
         */
        isEndtimeValid(endtime: string): boolean {
            throw 'Not implemented yet';
        }

        /**
         * Starts countdown.
         */
        start() {
            this.interval = setInterval(() => {
                let timeRemaining = this.getTimeRemaining(this.endtime);

                this.update(timeRemaining);

                if (timeRemaining['total'] <= 0) {
                    clearInterval(this.interval)
                }
            }, 1000);
        }

        /**
         * Stops countdown.
         */
        stop() {
            clearInterval(this.interval);
        }
        // endregion

    }

}
