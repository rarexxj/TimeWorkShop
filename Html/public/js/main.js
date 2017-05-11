$(function () {
//rem
    function set_font() {
        // 计算、转换布局单位
        var html = document.getElementsByTagName('html')[0];
        var designFontSize = 100,
            designWidth = 750;

        function setFontSize() {
            var winWidth = document.documentElement.getBoundingClientRect().width;
            var fontSize = winWidth / designWidth * designFontSize;

            html.style.fontSize = fontSize + 'px';
        }

        setFontSize();
        window.addEventListener('resize', function () {
            setFontSize();
        });

        return this;
    }

    set_font()


//删除HTML里面标签
    $.DELHTML = function (str) {
        return str ? str.replace(/<[^>].*?>/g, "") : str;
    }
//获取URL上参数
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
        var r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return null
    }

//移除LOADING
    $.RMLOAD = function () {
        (!$('.new-loading').length) || $('.new-loading').remove();
        (!$('.news-loading').length) || $('.news-loading').remove();
    }
//添加LOADING
    $.ADDLOAD = function () {
        var html = '<div class="new-loading"><ul class="small-loading"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul></div>'
        if (!$('.new-loading').length) {
            $('body').append(html);
        }
    }
//提示框
    $.oppo = function (msg, time, callback) {
        var html = '<div class="oppo">' + msg + '</div>';
        $('body').append(html);
        setTimeout(function () {
            $('.oppo').remove()
            if (typeof (callback) == 'function') {
                callback()
            } else {

            }
        }, time * 1000)
    }
//判断是否为微信
    $.is_weixin = function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/micromessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }


    //回跳登录页
    $.Backlog = $.BACKLOGIN = function (back) {
        var from = (back ? back : (location.pathname + location.search));

        if ($.is_weixin()) {
            window.location.replace('/WeiXin/Login' + (from ? ('?backUrl=' + from) : ''));
        } else {
            //填写路径
            window.location.replace('/Html/html/personalcenter/login.html' + (from ? ('?from=' + window.base64encode(from)) : ''))
        }

    }

    /*用户相关*/
    $.put_user = function (rs) {
        localStorage.qy_user = JSON.stringify(rs)
    }

    $.get_user = function (rs) {
        return rs ? JSON.parse(localStorage.qy_user)[rs] : JSON.parse(localStorage.qy_user)
    }

    $.clear_user = function () {
        localStorage.clear()
    }

    //授权
    $.checkuser = function (back) {
        if ($.is_weixin()) {
            var user = $.cookie('userInfo');
            if (user) {
                user = JSON.parse(window.base64decodes(user))
                $.put_user(user)
                localStorage.setItem('qy_loginToken', user.UserName + ':' + user.DynamicToken);
                localStorage.setItem('qy_phonenumber', user.PhoneNumber);
                $.removeCookie('userInfo');
                // delCookie('userInfo')
            }
        }

        window.TOKEN = localStorage.getItem('qy_loginToken');
        if (window.TOKEN) {
            $.ajaxSetup({
                headers: {
                    // 'Content-type': 'application/json',
                    Authorization: 'Basic ' + window.base64encode(window.TOKEN)
                }
            })
        } else {
            $.BACKLOGIN(back)
        }
    }

    //是否发起过活动
    var t = 60;
    function isbuy() {
        $.checkuser();
        $.ajax({
            url: '/Api/v1/MyApplyId/Activity',
            dataType: 'json',
            type: 'get'
        }).done(function (rs) {
            if (rs.returnCode == '200') {
                localStorage.removeItem('qy_title');
                localStorage.setItem('qy_title', rs.data.ActivityName);
                if (!rs.data.ApplyId) {
                    var timer = setTimeout(function () {
                        t = t - 2;
                        console.log(t)
                        if(t>0){
                            isbuy()
                        }else{

                        }
                    }, 2000)
                } else {
                    localStorage.setItem('qy_buyid', rs.data.ApplyId);
                }
            }
        })
    }

    isbuy();


    //自动调取后台错误码
    $.nouser = function () {
        $(document).ajaxSuccess(function (a, xhr, settings) {
            if (xhr.responseText) {
                // var res = JSON.parse(xhr.responseJSON)
                var res = JSON.parse(xhr.responseText);
                if (res.returnCode == '401') {
                    console.log(3333)
                    $.clear_user()
                    $.Backlog()
                    return false
                }
                if (res.returnCode != '200') {
                    $.oppo(res.msg, 1)
                }
            }
        })
    }

    $.nouser();


    //保留两位小数
    $.fixed = function (str) {
        var _nHtml = Number($(str).html());
        var _html = _nHtml.toFixed(2);
        $(str).html(_html)
    }
})

// if (location.pathname.indexOf('/Html/html/buy/share') > -1) {
//     var html = '<script src="/Html/public/js/core-min.js"></script><script src="/Html/public/js/enc-base64-min.js"></script><script src="/Html/public/js/jquery.cookie.js"></script><script src="http://res.wx.qq.com/open/js/jweixin-1.1.0.js"></script><script src="/Html/public/js/share2.js"></script>'
//
//     document.write(html)
// } else {
//     var html = '<script src="/Html/public/js/core-min.js"></script><script src="/Html/public/js/enc-base64-min.js"></script><script src="/Html/public/js/jquery.cookie.js"></script><script src="http://res.wx.qq.com/open/js/jweixin-1.1.0.js"></script><script src="/Html/public/js/share.js"></script>'
//
//     document.write(html)
// }
var html = '<script src="/Html/public/js/core-min.js"></script><script src="/Html/public/js/enc-base64-min.js"></script><script src="/Html/public/js/jquery.cookie.js"></script><script src="http://res.wx.qq.com/open/js/jweixin-1.1.0.js"></script><script src="/Html/public/js/share2.js"></script>'

document.write(html)


window.base64decodes = function (str) {
    var words = CryptoJS.enc.Base64.parse(str);
    words = words.toString(CryptoJS.enc.Utf8);
    return words
}


window.base64encode = function (str) {
    //var encryptedHexStr = CryptoJS.enc.Base64.parse(str);
    var encryptedHexStr = CryptoJS.enc.Utf8.parse(str)

    var words = CryptoJS.enc.Base64.stringify(encryptedHexStr);

    return words
}


function cut_money(rs, key1, key2) {
    var money = {}
    var keys1 = key1 ? key1 : 'p1',
        keys2 = key2 ? key2 : 'p2'

    money[keys1] = (rs.toString().indexOf('.') > -1) ? (rs.toString().split('.')[0]) : rs.toString()

    money[keys2] = (rs.toString().indexOf('.') > -1) ? (rs.toString().split('.')[1].length > 1 ? rs.toString().split('.')[1] : (rs.toString().split('.')[1] + '0')) : '00'
    return money
}
function CountDown(obj) {
    var t = 60;
    var timer = setInterval(function () {
        if (t == 0) {
            obj.val('获取验证码');
            obj.removeAttr("disabled");
            clearInterval(timer);
        } else {
            obj.val(t + '秒后重发');
            obj.attr("disabled", true);
            t--;
        }

    }, 1000)
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

