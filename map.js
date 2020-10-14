module.exports = function (location) {
  //   alert(location);
  return `

<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>마커 생성하기</title>
       <style>
      html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
#container {overflow:hidden;height:380px;position:relative; background:black}
#btnRoadview,  #btnMap {position:absolute;top:5px;left:5px;padding:7px 12px;font-size:14px;border: 1px solid #dbdbdb;background-color: #fff;border-radius: 2px;box-shadow: 0 1px 1px rgba(0,0,0,.04);z-index:1;cursor:pointer;}
#btnRoadview:hover,  #btnMap:hover{background-color: #fcfcfc;border: 1px solid #c1c1c1;}
#container.view_map #mapWrapper {z-index: 10;}
#container.view_map #btnMap {display: none;}
#container.view_roadview #mapWrapper {z-index: 0;}
#container.view_roadview #btnRoadview {display: none;}
window, document, body {background:#e8e8e8 !important}
</style>
</head>
<body >
<div id="container" class="view_map" > 
    <div id="mapWrapper" style="width:100%;height:380px;position:relative;">
        <div id="map" style="width:100%;height:100%"></div> <!-- 지도를 표시할 div 입니다 -->
       <input type="button" id="btnRoadview" onclick="roadMap()" title="로드뷰 보기" value="로드뷰"> 
    </div>
     <div id="rvWrapper" style="width:100%;height:300px;position:absolute;top:0;left:0;">
        <div id="roadview" style="height:100%"></div> <!-- 로드뷰를 표시할 div 입니다 -->
        <input type="button" id="btnMap" onclick="toggleMap(true)" title="지도 보기" value="지도">
    </div>
</div>

<script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=e9f25a131ec84e5eb4a6de05086a28b8&libraries=services"></script>
<script>

</script>
<script>

var container = document.getElementById('container'), // 지도와 로드뷰를 감싸고 있는 div 입니다
    mapWrapper = document.getElementById('mapWrapper'), // 지도를 감싸고 있는 div 입니다
    btnRoadview = document.getElementById('btnRoadview'), // 지도 위의 로드뷰 버튼, 클릭하면 지도는 감춰지고 로드뷰가 보입니다 
    btnMap = document.getElementById('btnMap'), // 로드뷰 위의 지도 버튼, 클릭하면 로드뷰는 감춰지고 지도가 보입니다 
    rvContainer = document.getElementById('roadview'), // 로드뷰를 표시할 div 입니다
    mapContainer = document.getElementById('map'); // 지도를 표시할 div 입니다

container.height = window.outerWidth;
mapWrapper.height = window.outerWidth;
mapContainer.height = window.outerWidth;


// 지도와 로드뷰 위에 마커로 표시할 특정 장소의 좌표입니다

// 농협정보시스템 37.464175, 127.036021
      //하나로 마트 양재 37.463030 127.043407
var placePosition =new kakao.maps.LatLng(37.463030, 127.043407);

var mapOption = { 
        center: placePosition, // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// 로드뷰 객체를 생성합니다 
var roadview = new kakao.maps.Roadview(rvContainer);

// 좌표로부터 로드뷰 파노라마 ID를 가져올 로드뷰 클라이언트 객체를 생성합니다 
var rvClient = new kakao.maps.RoadviewClient(); 


// 특정 장소가 잘보이도록 로드뷰의 적절한 시점(ViewPoint)을 설정합니다 
// Wizard를 사용하면 적절한 로드뷰 시점(ViewPoint)값을 쉽게 확인할 수 있습니다
roadview.setViewpoint({
    pan: 321,
    tilt: 0,
    zoom: 0
});

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();



// 주소로 좌표를 검색합니다
geocoder.addressSearch('${location}', function(result, status) {
// alert(status);
    // 정상적으로 검색이 완료됐으면 
     if (status === kakao.maps.services.Status.OK) {

          placePosition = new kakao.maps.LatLng(result[0].y, result[0].x)
    alert(placePosition);
// 마커가 표시될 위치입니다 
var markerPosition  =  placePosition; 

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition,
    map: map
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(placePosition);

}

});


// 로드뷰 초기화가 완료되면 
 kakao.maps.event.addListener(roadview, 'init', function() {
     // 로드뷰에 특정 장소를 표시할 마커를 생성하고 로드뷰 위에 표시합니다 
     var rvMarker = new kakao.maps.Marker({
         position: placePosition,
         map: roadview
     });
 });

// 지도와 로드뷰를 감싸고 있는 div의 class를 변경하여 지도를 숨기거나 보이게 하는 함수입니다 
function toggleMap(active) {
    if (active) {
 // 지도를 감싸고 있는 div의 너비가 100%가 되도록 class를 변경합니다 
        container.className = '';

        // 지도의 크기가 변경되었기 때문에 relayout 함수를 호출합니다
        map.relayout();

        // 지도가 보이도록 지도와 로드뷰를 감싸고 있는 div의 class를 변경합니다
        container.className = "view_map"
         // 지도의 너비가 변경될 때 지도중심을 입력받은 위치(position)로 설정합니다
        map.setCenter(placePosition);
    } else {

        // 지도가 숨겨지도록 지도와 로드뷰를 감싸고 있는 div의 class를 변경합니다
        container.className = "view_roadview"   

         // 지도의 크기가 변경되었기 때문에 relayout 함수를 호출합니다
        map.relayout();

        // 지도의 너비가 변경될 때 지도중심을 입력받은 위치(position)로 설정합니다
        map.setCenter(placePosition);

        // 로드뷰의 위치를 지도 중심으로 설정합니다
        toggleRoadview(map.getCenter());
        // alert(4);
    }
}

// 전달받은 좌표(position)에 가까운 로드뷰의 파노라마 ID를 추출하여
// 로드뷰를 설정하는 함수입니다
function toggleRoadview(position){

    rvClient.getNearestPanoId(placePosition, 500, function(panoId) {

        // 파노라마 ID가 null 이면 로드뷰를 숨깁니다
        if (panoId === null) {
            toggleMap(true);
        } else {
          // panoId로 로드뷰를 설정합니다
            roadview.setPanoId(panoId, placePosition);
        }
    });

}

function roadMap() {
    rvClient.getNearestPanoId(placePosition, 500, function(panoId) {  
        // 37.464175, 127.036021
        // var roadViewUrl = "http://map.kakao.com/?panoid="+panoId;
        // window.open(roadViewUrl);

    //     var a = "method=openURL&value=http://naver.com"; 
       
    // var b = {method:"openURL", url:roadViewUrl};
    //     var event =  JSON.stringify(a);
    //     alert(event);

    //     window.ReactNativeWebView.postMessage(event);

    window.location = 'native://' + JSON.stringify({ 
    functionName : 'openURL', value : 'http://naver.com' 
});
        
    });
}

</script>
</body>
</html>
`;
};
