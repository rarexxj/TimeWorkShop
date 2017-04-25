jQuery(function ($) {
    var loadTable = $('#ActivityTypeTable').dataTable({
        "processing": true,
        "serverSide": true,
        "sorting": [[3, "desc"]],
        "ajax": url_loadPage,
        "aoColumns":
        [
            { "mData": "RealName", 'sClass': 'left', "orderable": false },
            { "mData": "PhoneNumber", 'sClass': 'left', "orderable": false },
            {
                "mData": "ApplyTime", 'sClass': 'left', "mRender": function (data, type, full) {
                    if (data != null && data.length > 0) {
                        return eval('new ' + data.replace(/\//g, '')).Format("yyyy-MM-dd hh:mm");
                    }
                    return "";
                }
            },
            {
                "mData": "ApplyType", 'sClass': 'center', "mRender": function (data, type, full) {
                    switch (full.ApplyType) {
                        case 1:
                            return "<span class='btn-warning'>参与</span>";
                            break;
                        case 2:
                            return "<span class='btn-success'>补齐</span>";
                            break;
                        default:
                            return "<span class='btn-danger'>发起</span>";
                            break;
                    }
                }
            },
            {
                "mData": "PayStatus", 'sClass': 'center', "orderable": false, "mRender": function (data, type, full) {
                    switch (full.PayStatus) {
                        case 1:
                            return "<span class='btn-warning'>支付中</span>";
                            break;
                        case 2:
                            return "<span class='btn-success'>已支付</span>";
                            break;
                        default:
                            return "<span class='btn-danger'>未付款</span>";
                            break;
                    }
                }
            },
            {
                "mData": "Status", 'sClass': 'center', "orderable": false, "mRender": function (data, type, full) {
                    switch (full.Status) {
                        case 1:
                            return "<span class='btn-success'>已集齐</span>";
                            break;
                        case 2:
                            return "<span class='btn-success'>已补齐</span>";
                            break;
                        case 3:
                            return "<span class='btn-warning'>失败</span>";
                            break;
                        default:
                            return "<span class='btn-danger'>未集齐</span>";
                            break;
                    }
                }
            },
            { "mData": "RedeemCode", 'sClass': 'center', "orderable": false },
            {
                "mData": "PrizeStatus", 'sClass': 'center', "orderable": false, "mRender": function (data, type, full) {
                    if (full.PrizeStatus == 1) {
                        return "span class='btn-danger'>已兑奖</span>";
                    } else {
                        return "<span class='btn-success'>未兑奖</span>";
                    }
                }
            },
            {
                "mData": "Id", 'sClass': 'left', 'orderable': false, 'mRender': function (data, type, full) {
                    var render = "";
                    if (full.PrizeStatus == 0 && (full.Status == 1 || full.Status == 2)) {
                        render += '<a class="green" class="prize" data-id="' + full.Id + '" href="javascript:void(0);" title="兑奖"><i class="icon-ok bigger-130"></i></a>';
                    }
                    return render;
                }
            }
        ]
    });

    //
    $('#ActivityTypeTable').on("click", ".prize", function (e) {
        var id = $(this).data("id");
        var url = url_prize;
        $.ajax({
            type: "patch",
            url: url,
            data: { "applyId": id }
        }).done(function (rs) {
            if (rs.Success) {
                $('#ActivityTypeTable').dataTable().fnDraw();
            } else {
                bntToolkit.error(rs.ErrorMessage);
            }
        });
    });
});