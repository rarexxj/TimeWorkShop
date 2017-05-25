(function ($) {
    var id = localStorage.getItem('qy_parentid'); //参与者父级身份id
    var buyid = localStorage.getItem('qy_buyid'); //发起成功后生成的id
    $.ajax({
        url: '/Api/v1/Share',
        data: {
            strUrl: location.href
        },
        type: 'get'
    }).done(function (rs) {
        if (rs.returnCode == '200') {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: rs.data.appId, // 必填，公众号的唯一标识
                timestamp: rs.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: rs.data.nonceStr, // 必填，生成签名的随机串
                signature: rs.data.signature,// 必填，签名，见附录1
                jsApiList: ['checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            function shareback() {
                var type = $('body').attr('share-type')
                if (type != 'note' && type != 'goods') {
                    return false
                }

                var data = {
                    SharType: 1
                }

                if (type == 'note') {
                    data.SharType = 2
                }
                //alert(JSON.stringify(data))
                $.ajax({
                    url: '/Api/v1/WalletBill',
                    type: 'post',
                    data: data
                }).done(function (res) {
                    //alert(JSON.stringify(res))
                    $.oppo('分享成功', 1)
                }).fail(function (res) {
                    alert(JSON.stringify(res))
                })

            }

            if (!buyid) {
                var opts = {
                    title: $('body').attr('title') || localStorage.getItem('qy_title'),
                    desc: $('body').attr('desc') ||  localStorage.getItem('qy_title'),
                    link: $('body').attr('link') || location.origin,
                    imgUrl: $('body').attr('imgUrl') || location.origin + '/Html/css/img/logo6.png',
                    type: '',
                    dataUrl: '',
                    timeline: function () {
                        shareback()
                    },
                    friend: function () {
                        shareback()
                    },
                    qq: function () {
                        shareback()
                    },
                    weibo: function () {
                        shareback()
                    }
                }
            } else {
                var opts = {
                    title: $('body').attr('title') || localStorage.getItem('qy_title'),
                    desc: $('body').attr('desc') ||  localStorage.getItem('qy_descname')+'邀你参加活动啦！',
                    link: $('body').attr('link') || location.origin + '/Html/html/buy/share.html?id=' + buyid,
                    imgUrl: $('body').attr('imgUrl') || location.origin + '/Html/css/img/logo6.png',
                    type: '',
                    dataUrl: '',
                    timeline: function () {
                        shareback()
                    },
                    friend: function () {
                        shareback()
                    },
                    qq: function () {
                        shareback()
                    },
                    weibo: function () {
                        shareback()
                    }
                }
            }
            var newopt = opts
            // if (typeof opt == "object") {
            //     newopt = $.extend(opts, opt)
            // }

            wx.ready(function () {
                // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                wx.onMenuShareAppMessage({
                    title: newopt.title, // 分享标题
                    desc: newopt.desc, // 分享描述
                    link: newopt.link, // 分享链接
                    imgUrl: newopt.imgUrl, // 分享图标
                    type: newopt.type, // 分享类型,music、video或link，不填默认为link
                    dataUrl: newopt.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
                    trigger: function (res) {
                        //alert('用户点击发送给朋友');
                    },
                    success: function (res) {
                        //alert('已分享');
                        //alert(1)
                        newopt.friend()
                    },
                    cancel: function (res) {
                        //alert('已取消');
                    },
                    fail: function (res) {
                        //alert(JSON.stringify(res));
                    }
                });

                // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                wx.onMenuShareTimeline({
                    title: newopt.title, // 分享标题
                    desc: newopt.desc, // 分享描述
                    link: newopt.link, // 分享链接
                    imgUrl: newopt.imgUrl, // 分享图标
                    trigger: function (res) {
                        //alert('用户点击发送给朋友');
                    },
                    success: function (res) {
                        //alert('已分享');
                        newopt.timeline()
                    },
                    cancel: function (res) {
                        //alert('已取消');
                    },
                    fail: function (res) {
                        //alert(JSON.stringify(res));
                    }
                });


                wx.onMenuShareQQ({
                    title: newopt.title, // 分享标题
                    desc: newopt.desc, // 分享描述
                    link: newopt.link, // 分享链接
                    imgUrl: newopt.imgUrl, // 分享图标
                    trigger: function (res) {
                        //alert('用户点击发送给朋友');
                    },
                    success: function (res) {
                        //alert('已分享');
                        newopt.qq()
                    },
                    cancel: function (res) {
                        //alert('已取消');
                    },
                    fail: function (res) {
                        //alert(JSON.stringify(res));
                    }
                });

                wx.onMenuShareWeibo({
                    title: newopt.title, // 分享标题
                    desc: newopt.desc, // 分享描述
                    link: newopt.link, // 分享链接
                    imgUrl: newopt.imgUrl, // 分享图标
                    trigger: function (res) {
                        //alert('用户点击发送给朋友');
                    },
                    success: function (res) {
                        //alert('已分享');
                        newopt.weibo()
                    },
                    cancel: function (res) {
                        //alert('已取消');
                    },
                    fail: function (res) {
                        //alert(JSON.stringify(res));
                    }
                });
            })


        }

    }).fail(function (err) {
        //alert(JSON.stringify(err))
    })


})
(jQuery)