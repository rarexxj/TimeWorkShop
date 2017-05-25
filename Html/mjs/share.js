$(function () {
    var id = $.getUrlParam('id');
    $.checkuser();
    $.ADDLOAD();
    new Vue({
        el: '#box',
        data: {
            info: [],
            joininfo: [],
            joindata: {
                parentId: id
            },
            endtime: '',
            parentId: id,
            activityId: '',
            ApplyNum: '',
            csNum: ''

        },
        ready: function () {
            var _this = this;
            _this.infoajax();
            _this.$nextTick(function () {
            })
        },
        methods: {
            infoajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/GetMemberList/Activity',
                    type: 'get',
                    dataType: 'json',
                    data: _this.joindata
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.info = rs.data;
                        _this.activityId = rs.data.Activity.Id;
                        _this.ApplyNum = rs.data.Activity.ApplyNum;
                        _this.csNum = rs.data.AttendMember.length;
                        _this.csalNum = _this.ApplyNum - _this.csNum;
                        for (var i = 0; i < _this.csalNum; i++) {
                            $('.join-peo').append("<li class='join-tox'></li>")
                        }
                        _this.endtime = rs.data.Activity.EndTime;
                        _this.$nextTick(function () {
                            _this.swipe();
                            _this.link();
                            _this.countDown(_this.endtime.toString().replace(/-/g, "/"), '.time-b');
                            $.RMLOAD();
                        })

                    }
                })
            },
            //banner滚动
            swipe: function () {
                new Swiper('.swiper-container', {
                    direction: 'horizontal',
                    loop: true,
                    paginationClickable: true,
                    autoplay: 2500,
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    grabCursor: true,
                    autoplayDisableOnInteraction: false,
                    // 如果需要分页器
                    pagination: '.swiper-pagination'
                })
            },
            countDown: function (time, id) {
                var btn = true;
                var day_elem = $(id).find('.day');
                var hour_elem = $(id).find('.hour');
                var minute_elem = $(id).find('.mini');
                var second_elem = $(id).find('.sec');
                var end_time = new Date(time).getTime(), //月份是实际月份-1
                    sys_second = (end_time - new Date().getTime()) / 1000;
                if (btn) {
                    var day = Math.floor((sys_second / 3600) / 24);
                    var hour = Math.floor((sys_second / 3600) % 24);
                    var minute = Math.floor((sys_second / 60) % 60);
                    var second = Math.floor(sys_second % 60);
                    $(day_elem).html(day <= 0 ? "0" : day); //计算天
                    $(hour_elem).html(hour < 10 ? "0" + hour : hour); //计算小时
                    $(minute_elem).html(minute < 10 ? "0" + minute : minute); //计算分钟
                    $(second_elem).html(second < 10 ? "0" + second : second); //计算秒杀

                    var index = setInterval(function () {
                        if (sys_second > 0) {
                            sys_second = sys_second - 1;
                            var day = Math.floor((sys_second / 3600) / 24);
                            var hour = Math.floor((sys_second / 3600) % 24);
                            var minute = Math.floor((sys_second / 60) % 60);
                            var second = Math.floor(sys_second % 60);
                            $(day_elem).html(day <= 0 ? "0" : day); //计算小时
                            $(hour_elem).html(hour < 10 ? "0" + hour : hour); //计算小时
                            $(minute_elem).html(minute < 10 ? "0" + minute : minute); //计算分钟
                            $(second_elem).html(second < 10 ? "0" + second : second); //计算秒杀
                        } else {
                            clearInterval(index);
                            $(day_elem).html(0); //计算小时
                            $(hour_elem).html(0); //计算小时
                            $(minute_elem).html(0); //计算分钟
                            $(second_elem).html(0); //计算秒杀
                            // ajaxs()
                            return; //停止下面代码执行
                        }
                    }, 1000)
                }
                btn = false;
            },
            link: function () {
                var _this = this;
                $('.zhongc').on('click', function () {
                    window.location.href = '/Html/html/buy/helpzhoc.html?id=' + _this.info.Activity.Id + '&vid=' + _this.joindata.parentId;
                })
                $('.faqi').on('click', function () {
                    window.location.href = '/Html/html/buy/buy.html?id=' + _this.info.Activity.Id;
                })

            }

        }
    })
})