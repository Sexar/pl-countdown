/**
 * Created by cesarmejia on 24/10/2017.
 */
module pl {

    export class Countdown extends Element<HTMLElement> {

        // region Fields
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
            let days    = Element.create('span.pl-days.pl-digit'),
                hours   = Element.create('span.pl-hours.pl-digit'),
                minutes = Element.create('span.pl-minutes.pl-digit'),
                seconds = Element.create('span.pl-seconds.pl-digit');

            // Create labels.
            let daysLabel    = Element.create('span.pl-days-label.pl-label'),
                hoursLabel   = Element.create('span.pl-hours-label.pl-label'),
                minutesLabel = Element.create('span.pl-minutes-label.pl-label'),
                secondsLabel = Element.create('span.pl-seconds-label.pl-label');


            // Set digits.
            days.text("00");
            hours.text("00");
            minutes.text("00");
            seconds.text("00");

            // Set labels.
            daysLabel.text(this.settings['daysLabel']);
            hoursLabel.text(this.settings['hoursLabel']);
            minutesLabel.text(this.settings['minutesLabel']);
            secondsLabel.text(this.settings['secondsLabel']);


            // Append elements to DOM.
            this.append(ElementCollection.fromArray([
                daysWrapper, hoursWrapper, minutesWrapper, secondsWrapper
            ]));

            daysWrapper.append(ElementCollection.fromArray([ days, daysLabel ]));
            hoursWrapper.append(ElementCollection.fromArray([ hours, hoursLabel ]));
            minutesWrapper.append(ElementCollection.fromArray([ minutes, minutesLabel ]));
            secondsWrapper.append(ElementCollection.fromArray([ seconds, secondsLabel ]));


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
            let days = this.pad("" + timeRemaining['days'], 2),
                hours = this.pad("" + timeRemaining['hours'], 2),
                minutes = this.pad("" + timeRemaining['minutes'], 2),
                seconds = this.pad("" + timeRemaining['seconds'], 2);

            this.days.text(days);
            this.hours.text(hours);
            this.minutes.text(minutes);
            this.seconds.text(seconds);

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
                hours   = Math.floor( ( timeRemaining / ( 1000 * 60 * 60 ) ) % 24 ),
                minutes = Math.floor( ( timeRemaining / 1000 / 60 ) % 60  ),
                seconds = Math.floor( ( timeRemaining / 1000 ) % 60 );

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
            return /^(\d{1,4})([\-\/](\d{1,2})){2}$/.test(date);
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
            // Trim string.
            let datetime = endtime.replace(/^\s+|\s+$/g, ''),
                parts = datetime.split(" ");

            if (parts.length === 1) {
                return this.isDateValid(parts[0]);
            } else if (parts.length === 2) {
                return this.isDateValid(parts[0]) && this.isTimeValid(parts[1]);
            } else {
                return false;
            }
        }

        /**
         * Add zero's before an string indicated by max.
         * @param {string} str
         * @param {number} max
         * @returns {boolean}
         */
        pad(str: string, max: number) {
            str = str.toString();
            return str.length < max ? this.pad("0" + str, max) : str;
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

        // region Properties
        /**
         * Endtime property.
         */
        private _endtime: Date;

        /**
         * Gets endtime property.
         * @returns {Date}
         */
        get endtime(): Date {
            return this._endtime;
        }

        /**
         * Sets endtime property.
         * @param {Date} value
         */
        set endtime(value: Date) {
            this._endtime = value;
        }
        // endregion

    }

}
