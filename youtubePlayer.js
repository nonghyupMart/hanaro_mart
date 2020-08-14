module.exports = function (videoId) {
  return `
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
    window,document,body,iframe {
padding:0;
margin:0;
border:0;

    }
    </style>
</head>
<body><iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ></iframe></body>
</html>
`;
};
