/**
 * Created by hxsd on 2017/2/15.
 */
$(function(){
    //-------------------全部分类
    var timer_u;
    $('.nav_left').on('mouseover',function(){
        $('.nav_menu ul').css('display','block');
    });
    $('.nav_left').on('mouseout',function(){
        timer_u=setTimeout(function(){
            $('.nav_menu ul').hide();
        },100)
    });
    $('.nav_menu ul').on('mouseenter',function(){
        clearTimeout(timer_u);
    })
    $('.nav_menu ul').on('mouseleave',function(){
        timer_u=setTimeout(function(){
            $('.nav_menu ul li').siblings().children().removeClass('active');
            $(this).hide();
        },100)
    });
    var timer;
    $('.nav_menu ul li').each(function(){
        $(this).on('mouseover',function(){
            clearTimeout(timer);
            $(this).children().addClass('active').parent().siblings().children().removeClass('active');
            $('.menu_count').css('display','block');
            $('.section').eq($(this).index()).show().siblings().hide();
        });
        $(this).on('mouseout',function(){
            timer=setTimeout(function(){
                $(this).siblings().children().removeClass('active');
                $('.menu_count').css('display','none');
                $('.nav_menu ul').css('display','none');
            },100);
        });
        $('.menu_count').on('mouseenter',function(){
            clearTimeout(timer);
            clearTimeout(timer_u);
        });
        $('.menu_count').on('mouseleave',function(){

            timer=setTimeout(function(){
                $('.menu_count').css('display','none');
                $('.nav_menu ul').css('display','none');
                $('.nav_menu ul li').siblings().children().removeClass('active');
            },100);
        });
    });
    //-------------------banner区域
    //  第一步:鼠标点击ol里li时,切换轮播图
    var n=0;
    $('.banner ol li').on('click',function(){
        $(this).addClass('ac').siblings().removeClass('ac');
        $('.banner ul li').eq($(this).index()).fadeIn().siblings().fadeOut();
        n=$(this).index();
    })
    //第二步:鼠标进入banner区域时,让左右按钮显示和隐藏
    $('.banner').on('mouseenter',function(){
        clearInterval(timer_b);
        $('.b_btn').fadeIn();
    })
    $('.banner').on('mouseleave',function(){
        auto_play();
        $('.b_btn').fadeOut();
    })
    //第三步:网页打开时,自动播放
    var timer_b;
    var step=$('.banner ol li').length;
    function auto_play(){
        timer_b=setInterval(function(){
            n++;
            if(n==step) n=0;
            $('.banner ol li').eq(n).trigger('click');
        },1500)
    }
    auto_play();
    //第四步:点击左右按钮,切换图片
    $('.b_btn:first').on('click',function(){
        n--;
        if(n<0) n=0;
        $('.banner ol li').eq(n).trigger('click')
    });
    $('.b_btn:last').on('click',function(){
        n++;
        if(n>=step) n=step-1;
        $('.banner ol li').eq(n).trigger('click')
    })
    //-------------------热卖商品的小模态层
    $('.show_p').each(function(i){
        $(this).on('mouseover',function(){
            $('.l_model').eq(i).css({'bottom':'0'})
        });
        $(this).on('mouseout',function(){
            $('.l_model').eq(i).css({'bottom':'-55px'})
        })
    })

    //-------------------侧菜单中的分类
    var timer_c;
    $('.cate_menu ul li').each(function(){
        $(this).on('mouseover',function(){
            clearTimeout(timer_c)
            $(this).children().addClass('active').parent().siblings().children().removeClass('active');
            $('.menu_c').show();
            $('.section1').eq($(this).index()).show().siblings().hide();
        });
        $(this).on('mouseout',function(){
            timer_c=setTimeout(function(){
                $('.cate_menu ul li').siblings().children().removeClass('active');
                $('.menu_c').hide();
            },100)
        });
        $('.menu_c').on('mouseenter',function(){
            clearTimeout(timer_c)
        });
        $('.menu_c').on('mouseleave',function(){
            $('.menu_c').hide();
            $('.cate_menu ul li').siblings().children().removeClass('active');
        });
    });

    //-------------------窗口滚动时,侧菜单跟着滚动
    var offtop=$('.slide').offset().top;
    $(window).on('scroll',function(){
        var scrolltop=$(this).scrollTop();
        var a=scrolltop-offtop;
        if(scrolltop>offtop){
            $('.slide').stop().animate({
                top: scrolltop-offtop
            },100)
        }else {
            $('.slide').stop().animate({
                top: 0
            },100)
        }
        //console.log("offset:"+offtop,"scroll:"+scrolltop,'a:'+a)
    });
    //-------------------验证码

    var code;
    function createCode()
    {
        code = "";
        var codeLength = 4; //验证码的长度
        var checkCode = document.getElementsByClassName("yanzheng")[0]
        var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
        for(var i = 0; i < codeLength; i++)
        {
            var charNum = Math.floor(Math.random() * 52);
            code += codeChars[charNum];
        }
        if(checkCode)
        {
            checkCode.className = "yanzheng";
            checkCode.innerHTML = code;
        }
    }
    createCode()
    $('.yanzheng').on("click",function(){
        createCode()
    });
    $('#Yz').on("click",function(){
        createCode()
    });

    //-------------------登录和注册里面的tab

    $('.tabList ul li').each(function(){
        $(this).on('click',function(){
            $(this).addClass('logi').siblings().removeClass('logi');
            $('.login_con').eq($(this).index()).show().siblings().hide()
        })
    });

//    商品详情页里面的图片

   $('.con_mid li').each(function(){
       //移入小图,让主图与放大的图一起变换
      $(this).on('mouseover',function(){
          $(this).addClass('ac').siblings().removeClass('ac');
          $('.con_top li').eq($(this).index()).show().siblings().hide();
          $('.pro_hidden li').eq($(this).index()).show().siblings().hide();
      })
    //进入主图时,span出现,还有放大的图出现
       $('.con_top').on('mouseenter',function(){
           $(this).find('span').show();
           $('.pro_hidden').show();
           $(document).on('mousemove',function(e){
               var scroll_top=$('html body').scrollTop();
               var l= e.clientX-$('.content').offset().left-$('.con_top span').width()/2;
               var t= e.clientY-$('.content').offset().top-$('.con_top span').height()/2+scroll_top;
               if(l<0) l=0;
               if(t<0) t=0;
               if(l>$('.con_top').width()-$('.con_top span').width()){
                   l=$('.con_top').width()-$('.con_top span').width()
               }
               if(t>$('.con_top').height()-$('.con_top span').height()){
                   t=$('.con_top').height()-$('.con_top span').height()
               }
               $('.con_top span').css({'left':l,'top':t});

               var rateX=l/($('.con_top').width()-$('.con_top span').width());
               var rateY=t/($('.con_top').height()-$('.con_top span').height());
                console.log(rateX)
               var X=$('.pro_hidden li').find('img').width()- $('.pro_hidden').width();
               var Y=$('.pro_hidden li').find('img').height()- $('.pro_hidden').height();
               //  放大后的图片的坐标
               $('.pro_hidden li').find('img').css({'left':rateX*X,'top':rateY*Y})
           })
           $(this).on('mouseleave',function(){
               $(this).find('span').hide();
               $('.pro_hidden').hide();
           })
       })






   })


});