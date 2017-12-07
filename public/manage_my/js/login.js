$(function () {
    // $("button[type=submit]").on("click", function (event) {
    //     // 阻止默认点击事件
    //     event.preventDefault();
    //     $.ajax({
    //         url: "/employee/employeeLogin",
    //         data: $("form").serialize(),
    //         type: "post",
    //         success: function (data) {
    //             console.log(data);
    //         }
    //     })
    // })


    // 初始化表单验证插件
    $("form").bootstrapValidator({
        // 右侧图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: '用户名长度必须在3到30之间'
                    },
                    // 用户名错误
                    callback: {
                        message: '用户名错误'
                    }
                }
            },
            // 验证密码
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '用户名长度必须在6到30之间'
                    },
                    // 密码错误
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        // 点击的时候开启进度条
        //开启进度条
        NProgress.start();
        //使用ajax提交逻辑
        // ajax 提交数据
        $.ajax({
            url: "/employee/employeeLogin",
            data: $("form").serialize(),
            type: "post",
            success: function (backData) {
                // console.log(backData);
                // 登录成功的情况
                if (backData.success) {
                    // 跳转页面
                    window.location.href = "./index.html"
                } else {
                    var validator = $("form").data('bootstrapValidator'); //获取表单校验实例
                    // 失败的情况
                    if (backData.error == 1000) {
                        // 用户名错误的情况
                        validator.updateStatus("username", "INVALID", "callback")
                    } else if (backData.error == 1001) {
                        // 密码错误的情况
                        validator.updateStatus("password", "INVALID", "callback")
                    }
                }
                // 计时器
                setInterval(function(){
                    //关闭进度条
                    NProgress.done();
                },1000)
            }
        })
    });

    // 重置
    $("button[type=reset]").on("click", function () {
        var validator = $("form").data('bootstrapValidator'); //获取表单校验实例
        validator.resetForm();
    })
})