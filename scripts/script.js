//Script for INTEL Ilustration
//Author Munsif Mulla
//Date : 23/10/2013


var fn = {
    dropDown:function(){
        $(window).click(function(e){
            if(e.target.className=="list" || e.target.className=="roleName" || e.target.className=="dropBtn" && parseInt($('.roles').height(), 10) < 1){
                $('.roles').animate({
                    height:"95px"
                }, 200);
            }
            else{
                $('.roles').animate({
                    height:"0px"
                }, 100);
            }
        });
    },
    selectItem:function(){
        $('.roles li').click(function(){
            $('.list').find('.roleName').text($(this).text())
        });
    },
    showLogout:function(){
        $(window).click(function(e){
//            alert(e.target.className)
            if(e.target.className === 'userName' && parseInt($('.logout').height() ,10) < 1 ){
                $('.userName').css({
                    background:"url('images/dropDown_03.png') no-repeat 90% center #27ae60"
                });
                $('.logout').animate({
                    height:"20px",
                    padding:"5px 15px"
                },200);
            }
            else{
                $('.logout').animate({
                    height:"0px",
                    padding:"0px 15px"
                },200);
                $('.userName').css({
                    background:"url('images/dropDown_03.png') no-repeat 90% center transparent"
                });
            }
        });
    },
    loadHeight:function(){
        $(window).load(function(){
            var getWindowHeight = $(this).height();
            //Set TabHolder Height
//            $('.tabHolder').css("height",parseInt(getWindowHeight, 10)-60);
//            $('.slideHolder').css("height",parseInt(getWindowHeight, 10)-60);
            //set DriveWay Height
//            $('.driveWay').css("height",parseInt(getWindowHeight, 10)-60);
            //Set Car Position
            var carSize = $('.driveWay').find('.car').height();
            $('.driveWay .car').delay(1000).animate({"margin-top":parseInt(getWindowHeight, 10)- (parseInt(carSize ,10)+90)}, 2000);
            $('.driveWay .shade').delay(1000).animate({"margin-top":parseInt(getWindowHeight, 10)- (parseInt(carSize ,10)+100)}, 2000);
        });
    },
    tabSliding:function(){
        $('.tab').click(function(){
            var getDataType = $(this).data("tab_id");
            $('.tabHolder').find('.tab').removeClass('current');
            $(this).addClass('current');
            $('.slideHolder').find('.slide').hide();
            $('.slideHolder').find('[data-slide_id="'+getDataType+'"]').fadeIn();
            $('.slideHolder').tinyscrollbar({ sizethumb: 100,invertscroll:false });
            if(getDataType == "ecoDrive"){
                $('.ecoSettings').show();
            }
            else{
                $('.ecoSettings').hide();
            }
        });
    },
    showTabHolder:function(){
        $('.thumb').click(function(){
            if(parseInt($('.tabHolder').css("margin-left"), 10) < 0){
                $('.tabHolder').animate({"margin-left":"0%"},300)
            }
            else{
                $('.tabHolder').animate({"margin-left":"-40%"},300)
            }
        });
    },
    showWidth:function(){
        alert($(window).width());
    },
    listDrops:function(parentId){
        $(parentId).find('.selected').click(function(){
            var conf = $(parentId).find('ul').height();
            if(conf == 0){
                $(parentId).find('ul').height("auto");
            }
            else{
                $(parentId).find('ul').height("0");
            }
        });
        $(parentId).find('ul li').click(function(){
            $(parentId).find('.selected').html($(this).html());
            $(parentId).find('ul').height("0");
        });
    },
    showPop:function(){
        $('.settingHeader').find('span').click(function(){
            $('.screen').fadeIn();
            $('.tuningPop').fadeIn();
        });
    },

    closePop:function(){
        $('.closePop').click(function(){
            $('.screen').fadeOut();
            $('.tuningPop').fadeOut();
        });
        $('.btnClosePop').click(function(){
            $('.screen').fadeOut();
            $('.tuningPop').fadeOut();
        });
    },

    switch:function(){
        $('.switch').click(function(){
            var getSwitch = $(this).data("switch");
            if(getSwitch == "ON"){
                $(this).animate({
                    marginLeft: "-80px"
                });
                $(this).data("switch","OFF")
            }
            else{
                $(this).animate({
                    marginLeft: "0px"
                });
                $(this).data("switch","ON")
            }
        });

        //Another Switch
        $('.sttngCntrl').click(function(){
            var getSwitch = $(this).data("switch");
            if(getSwitch == "ON"){
                $(this).animate({
                    marginLeft: "-80px"
                });
                $(this).data("switch","OFF")
            }
            else{
                $(this).animate({
                    marginLeft: "0px"
                });
                $(this).data("switch","ON")
            }
        });
    },

    status: "on",
    settingsButton:function(){
        $("#mainWrapper .settingsMain li").click(function(){
                if(fn.status=="on")
                {
                    $(this).find(".sttngCntrl").animate({"left":"-79px"},250)
                    fn.status="off"
                }
                else if(fn.status=="off")
                {
                    $(this).find(".sttngCntrl").animate({"left":"0px"},250)
                    fn.status="on"
                }
            }
        )
    },
    showPassChange:function(){
        $('.changePass').click(function(){
            if($('.newPass').hasClass("animated flipInX flipOutX")){
                $('.newPass').removeClass('animated flipInX flipOutX');
                $('.newPass').show().addClass('animated flipInX');
            }
            else{
                $('.newPass').show().addClass('animated flipInX');
            }
            $('.screen').fadeIn();
        });
    },
    hidePassChange:function(){
        $('.closeChangePass').click(function(){
            if($('.newPass').hasClass("animated flipOutX")){
                $('.newPass').removeClass('animated flipOutX');
                $('.newPass').addClass('animated flipOutX');
            }
            else{
                $('.newPass').addClass('animated flipOutX');
            }
            $('.screen').fadeOut();
        });
    },
    addData:function(){
        $('.payer').find('.driveStats').each(function(key,Item){
            var holder = $(Item).find('.statHolder');
            holder.each(function(key, item){
                alert("times");
                var newValue = $(item).data("newvalue");
                var height = 70;
                var newHeight = parseInt(newValue * height) / 10;
                $(item).find('statGraph');
                $(item).find('.statGraph').css({
                    height:newHeight
                });
            });
        });
    },

    execute:function(){
        fn.dropDown();
        fn.selectItem();
//        fn.showLogout();
        fn.loadHeight();
        fn.tabSliding();
//        fn.showTabHolder();
//        fn.addScroller();

        fn.listDrops('.customerMain');
        fn.listDrops('.ddOne');
        fn.listDrops('.ddTwo');
        fn.listDrops('.bigDD');
        fn.listDrops('.monthDD');
        fn.listDrops('.pointsDD');
        fn.listDrops('.resultDD');
        fn.listDrops('.condDD');
        fn.listDrops('.condDD2');
        fn.listDrops('.condDD3');

        fn.showPop();
        fn.closePop();
//        fn.settingsButton();
        fn.switch();

        fn.showPassChange();
        fn.hidePassChange();

        fn.addData();
    }
}

fn.execute();

//............................. settings...............................

