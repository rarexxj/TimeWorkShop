$(function () {
    $.ADDLOAD();
    $.checkuser();
    var id = $.getUrlParam('id');
    new Vue({
        el: '#main',
        data: {
            proinfo: [],
            infodata: {
                activityId: id
            },
            regdata: {
                PhoneNumber: '',
                Password: '123456',
                SmsVerifyCode: '',
                // ChannelId:'',
                // InvitationCode:'',
                // OpenId:'',
                StoreId: '',
                StoreName: ''
            },
            shopinfo: [],
            duanxdata: {
                PhoneNumber: $('#tel').val(),
                RequestType: '4'
            },
            payid: '',
            ParentId:''

        },
        ready: function () {
            var _this = this;
            _this.proinfoajax();
            _this.yanzcode();
            _this.layclose();
            _this.register();
            _this.submit();
            _this.shopaddress();
            _this.$nextTick(function () {
            })
        },
        methods: {
            proinfoajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/Activity/Detail',
                    type: 'get',
                    dataType: 'json',
                    data: _this.infodata
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.$nextTick(function () {
                            _this.proinfo = rs.data;
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
                    $('#name').val('');
                    $('#tel').val('');
                    $('#yanzm').val('');
                })
                $('#main').on('click', '.lay-close', function () {
                    $('.layer').show();
                })
                $('#main').on('click', '.per-xx', function () {
                    $('.layer-xx').show();
                })
                $('#main').on('click', '.lay-ok', function () {
                    $('.layer').hide();
                })
                $('#main').on('click', '.layer-xxbox', function (ev) {
                    ev.stopPropagation();
                })
            },
            register: function () {
                var _this = this;
                var reg = /^1[3|4|5|7|8]\d{9}$/
                $('#main').on('click', '.submit', function () {
                    _this.regdata.PhoneNumber = $('#tel').val();
                    _this.regdata.NickName = $('#name').val();
                    _this.regdata.SmsVerifyCode = $('#yanzm').val();
                    _this.regdata.StoreId = $('#shop-box option:selected').attr('data-id');
                    _this.regdata.StoreName = $('#shop-box option:selected').html();
                    if ($('#name').val() == '') {
                        $.oppo("请输入姓名", 1);
                        return false;
                    } else if ($('#tel').val() == '') {
                        $.oppo("请输入手机号", 1);
                        return false;
                    } else if (!reg.test($('#tel').val())) {
                        $.oppo("手机号格式有误", 1);
                        return false;
                    } else if ($('#yanzm').val() == '') {
                        $.oppo("请输入验证码", 1);
                        return false;
                    } else {
                        $.ajax({
                            url: '/Api/v1/Member/' + $.get_user('Id') + '/Bound/PhoneNumber',
                            type: 'PATCH',
                            dataType: 'json',
                            data: _this.regdata
                        }).done(function (rs) {
                            if (rs.returnCode == '200') {
                                $.oppo('个人信息填写成功', 1);
                                localStorage.setItem('qy_phonenumber', $('#tel').val());
                                $('.layer-xx').hide();
                            }
                        })
                    }
                })
            },
            shopaddress: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/StoreList/Activity',
                    type: 'get',
                    dataType: 'json'
                }).done(function (rs) {
                    if (rs.returnCode = '200') {
                        _this.shopinfo = rs.data;
                    }
                })
            },
            yanzcode: function () {
                var reg = /^1[3|4|5|7|8]\d{9}$/;
                var _this = this;
                $('#main').on('click', '.get', function () {
                    _this.duanxdata.PhoneNumber = $('#tel').val();
                    if ($('#tel').val() == '') {
                        $.oppo("请输入手机号", 1);
                        return false;
                    } else if (!reg.test($('#tel').val())) {
                        $.oppo("手机号格式有误", 1);
                        return false;
                    } else {
                        $.ajax({
                            url: '/Api/v1/Member/SendCode',
                            type: 'POST',
                            dataType: 'json',
                            data: _this.duanxdata
                        }).done(function (rs) {
                            if (rs.returnCode == '200') {
                                CountDown($('.get'));
                                $.oppo('短信验证码已发送', 1)
                            }
                        })
                    }
                })
            },
            submit: function () {
                var _this = this;
                $('.faqi').on('click', function () {
                    var phonenumber = localStorage.getItem('qy_phonenumber');
                    if (phonenumber == 'null') {
                        $('.layer').show();
                    } else {
                        localStorage.removeItem('qy_parentid');
                        localStorage.removeItem('qy_buyid');
                        _this.joinajax();
                        // $('#formid').attr('action','/payment/process/weixin')
                    }
                })
            },
            joinajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/Activity/' + id + '/Apply',
                    dataType: 'json',
                    type: 'post',
                    data: {
                        activityId: id,
                        ApplyType: '0',
                        ParentId: ''
                    }
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        // localStorage.setItem('qy_faqid',rs.data.Id);
                        // localStorage.setItem('qy_parentid',rs.data.ParentId);
                        if (rs.data.PayStatus == '2') {
                            location.href = '/Html/html/buy/buysuccess.html';
                            return false;
                        }
                        _this.payid = rs.data.Id;
                        _this.payajax();
                    }
                })
            },
            payajax:function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/Payment/WeiXin/JsApiParam',
                    dataType: 'json',
                    type: 'post',
                    data:{
                        orderId:_this.payid,
                        paymentCode:'weixin',
                        useBalance:'0'
                    }
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.jsApiCall(rs.data);
                    }
                })
            },
            jsApiCall:function (data) {
                var _this=this;
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    data,
                    function (res) {
                        WeixinJSBridge.log(res.err_msg);
                        //alert(res.err_code + res.err_desc + res.err_msg);
                        var code = (res.err_code + res.err_desc + res.err_msg).split(':')[1];
                        if (code != "ok") {
                            $.oppo('支付失败',1)
                        } else {
                            location.href ='buysuccess.html';
                        }
                    });

            }
        }
    })
})