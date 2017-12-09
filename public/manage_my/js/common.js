$(function () {
    // 判断是否登录
    $.ajax({
        url: "/employee/checkRootLogin",
        success: function (data) {
            // 登录失败
            if (data.error == 400) {
                window.location.href = "./login.html"
            }
        }
    })
    
    // 给主体头部的第一个 A 添加点击事件
    $(".lt_main .lt_nav a").first().on("click", function () {
        // 隐藏左边
        $(".lt_aside").toggle();
        $(".lt_main").toggleClass("fullScreen");
    })

    // 给主体头部的第二个 A 添加点击事件
    $(".glyphicon-log-out").on("click", function () {
        // 线束模态框
        $('.modal-sure').modal('show')
    })

    // 点击模态框的确定跳转到首页
    $(".modal .modal-dialog .yes").on("click", function () {
        // 关闭模态框
        $('.modal-sure').modal('hide');
        // 清除登录状态
        $.ajax({
            url: '/employee/employeeLogout',
            success: function (data) {
                console.log(data)
                window.location.href = "./login.html"
            }
        })
        // 跳转
    })

    // 当点击 分类管理的时候
    $(".lt_aside .content ul>li:eq(1)>a").on("click",function(){
        $(".lt_aside .content li ol").slideToggle();
    })

})