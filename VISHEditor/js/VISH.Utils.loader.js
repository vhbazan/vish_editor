VISH.Utils.loader = (function(V,undefined){
    
    var libVideos = {};
    var libImages = {};
    
    var getImage = function(imagePath){
        if(libImages[imagePath]){
            return libImages[imagePath];
        }
        else{
            console.log("Error, Image with path " + imagePath +" was not preloaded");
            return null;
        }
    };
    
    var getVideo = function(videoPath){
        if(libVideos[videoPath]){
            return libVideos[videoPath];
        }
        else{
            console.log("Error, Video with path " + videoPath +" was not preloaded");
            return null;
        }
    };
    
    //function to load an image and add it to deferred
    var loadImage = function(src) {
        var deferred, img;
          
        deferred = $.Deferred();
        img = new Image();
        img.onload = function() {
            deferred.resolve();
        };
        img.src = src;
        
        libImages[src] = img;
        return deferred.promise();
    };
    
    
    //function to create a video tag and add it to document body
    var loadVideo = function(videoSrc, videoId) {
      var deferred, v;
      
      deferred = $.Deferred();
      v = document.createElement('video');
      v.setAttribute('id','video'+videoId);
      v.setAttribute('style','display:none');
      v.setAttribute('preload', 'auto');
      v.setAttribute('src',videoSrc);            
      document.body.appendChild(v);
      
      v.addEventListener('loadedmetadata', function() {
        deferred.resolve();
      }, false);
      
      libVideos[videoSrc] = v;
      return deferred.promise();
    };
    

    return {
            getImage        : getImage,
            getVideo        : getVideo,
            loadImage       : loadImage,
            loadVideo       : loadVideo
    };

}) (VISH);