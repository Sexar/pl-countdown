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
         * @param {Date|string} endTime
         * @param {Object} settings
         */
        constructor(endTime: any, settings: Object = {}) {
            super(document.createElement('div'));

            this.endTime = endTime;
            this.settings = Util.extendsDefaults({
                dateFormat: 'yyyy-mm-dd',
                separator: ':',
                daysLabel: 'Days',
                hoursLabel: 'Hours',
                minutesLabel: 'Minutes',
                secondsLabel: 'Seconds'
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
         * Get time remaining from a now to a endTime.
         * @param {Date} endTime
         * @returns {Object}
         */
        getTimeRemaining(endTime): Object {
            let timeRemaining = endTime.getTime() - new Date().getTime();
            let days, hours, minutes, seconds;

            if (timeRemaining > 0) {
                days    = Math.floor( timeRemaining / ( 1000 * 60 * 60 * 24 ) ),
                hours   = Math.floor( ( timeRemaining / ( 1000 * 60 * 60 ) ) % 24 ),
                minutes = Math.floor( ( timeRemaining / 1000 / 60 ) % 60  ),
                seconds = Math.floor( ( timeRemaining / 1000 ) % 60 );
            } else {
                days = hours = minutes = seconds = 0;
            }

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
            return /^(\d{1,4})[\-\/]([1-9]|1[012])[-\/]([1-9]|[12]\d|3[01])$/.test(date);
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
         * Validate endTime.
         * @param {string} endTime
         * @returns {boolean}
         */
        isEndtimeValid(endTime: string): boolean {
            // Trim string.
            let datetime = endTime.replace(/^\s+|\s+$/g, ''),
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
         * Parse date to ISO8601 format.
         * Reference: https://stackoverflow.com/questions/3085937/safari-js-cannot-parse-yyyy-mm-dd-date-format
         * @param {string} date
         * @param {string} format
         * @returns {Date}
         */
        parseDate(date: string, format: string) {
            let parts: Array<string> = date.match(/(\d+)/g);
            let i: number = 0, order: object = {};

            format = format || 'yyyy-mm-dd';
            (format as any).replace(/(yyyy|dd|mm)/g, function(part) { order[part] = i++; });

            let [ year, month, day ] = [
                parseInt(parts[order['yyyy']]),
                parseInt(parts[order['mm']]) - 1,
                parseInt(parts[order['dd']])
            ];

            console.log("%s-%s-%s", year, month, day);

            return new Date( year, month, day );
        }

        /**
         * Starts countdown.
         */
        start() {
            this.interval = setInterval(() => {
                let timeRemaining = this.getTimeRemaining(this.endTime);

                this.update(timeRemaining);

                if (timeRemaining['total'] <= 0) {
                    clearInterval(this.interval);
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
        private _endTime: any;

        /**
         * Gets endTime property.
         * @returns {Date|string}
         */
        get endTime(): any {
            return this._endTime;
        }

        /**
         * Sets endTime property.
         * @param {Date|string} value
         */
        set endTime(value: any) {
            if (value instanceof Date) { this._endTime = value; }
            else if ("string" === typeof value && this.isEndtimeValid(value)) { this._endTime = new Date(value); }
            else { this._endTime = new Date(); }
        }

        // endregion

    }

}
