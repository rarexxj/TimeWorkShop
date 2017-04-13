$(function () {
    // $.ADDLOAD();
    "use strict";
    new Vue({
        el: '#main',
        data: {
            proinfo: [],
            infodata: {
                wordKey: '',
                goodsCategory: 1,
                pageNo: 1,
                limit: 10
            }

        },
        ready: function () {
            var _this = this;
            // _this.weixshare();
            // _this.proinfoajax();
            _this.layclose();
            _this.$nextTick(function () {
            })
        },
        methods: {
            weixshare: function () {
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: '', // 必填，公众号的唯一标识
                    timestamp:'' , // 必填，生成签名的时间戳
                    nonceStr: '', // 必填，生成签名的随机串
                    signature: '',// 必填，签名，见附录1
                    jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            },
            proinfoajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/Mall/Goods/List',
                    type: 'get',
                    dataType: 'json',
                    data: _this.infodata
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.proinfo = rs.data;

                        _this.$nextTick(function () {
                            $.RMLOAD();
                        })

                    }
                })
            },
            layclose: function () {
                $('#main').on('click', '.layer', function () {
                    $(this).hide();
                })
                $('#main').on('click', '.layer-xx', function () {
                    $(this).hide();
                })
                $('#main').on('click', '.lay-close', function () {
                    $('.layer').show();
                })
                $('#main').on('click', '.per-xx', function () {
                    $('.layer-xx').show();
                })
            }
        }
    })
})