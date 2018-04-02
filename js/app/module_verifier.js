/**
 * Created by OO on 2015/8/12.
 * @version          v1.1.2
 * @usage            new Verifier().init({Object})
 * @dependencies    ['jQuery']
 * @params          {Object}
 *  {
 *      type        {string}
 *       |_ _ _ _    mobilephone | password | password_confirm | captcha_sms | username  接受多个type e.g 'mobilephone, password'
 *
 *      id          {string}                        需要加 #
 *      url         {string}        [optional]      AJAX 验证链接
 *      regexp      {object}        [optional]      正则规则 [用户名 | 密码 | 手机号码].单项
 *      addData     {object}        [optional]      除了输入的值外 附加的数据
 *      hint        {callback}      [optional]      输入时提示
 *      empty       {callback}      [optional]      输入为空时
 *      success     {callback}      [optional]      验证成功 触发函数，有url则AJAX 参数为返回数据
 *      error       {callback}      [optional]      验证错误 触发函数
 *      offline     {callback}      [optional]      AJAX 验证失败
 *   }
 *
 */
'use strict';
define(['jquery'], function ($) {
    function Verifier() {
        this.USERNAME_REGEXP = /^[a-z][\w]{5,19}$/i;                        //用户名   正则   =>  6-20个以字母开头、可带数字、下划线
        this.PASSWORD_REGEXP = /^[^\W_]{6,20}$/;                            //密码     正则   =>  6-20 字母或数字
        this.MOBILEPHONE_REGEXP = /^0?(1[358]\d|14[57]|17[0678])\d{8}$/;    //手机号码 正则
        this._type = {
            mobilephone: 'mobilephone',
            password: 'password',
            password_confirm: 'password_confirm',
            captcha_sms: 'smsscode',
            username: 'username'
        };
        this._configed = false;
    }

    Verifier.prototype = {
        init: function () {
            var length = arguments.length;
            if (length) {
                for (var i = 0; i < length; i++) {
                    //make obj[type] change to array
                    var typeArr = arguments[i].type.split(',');
                    var typeArrTemp = this.utility._getProtoType(typeArr);
                    arguments[i].type = typeArrTemp;
                    arguments[i].regexp ? this[typeArrTemp[0].toUpperCase() + '_REGEXP'] = arguments[i].regexp : '';
                    this.event(arguments[i])
                }
            }
        },
        handle: function (obj, val) {
            var that = this;
            obj.url && $.ajax({
                url: obj.url,
                type: 'post',
                dataType: 'json',
                data: that.utility._parseData(obj, val),
                success: function (res) {
                    obj.success(res)
                },
                error: obj.offline
            }) || obj.success()
        },
        verify: function (type, val) {
            switch (type) {
                case this._type.mobilephone :
                    return this.MOBILEPHONE_REGEXP.test(val);
                case this._type.password :
                    this._passwordTemp = val;
                    return this.PASSWORD_REGEXP.test(val);
                case this._type.password_confirm :
                    return this.PASSWORD_REGEXP.test(val) && val === this._passwordTemp;
                case this._type.username :
                    return this.USERNAME_REGEXP.test(val);
                case this._type.captcha :
                    return val && val.length === 4;
                case this._type.captcha_sms:
                    return val && val.length === 6;
                default:
            }
        },
        event: function (obj) {
            var that = this;
            $(obj.id).on('focus', obj.hint);
            $(obj.id).on('blur', function () {
                var that_input = this;
                if (this.value) {
                    (function (boolean) {
                        boolean ? that.handle(obj, that_input.value) : obj.error()
                    })(function () {
                        return obj.type.some(function (item, index, array) {
                            if (that.verify(item, that_input.value)) {
                                obj.validType = item;
                                return true;
                            }
                            return false
                        })
                    }());
                } else {
                    obj.empty()
                }
            });
        },
        config: function (obj) {
            for (var i in obj) {
                this._type[i] = obj[i]
            }
            this._configed = true;
        },
        utility: {
            _parseData: function (obj, val) {
                var data = {};
                data[obj.type] = val;
                if (obj.addData) {
                    for (var i in obj.addData) {
                        data[i] = obj.addData[i]
                    }
                }
                return data
            },
            _getProtoType: function (typeArr) {
                if (!this._configed) {
                    return typeArr
                } else {
                    for (var i = 0; i < typeArr.length; i++) {
                        for (var j in this._type) {
                            if (typeArr[i] === this._type[j]) {
                                typeArr[i] = j
                            }
                        }
                    }
                }
            }
        }
    };

    return Verifier;
});


