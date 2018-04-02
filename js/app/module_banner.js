/**
 * Created by OO on 2015/8/5.
 *
 * Banner Switch
 * @version 1.1.0
 * @dependencies jQuery & velocity
 * @usage  new Banner().init({Object})
 * @param  {object}
 * {
 *      banner    : {array}[jQuery]  ¡¡¡¡¡ï
 *      indexMark : {array}[jQuery]  [optional]
 *      subBanner : {array}[jQuery]  [optional]
 *      duration  : {number}         [optional]
 *      begin     : {number}         [optional]
 *  }
 *
 */

define(['jquery', 'velocity'], function ($) {
    function Banner() {
    }

    Banner.prototype = {
        init: function (opt) {
            this.banner = opt.banner;
            this.subBanner = opt.subBanner || false;
            this.indexMark = opt.indexMark;
            this.duration = opt.duration || 4000;
            this._currentIndex = opt.begin || 0;
            this._lastIndex = '';
            this._length = this.banner.length;
            this._clickable = true;
            this._timer = this.run();
            this.banner.eq(this._currentIndex).addClass('display').removeClass("displaynone");
            this.banner.eq(this._currentIndex).css('opacity', 1);
            this.subBanner && this.subBanner.eq(this._currentIndex).css('left', 0);
            this.indexMark && this.bind();
        },
        run: function () {
            return setInterval((function (that) {
                return function () {
                    that.mark()
                }
            })(this), this.duration);
        },
        stop: function () {
            clearInterval(this._timer);
        },
        mark: function (num) {
            var index = this._lastIndex = this._currentIndex;
            this._currentIndex = typeof num === 'number' ? num : index < this._length - 1 && ++index || 0;
            this.indexMark.eq(this._lastIndex).removeClass('current').prevObject.eq(this._currentIndex).addClass('current');
            this.move();
        },
        move: function () {
            this.banner.eq([this._lastIndex]).velocity({
                opacity: 0,
                left: 100
            }, {
                duration: 400,
                easing: 'ease-out'
            }).velocity({
                left: 0
            }, {
                duration: 0
            }).prevObject.eq([this._currentIndex]).velocity({
                    opacity: 1,
                    left: 0
                }, {
                    duration: 400,
                    easing: 'ease-out'
                });
            this.subBanner && this.subBanner.eq([this._lastIndex]).velocity({
                left: '100%',
                'z-index': 9
            }, {
                duration: 600,
                easing: 'ease-out'
            }).velocity({
                left: '-100%',
                'z-index': 8
            }, {
                duration: 0
            }).prevObject.eq([this._currentIndex]).velocity({
                    left: 0,
                    'z-index': 10
                }, {
                    duration: 600,
                    easing: 'ease-out'
                });
        },
        bind: function () {
            this.indexMark.on('click', function (that) {
                return function (e) {
                    that.event.call(that, e)
                }
            }(this))
        },
        event: function (e) {
            var clickedIndex = this.indexMark.index(e.target);
            if (this._clickable && clickedIndex !== this._currentIndex) {
                this._clickable = false;
                this.stop();
                this.mark(clickedIndex);
                this._timer = this.run();
                setTimeout(function(that){
                    return function(){
                        that._clickable = true
                    }
                }(this), 1000)
            }
        }
    };

    return Banner;
});