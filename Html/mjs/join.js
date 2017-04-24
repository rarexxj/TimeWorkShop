$(function () {
    // $.ADDLOAD();
    $.checkuser();
    new Vue({
        el: '#main',
        data: {
            proinfo: [],
            infodata:{
                pageNo:1,
                limit:10,
                status:0
            }

        },
        ready: function () {
            var _this = this;
            _this.proinfoajax();
            _this.navtab();
            _this.upload();
            _this.$nextTick(function () {
            })
        },
        methods: {
            proinfoajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/MyAttendApply/Activity',
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
            }
        }
    })
})