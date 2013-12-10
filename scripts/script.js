//Script for INTEL Ilustration
//Author Munsif Mulla
//Date : 23/10/2013


var fn = {
    dropDown:function(){
        $(window).click(function(e){
//            alert(e.target.className);
            if((e.target.className=="list" || e.target.className=="roleName" || e.target.className=="list fuelPump" || e.target.className=="dropBtn") && (parseInt($('.roles').height(), 10) < 1)){
                $('.roles').css({
                    height:"auto"
                });
            }
            else{
                $('.roles').css({
                    height:"0px"
                });
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
            //Tiny Scroller
            $('.slideHolder').tinyscrollbar({ sizethumb: 100,invertscroll:false });

            //Toggleing Score Holder
            switch(getDataType){
                case 'ecoDrive':
                    $('.mainScoreHolder').hide();
                    $('.mainScoreHolder.ecoDrive').show();
                    break;
                default :
                    $('.mainScoreHolder').hide();
                    $('.mainScoreHolder.general').show();
            };
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
            var getSwitch = $(this).data("switched");
            if(getSwitch == "ON"){
                $(this).animate({
                    marginLeft: "-80px"
                });
                $(this).data("switched","OFF")
            }
            else{
                $(this).animate({
                    marginLeft: "0px"
                });
                $(this).data("switched","ON")
            }
        });

        //Another Switch
        $('.sttngCntrl').click(function(){
            var getSwitch = $(this).data("switched");

            var switchCase = $(this).data("switchtype");
            if(switchCase == "insurance"){
            //Show or hide Insurance thing
                if( $(this).data("switchcase") == "optin"){
                    $('.appSetting').find('[data-settingitem="insurance"]').slideDown();
                }
                else{
                    $('.appSetting').find('[data-settingitem="insurance"]').slideUp();
                }
            }
            //Switching ON an OFF
            if(getSwitch == "ON"){
                $(this).animate({
                    marginLeft: "-140px"
                });
                $(this).data("switched","OFF")
                $(this).data("switchcase","optout")
            }
            else{
                $(this).animate({
                    marginLeft: "0px"
                });
                $(this).data("switched","ON")
                $(this).data("switchcase","optin")
            }
            fn.hidePassChange('alert');
        });

        $('.sttngCntrl').each(function(key, item){
            var getSwitch = $(this).data("switched");
//            alert(item);
            //Switching ON an OFF
            if(getSwitch == "ON"){
                $(this).animate({
                    marginLeft: "-140px"
                });
                $(this).data("switched","OFF")
                $(this).data("switchcase","optout")
            }
            else{
                $(this).animate({
                    marginLeft: "0px"
                });
                $(this).data("switched","ON")
                $(this).data("switchcase","optin")
            }
        });
    },

    submitInsirance:function(){
        $('[data-insurance="submit"]').click(function(){
            $('[data-alertbox="alert"]').addClass("hello");
            if($('[data-alertbox="alert"]').hasClass("animated flipInX flipOutX")){
                $('[data-alertbox="alert"]').removeClass('animated flipInX flipOutX');
                $('[data-alertbox="alert"]').show().addClass('animated flipInX');
            }
            else{
                $('[data-alertbox="alert"]').show().addClass('animated flipInX');
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
            if($('[data-alertbox="passcahange"]').hasClass("animated flipInX flipOutX")){
                $('[data-alertbox="passcahange"]').removeClass('animated flipInX flipOutX');
                $('[data-alertbox="passcahange"]').show().addClass('animated flipInX');
            }
            else{
                $('[data-alertbox="passcahange"]').show().addClass('animated flipInX');
            }
            $('.screen').fadeIn();
        });
    },
    hidePassChange:function(param){
        $('.closeChangePass').click(function(){
            switch(param){
                case 'changePass':
                    if($('[data-alertbox="passcahange"]').hasClass("animated flipOutX")){
                        $('[data-alertbox="passcahange"]').removeClass('animated flipOutX');
                        $('[data-alertbox="passcahange"]').addClass('animated flipOutX');
                    }
                    else{
                        $('[data-alertbox="passcahange"]').addClass('animated flipOutX');
                    }
                    $('.screen').fadeOut();
                    return false;
                    break;
                case 'alert':
                    if($('[data-alertbox="alert"]').hasClass("animated flipOutX")){
                        $('[data-alertbox="alert"]').removeClass('animated flipOutX');
                        $('[data-alertbox="alert"]').addClass('animated flipOutX');
                    }
                    else{
                        $('[data-alertbox="alert"]').addClass('animated flipOutX');
                    }
                    $('.screen').fadeOut();
                    return false;
                    break;
            }

        });
    },
    addData:function(){
        $('.payer').find('.driveStats').each(function(key,Item){
            var holder = $(Item).find('.statHolder');
            holder.each(function(key, item){
//                alert("times");
                var newValue = $(item).data("newvalue");
                var height = 340;
                var newHeight = parseInt(newValue * height) / 10;
                $(item).find('statGraph');
                $(item).find('.statGraph').css({
//                    height:newHeight
                    width:newHeight
                });
                var statItem = $(item).find('.statGraph');
                function inRange(start, end, value) {
                    if (value <= end && value >= start)
                        return value;
                }
                switch(newValue){
                        case inRange(0,3, newValue):
                        statItem.css("background","#d83030");
                        break;
                    case inRange(3,6,newValue ):
                        statItem.css("background","#e08827");
                        break;
                    case inRange(6,8, newValue):
                        statItem.css("background","#58bc40");
                        break;
                    case inRange(8,11, newValue):
                        statItem.css("background","#259dc0");
                        break;
                }
            });
        });
    },
    rateBunks:function(){
//        $.fn.raty.defaults.path = 'http://localhost/intelFiles/scripts/img';
        $.fn.raty.defaults.path = 'http://fdrive.in/intel/scripts/img';
        $('.starRating').raty({
//            readOnly:true,
            scoreName:  'entity.score',
            number:5,
            half: true,
            score:3,
            width:120
        });
    },
    closeLargeMap:function(){
        $('.closeLargeMap').live('click', function(){
            $('.mainLarge').fadeOut();
        });
    },

//    Graph Details
    showDetails:function(){
        $('.graphItem').hover(function(e){
            $(this).find('.graphDetails')
                .show()
                .css({
                    left: e.pageX+"px",
                    top: e.pageY+"px"
                });
                console.log(e.clientX, e.clientY);
        },
        function(){
            $(this).find('.graphDetails').hide();
        });
        $('.graphItem').mousemove(function(e){
            $(this).find('.graphDetails')
                .css({
                    left: e.pageX-500+"px",
                    top: e.pageY-500+"px"
                });
            console.log(e.clientX, e.clientY);
        });
    },
    toggleGraph:function(){
        $('.toggleSwitch').click(function(){
            var getStatus = $(this).data("status");
            if(getStatus == "weekly"){
                $('.toggleSwitch').find('.switchHolder').animate({
                    marginLeft:'-75px'
                });
                $('.mainGraphOverview').animate({
                    marginLeft:'-542px'
                });
                $('.toggleSwitch').data("status","monthly");
            }
            else{
                $('.toggleSwitch').find('.switchHolder').animate({
                    marginLeft:'0px'
                });
                $('.mainGraphOverview').animate({
                    marginLeft:'0px'
                });
                $('.toggleSwitch').data("status","weekly")
            }
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
        fn.hidePassChange('changePass');
        fn.addData();
        fn.submitInsirance();

        fn.rateBunks();

        //Graph Details
//        fn.showDetails();
        fn.toggleGraph();
    }
}

fn.execute();

//............................. settings...............................

