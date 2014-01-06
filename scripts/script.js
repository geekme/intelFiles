//Script for INTEL Ilustration
//Author Munsif Mulla
//Date : 23/10/2013

var planCoordinates = [];
var count = 0;
var myLatlngCen, map;
function mapData(item, state) {
    var locationData;
    switch(state){
        case 'first':
            locationData=$(item).data("coordinates");
            break;
        case 'pop':
            locationData=$(item).parent().find('.largeMap').data("coordinates");
            break;
    }
    var coordinatesNew = locationData.split("|");

    for (i = 0; i < coordinatesNew.length; i++) {
        var point = new google.maps.LatLng(coordinatesNew[i].split(',')[0], coordinatesNew[i].split(',')[1]);

        planCoordinates.push(point);
        console.log(planCoordinates);
    }
    myLatlngCen = planCoordinates[0];
    var myLatlngStart = planCoordinates[0];
    var myLatlngEnd = planCoordinates[planCoordinates.length - 1];

    var mapOptions = {
        zoom: 1,
        center: myLatlngCen,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map($(item)[0], mapOptions);

    var markerStart = new google.maps.Marker({
        position: myLatlngStart,
        map: map
    });

    var markerEnd = new google.maps.Marker({
        position: myLatlngEnd,
        map: map
    });
    var flightPath = new google.maps.Polyline({
        path: planCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

//            flightPath.setMap(map);
//            google.maps.event.addEventListener(map,'click',flightPath)
    // Listen Click Event to draw Polygon
//            google.maps.event.addListener(map, 'click', function(event) {
//                planCoordinates[count] = event.latLng;
////                createPolyline(planCoordinates);
//                alert(event.latLng);
//                count++;
//            });
}
function createPolyline(polyC){
    Path = new google.maps.Polygon({
        path: polyC,
        strokeColor: 'red',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor:'lightblue',
        fillOpacity:0.4
    });
    Path.setMap(map);
}
function connectPoints()
{
    var point_add = []; // initialize an array
    var start = planCoordinates[0]; // storing start point
    var end = planCoordinates[(planCoordinates.length-1)]; // storing end point
    // pushing start and end point to an array
    point_add.push(start);
    point_add.push(end);
    createPolyline(point_add); // function to join points

}
function initialize() {
    $('.geoFencer').each(function () {
        var item = $(this);
        mapData(item, "first");
        createPolyline(planCoordinates);
    });
}
function reinitialize() {
    $('.large').each(function () {
        var item = $(this);
        mapData(item, "first");
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

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
                case 'geoFence':
//                    google.maps.event.addDomListener(window, 'load', initialize);
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
        //Pre change
        $('.sttngCntrl').each(function(key, item){
            var getSwitch = $(this).data("switched");
            var switchCase = $(this).data("switchtype");
//            alert(item);
            //Switching ON an OFF
            switch(switchCase){
                case 'insurance':
                    if ($(item).data("switchcase") == "optout") {
                        $(this).animate({
                            marginLeft: "-140px"
                        });
                        $(this).data("switched","OFF")
                        $('.appSetting').find('[data-settingitem="insurance"]').slideDown();
                        $(item).data("switchcase","optin")
                    }
                    break;
                default:
                    if(getSwitch == "ON"){
                        $(this).animate({
                            marginLeft: "-140px"
                        });
                        $(this).data("switched","OFF")
                        $(this).data("switchcase","optout");
                    }
                    else{
                        $(this).animate({
                            marginLeft: "0px"
                        });
                        $(this).data("switched","ON")
                        $(this).data("switchcase","optin")
                    }
            }

        });
        // Click change
        $('.switch').live('click',function(){
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
        $('.sttngCntrl').live('click',function(){
            var getSwitch = $(this).data("switched");
            var switchCase = $(this).data("switchtype");

            switch(switchCase) {
                case "insurance":
                    if (getSwitch == "ON") {
                        $(this).animate({
                            marginLeft: "-140px"
                        });
                        $(this).data("switched", "OFF")
                        $(this).data("switchcase", "optout");
                        $('.appSetting').find('[data-settingitem="insurance"]').slideDown();
                    }
                    else {
                        $(this).animate({
                            marginLeft: "0px"
                        });
                        $(this).data("switched", "ON")
                        $(this).data("switchcase", "optin");
                        $('.appSetting').find('[data-settingitem="insurance"]').slideUp();
                    }
                    fn.hidePassChange('alert');

                    break;
                default:
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
        $('.graphArea').hover(function(e){
            $('.graphDetails')
                .show()
                .css({
                    left: e.pageX+"px",
                    top: e.pageY-120+"px"
                });
        },
        function(){
            $('.graphDetails').hide();
        });
        $('.graphArea').mousemove(function(e){
            $('.graphDetails')
                .css({
                    left: e.pageX+"px",
                    top: e.pageY-120+"px"
                });
        });
    },
    toggleGraph:function(){
        $('.toggleSwitch').click(function(){
            var getStatus = $(this).data("status");
            if(getStatus == "weekly"){
                $('.toggleSwitch').find('.switches.weekly').css({
                    color:'#3498db'
                });
                $('.toggleSwitch').find('.switches.monthly').css({
                    color:'#ffffff'
                });
                $('.toggleSwitch').find('.bgColor').animate({
                    marginLeft:"77px"
                });
                $('.mainGraphOverview').animate({
                    marginLeft:'-542px'
                });
                $('.toggleSwitch').data("status","monthly");
            }
            else{
                $('.toggleSwitch').find('.switches.monthly').css({
                    color:'#3498db'
                });
                $('.toggleSwitch').find('.switches.weekly').css({
                    color:'#ffffff'
                });
                $('.toggleSwitch').find('.bgColor').animate({
                    marginLeft:"0px"
                });
                $('.mainGraphOverview').animate({
                    marginLeft:'0px'
                });
                $('.toggleSwitch').data("status","weekly")
            }
        });
    },
    ecoDriveTabs:function(){
        //Weekly change
        $('.weeklyTabs').find('.ecoTab').click(function(){
            var tab = $(this).data("ecotab");

            switch(tab){
                case 'hardBreaking':
                    $('.weeklyTabs').find('.ecoTab').removeClass("hover");
                    $(this).addClass("hover");
                    $('.graphOverview.weekly').animate({
                        marginTop:'-240px'
                    }, 'slow','easeOutBack');
                    break;
                case 'hardAccel':
                    $('.weeklyTabs').find('.ecoTab').removeClass("hover");
                    $(this).addClass("hover");
                    $('.graphOverview.weekly').animate({
                        marginTop:'0px'
                    },'slow','easeOutBack');
                    break;
                case 'incorGear':
                    $('.weeklyTabs').find('.ecoTab').removeClass("hover");
                    $(this).addClass("hover");
                    $('.graphOverview.weekly').animate({
                        marginTop:'-480px'
                    },'slow','easeOutBack');
                    break;
                case 'idleTime':
                    $('.weeklyTabs').find('.ecoTab').removeClass("hover");
                    $(this).addClass("hover");
                    $('.graphOverview.weekly').animate({
                        marginTop:'-710px'
                    },'slow','easeOutBack');
                    break;
                case 'fuelMile':
                    $('.weeklyTabs').find('.ecoTab').removeClass("hover");
                    $(this).addClass("hover");
                    $('.graphOverview.weekly').animate({
                        marginTop:'-950px'
                    },'slow','easeOutBack');
                    break;
            }
        });
        //Monthly
        $('.monthlyTabs').find('.ecoTab').click(function(){
            var tab = $(this).data("ecotab");

            switch(tab){
                case 'hardBreaking':
                    $('.monthlyTabs').find('.ecoTab').removeClass("hover");
                    $(this).addClass("hover");
                    $('.graphOverview.monthly').animate({
                        marginTop:'-240px'
                    }, 'slow','easeOutBack');
                    break;
                case 'hardAccel':
                    $('.monthlyTabs').find('.ecoTab').removeClass("hover");
                    $(this).addClass("hover");
                    $('.graphOverview.monthly').animate({
                        marginTop:'0px'
                    },'slow','easeOutBack');
                    break;
                case 'incorGear':
                    $('.monthlyTabs').find('.ecoTab').removeClass("hover");
                    $(this).addClass("hover");
                    $('.graphOverview.monthly').animate({
                        marginTop:'-480px'
                    },'slow','easeOutBack');
                    break;
                case 'idleTime':
                    $('.monthlyTabs').find('.ecoTab').removeClass("hover");
                    $(this).addClass("hover");
                    $('.graphOverview.monthly').animate({
                        marginTop:'-710px'
                    },'slow','easeOutBack');
                    break;
                case 'fuelMile':
                    $('.monthlyTabs').find('.ecoTab').removeClass("hover");
                    $(this).addClass("hover");
                    $('.graphOverview.monthly').animate({
                        marginTop:'-950px'
                    },'slow','easeOutBack');
                    break;
            }
        });
    },

    weeklyGraph:function(){
        var s3 = [2, 6, 7, 10, 4,3,8];
        var ticks = ['Su', 'Mo', 'Tu', 'We','Th','F','Sa'];
        $('.weeklyGraph').jqplot([s3], {
            // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
            animate: !$.jqplot.use_excanvas,
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: true }
            },
            grid: {
                background: 'rgba(57,57,57,0.0)',
                drawBorder: false,
                shadow: false,
                gridLineColor: '#eaeaea',
                gridLineWidth: 1
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                }
            },
            highlighter: { show: false }
        });
    },
    monthlyGraph:function(){
        var s1 = [3,5,7,4,8,3,9,3,2,7,9,3,5,6,7,8,2,8,2,4,0,9,3,5,6,7,8,2,4,0];
        var ticksx = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'];
        var ticksy = ['0','1','2','3','4','5','6','7','8','9','10'];
        var s2 = [[2002, 10200], [2003, 10800], [2004, 11200], [2005, 11800], [2006, 12400],
            [2007, 12800], [2008, 13200], [2009, 12600], [2010, 13100]];
        $('.monthlyGraph').jqplot([s1], {
            animate: true,
            seriesDefaults: {
                rendererOptions: {
                    smooth: true,
                    animation: {
                        show: true
                    }
                },
                showMarker: false
            },
            seriesStyles: {
                color: "red",
                lineWidth: 3,
                markerOptions: {
                    show: false
                }
            },
            axes: {
                xaxis: {
                    ticks: ticksx
                },
                yaxis: {
                    ticks: ticksy
                }
            },
            grid: {
                background: 'rgba(57,57,57,0.0)',
                drawBorder: false,
                shadow: false,
                gridLineColor: '#eaeaea',
                gridLineWidth: 1
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
        fn.showDetails();
        fn.toggleGraph();

        //Graph Tabs
        fn.ecoDriveTabs();
        //Weekly Graph
        fn.weeklyGraph();
        //Monthly Graph
        fn.monthlyGraph();
    }
}

fn.execute();

//............................. settings...............................

