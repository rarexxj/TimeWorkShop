$(function () {
    // $.ADDLOAD();
    var id=$.getUrlParam('id');
    new Vue({
        el: '#main',
        data: {
            proinfo: [],
            infodata: {
                activityId:id
            },
            regdata:{
                PhoneNumber:'',
                Password:'123456',
                SmsVerifyCode:'',
                ChannelId:'',
                InvitationCode:'',
                OpenId:'',
                StoreId:'',
                StoreName:''
            },
            shopinfo:[],
            duanxdata:{
                PhoneNumber:'',
                RequestType:'0'
            }

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
                        _this.proinfo = rs.data;
                        $('#orderid').val(id);
                        _this.$nextTick(function () {
                            $.RMLOAD();
                        })

                    }
                })
            },
            layclose:function () {
                $('#main').on('click','.layer',function () {
                    $(this).hide();
                })
                $('#main').on('click','.layer-xx',function () {
                    $(this).hide();
                })
                $('#main').on('click','.lay-close',function () {
                    $('.layer').show();
                })
                $('#main').on('click','.per-xx',function () {
                    $('.layer-xx').show();
                })
                $('#main').on('click','.lay-ok',function () {
                    $('.layer').hide();
                })
                $('#main').on('click','.layer-xxbox',function (ev) {
                    ev.stopPropagation();
                })
            },
            register:function () {
                var _this=this;
                var reg = /^1[3|4|5|7|8]\d{9}$/
                $('#main').on('click','.submit',function () {
                    _this.regdata.PhoneNumber=$('#tel').val();
                    _this.regdata.NickName=$('#name').val();
                    _this.regdata.SmsVerifyCode=$('#yanzm').val();
                    _this.regdata.StoreId=$('#shop-box option:selected').attr('data-id');
                    _this.regdata.StoreName=$('#shop-box option:selected').html();
                    if($('#name').val()==''){
                        $.oppo("请输入姓名", 1);
                        return false;
                    }else if($('#tel').val() ==''){
                        $.oppo("请输入手机号", 1);
                        return false;
                    }else if(!reg.test($('#tel').val())){
                        $.oppo("手机号格式有误", 1);
                        return false;
                    }else if($('#yanzm').val()==''){
                        $.oppo("请输入验证码", 1);
                        return false;
                    }else{
                        $.ajax({
                            url:'/Api/v1/Member',
                            type:'POST',
                            dataType:'json',
                            data:_this.regdata
                        }).done(function (rs) {
                            if(rs.returnCode=='200'){

                            }
                        })
                    }
                })
            },
            shopaddress:function () {
                var _this=this;
                $.ajax({
                    url:'/Api/v1/StoreList/Activity',
                    type:'get',
                    dataType:'json'
                }).done(function (rs) {
                    if(rs.returnCode='200'){
                        _this.shopinfo=rs.data;
                    }
                })
            },
            yanzcode:function () {
                var reg = /^1[3|4|5|7|8]\d{9}$/;
                var _this=this;
                $('#main').on('click','.get',function () {
                    console.log(_this.duanxdata)
                    _this.duanxdata.PhoneNumber=$('#tel').val();
                    if($('#tel').val() ==''){
                        $.oppo("请输入手机号", 1);
                        return false;
                    }else if(!reg.test($('#tel').val())){
                        $.oppo("手机号格式有误", 1);
                        return false;
                    }else{
                        $.ajax({
                            url:'/Api/v1/Member/SendCode',
                            type:'POST',
                            dataType:'json',
                            data:_this.duanxdata
                        }).done(function (rs) {
                            if(rs.returnCode=='200'){
                                CountDown($('.get'));
                                $.oppo('短信验证码已发送',1)
                            }
                        })
                    }
                })
            },
            submit:function () {
                var _this=this;
                $('.faqi').on('click',function () {
                    var TOKEN=localStorage.getItem('qy_loginToken');
                    if(TOKEN){
                        $.checkuser();
                        _this.joinajax();
                        // $('#subimitButton').attr('type','submit');
                        // $('#formid').attr('action','/payment/process/weixin')
                    }else{
                        $('.layer').show();
                    }
                })
            },
            joinajax:function () {
                var _this=this;
                $.ajax({
                    url:'/Api/v1/Activity/'+id+'/Apply',
                    dataType:'json',
                    type:'post',
                    data:{
                        // activityId:id,
                        ApplyType:'0',
                        ParentId:''
                    }
                }).done(function (rs) {
                    if(rs.returnCode=='200'){

                    }
                })

            }
        }
    })
})