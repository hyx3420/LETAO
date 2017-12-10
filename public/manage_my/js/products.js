// 入口函数
$(function () {
    var myPage = 1;
    var myPageSize = 5;
    // 声明函数
    function getData() {
        // 一开始就渲染
        $.ajax({
            // 地址
            url: "/product/queryProductDetailList",
            // 参数
            data: {
                page: myPage,
                pageSize: myPageSize
            },
            success: function (backData) {
                console.log(backData);
                // 添加到 tbody 里面
                $("tbody").html(template("products-tmp", backData))
                // 初始化分页
                $(".pagintor").bootstrapPaginator({
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

    // 点击上传图片
    $("#fileUpload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            // console.log(data);
            console.log(data.result.picAddr)
            // 创建 img 标签
            var $img = $('<img style="width:100px" src=' + data.result.picAddr + ' alt="">')
            $("form .form-group:last").append($img);
            // 判断如果 img 的张数有三张
            if ($("form .form-group:last img").length == 3) {
                // 那么就不给添加
                $("form").data('bootstrapValidator').updateStatus('pic1', 'VALID');
            }
        }
    });

    // 如果超过三张
    $("#fileUpload").on("click", function (event) {
        if ($("form .form-group:last img").length == 3) {
            // 阻止默认行为
            event.preventDefault();
        }
    })

    // 双击图片自己杀掉自己
    $("form .form-group:last").on("dblclick", "img", function () {
        $(this).remove();
    })

    // 检验数据不能为空
    //使用表单校验插件
    $("#myForm").bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        // excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            proName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品名称不能为空'
                    },
                }
            },
            proDesc: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品描述不能为空'
                    },
                }
            },
            num: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品库存不能为空'
                    },
                }
            },
            price: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品价格不能为空'
                    },
                }
            },
            oldPrice: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品原价不能为空'
                    },
                }
            },
            size: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品尺码不能为空'
                    },
                }
            },
            pic1: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '图片不能为空'
                    },
                }
            },
        }

    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            // 地址
            url:"/product/addProduct",
            // 参数
            data:$("form").serialize(),
            // 请求方式
            type:"post",
            success:function(backData){
                // 清空数据
                $("form input").val("");
                $("form img").remove();
                $("form textarea").val("");
                // 关闭 模态框
                $(".modal-add").modal("hide");
                // 重置表单
                $("form").data('bootstrapValidator').resetForm();
                // 重新刷新页面
                getData();
                // 直接刷新
                // window.location.href = window.location.href;
            }
        })
    });











})