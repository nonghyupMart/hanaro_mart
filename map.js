module.exports = function () {
  return `
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="map" style="width: 500px; height: 400px;"></div>
    <script
      type="text/javascript"
      src="http://dapi.kakao.com/v2/maps/sdk.js?appkey=9816229b6d78fdf960b13bd9ed734493"
    ></script>
    <script>
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      var map = new kakao.maps.Map(container, options);
    </script>
  </body>
</html>
`;
};
