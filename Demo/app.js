var app = angular.module('demo', []);

app.directive('hoverzoom', function($compile) {
     return {
        restrict: 'A',
        scope: {
            large_image: '=hoverzoom',
            hzoomHeight: '@hoverzoomheight',
            hzoomWidth:'@hoverzoomwidth'
        },
        link: function (scope,element,attrs) {
           var pos = element.offset();
           scope.zoomX = pos.left+element.width();
           scope.zoomY = pos.top;  
          
           element.after($compile("<div ng-style=\"{'background':'url({{large_image}})','background-position':fpostion,'background-repeat':'none','position':'absolute','top':zoomY,'left':zoomX,'z-index':'99999999','height':hzoomHeight+'px','width':hzoomWidth+'px'}\" ng-if=\"showZoomImage\">")(scope));
  
            element.bind('mousemove', function (evt) {
                  
                   scope.$apply(function(){
                        scope.xpostion = evt.originalEvent.offsetX/element.width()*100;
                        scope.ypostion = evt.originalEvent.offsetY/element.height()*100;
                        scope.fpostion = scope.xpostion+'%'+' '+scope.ypostion+'%';
            

                   });
                

            });
            element.bind('mouseleave', function (evt) {
               scope.$apply(function(){
                  scope.showZoomImage=false;
                });

            });

             element.bind('mouseenter', function (evt) {
              scope.$apply(function(){
                  scope.showZoomImage=true;
                });

            });
        }
    };
});
app.controller('MainCtrl', function($scope) {
  $scope.small_image = 'http://s27.postimg.org/xyoknslhf/blue_bird_wallpaper_small.jpg'
  $scope.large_image = 'http://img6a.flixcart.com/image/jean/h/c/j/262928685black-newport-32-1000x1000-imae8gataggffuy2.jpeg';
 

});

