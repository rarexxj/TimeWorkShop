$(function () {
    $.ADDLOAD();
    $.checkuser();
    new Vue({
        el: '#main',
        data: {
            proinfo: [],
            infodata:{
                pageNo:1,
                limit:10,
                status:0
            },
            payid:'',
            activityId:'',
            ParentId:''


        },
        ready: function () {
            var _this = this;
            _this.proinfoajax();
            _this.navtab();
            _this.upload();
            _this.layclose();
            _this.$nextTick(function () {
            })
        },
        methods: {
            proinfoajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/MyApply/Activity',
                    type: 'get',
                    dataType: 'json',
                    data: _this.infodata
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.proinfo = rs.data;
                        allpage=rs.data.TotalCount/_this.infodata.limit;
                        _this.$nextTick(function () {
                            $.RMLOAD();
                        })

                    }
                })
            },
            navtab:function () {
                var _this=this;
                $('#main').on('click','.nav2-box-ul li',function () {
                    _this.infodata.status=$(this).attr('date-id');
                    _this.infodata.pageNo=1;
                    $(this).addClass('active').siblings().removeClass('active');
                    _this.proinfoajax();

                })
            },
            upload:function () {
                var _this=this;
                var flag = true;
                $('.content-box').scroll(function () {
                    var H = $('.scrolltop')[0].getBoundingClientRect().top;
                    var h = $(window).height();
                    if (H - h < 0 && flag == true) {
                        flag = false;
                        _this.infodata.pageNo++;
                        if (_this.infodata.pageNo > Math.ceil(allpage)) {
                            $.RMLOAD();
                        } else {
                            setTimeout(function () {
                                flag = true;
                            }, 500)
                            _this.proinfoajax();
                            $.ADDLOAD();
                        }
                    }
                })
            },
            layclose:function () {
                var _this=this;
                $('#main').on('click','.cont-btn-no',function () {
                    $('.layer').show();
                })
                $('#main').on('click','.cont-btn-yes',function () {
                    $('.layer2 p i').html('￥'+$(this).parents('.content').attr('data-price'))
                    $('.layer2').show();
                    $('.lay-ok2').attr('data-activid',$(this).attr('data-activid'));
                    $('.lay-ok2').attr('data-parentid',$(this).attr('data-parentid'));
                })
                $('#main').on('click','.layer',function () {
                    $(this).hide();
                })
                $('#main').on('click','.lay-close',function () {
                    $('.layer').hide();
                    $('.layer2').hide();
                })
                $('#main').on('click','.lay-ok',function () {
                    $('.layer').hide();
                })
                $('#main').on('click','.layer2',function () {
                    $(this).hide();
                })
                $('#main').on('click','.lay-close2',function () {
                    $('.layer').hide();
                    $('.layer2').hide();
                })
                $('#main').on('click','.lay-ok2',function (e) {
                    e.stopPropagation();
                    var activid=$(this).attr('data-activid');
                    var parentid=$(this).attr('data-parentid');
                    _this.ParentId=$(this).attr('data-parentid');
                    _this.joinajax(activid,parentid);
                })
            },
            joinajax:function (activid,parentid) {
                var _this=this;
                $.ajax({
                    url:'/Api/v1/MakeUpActivity/Activity/'+activid,
                    dataType:'json',
                    type:'post',
                    data:{
                        activityId:activid,
                        ApplyType:'2',
                        ParentId:parentid
                    }
                }).done(function (rs) {
                    if(rs.returnCode=='200'){
                        if (rs.returnCode == '200') {
                            _this.payid = rs.data.Id;
                            _this.payajax();
                        }
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
                            location.href ='/Html/html/buy/zhocsuccess.html?id='+_this.ParentId;
                        }
                    });

            }
        }
    })
})