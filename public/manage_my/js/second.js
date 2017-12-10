// 入口函数
$(function () {
    // 声明一个变量记录页数
    var myPage = 1;
    // 声明一个变量记录显示条数
    var myPageSize = 5;
    // 声明一个函数
    function getData() {
        // 二级分类查询
        $.ajax({
            // 地址
            url: "/category/querySecondCategoryPaging",
            // 参数
            data: {
                page: myPage,
                pageSize: myPageSize,
            },
            success: function (backData) {
                // console.log(backData)
                // 添加进入到 tbody
                $("tbody").html(template("second-tmp", backData));
                // 制作分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPage, //当前页
                    totalPages: Math.ceil(backData.total / myPageSize), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        myPage = page;
                        getData();
                    }
                });
            }
        })
    }

    // 默认调用一次
    getData();

    // 初始化 JQ 上传文件
    $("#fileUpload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            //   console.log(data);
            console.log(data.result.picAddr)
            //   把文件添加到 img 上面
            $("form img").attr("src", data.result.picAddr)
            $('input[name="brandLogo"]').val(data.result.picAddr);
            $("#myForm").data('bootstrapValidator').updateStatus("brandLogo", "VALID")
        }
    });

    // 直接渲染数据到一级分类
    $.ajax({
        // 地址
        url: "/category/queryTopCategoryPaging",
        // 参数
        data: {
            page: 1,
            pageSize: 200,
        },
        success: function (backData) {
            console.log(backData);
            // 在循环之前先清空 ul 里面的内容
            $(".dropdown-menu").html("");
            // 不使用模板插件,自己动手  遍历 backData 里面的 rows
            $.each(backData.rows, function (i, n) {
                // 创建 li
                var $li = $("<li><a date-id=" + n.id + " href='javascript:void(0)'>" + n.categoryName + "</a></li>")
                // 添加到 ul 里面
                $(".dropdown-menu").append($li);
            })
        }
    })

    // 当点击 一级分类里面的内容之后 将其显示出来
    $(".dropdown-menu").on("click", "a", function () {
        $(".select-value").html($(this).html())
        // 把 id 传进 input 里面
        $("input[name='categoryId']").val($(this).attr("date-id"));
        $("#myForm").data('bootstrapValidator').updateStatus("categoryId", "VALID")
    })

    //使用表单校验插件
    $('#myForm').bootstrapValidator({
        // 指定验证的input类型
        // ':hidden' 隐藏 ':not(:visible)' 不可见 需要删除
        excluded: [':disabled'],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 检验的字段
        fields: {
            categoryId: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "分类不能为空"
                    }

                }
            },
            brandName: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "分类名不能为空"
                    }
                }
            },
            brandLogo: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        // 把数据发到服务器
        $.ajax({
            url: "/category/addSecondCategory",
            // 参数
            data: $("#myForm").serialize(),
            // 请求方式
            type: "post",
            success: function (backData) {
                // 关闭模态框
                $(".modal-add").modal("hide")
                // 调用函数刷新页面
                // 清空遗留下来的内容
                // getData();
                // $("form input").val("");
                // // 还原文字跟图片
                // $("form img").atte("src",'./images/none.png')
                // $(".select-value").html("请选择");
                window.location.reload();
            }
        })
    });


})