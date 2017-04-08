//Taken from: http://jsfiddle.net/JtJ5N/359/


$(window).load(function(){
    $('#startButton').click(blala);
    $('#drop').click(function(){
        console.log('click');      
    });
    //Remove item
    $('.fileCont span').click(function(){
        $(this).remove();
    });
});
if (window.FileReader) {
    var drop;
    addEventHandler(window, 'load', function () {
        var status = document.getElementById('status');
        drop = document.getElementById('drop');
        var list = document.getElementById('list');

        function cancel(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            return false;
        }

        // Tells the browser that we *can* drop on this target
        addEventHandler(drop, 'dragover', cancel);
        addEventHandler(drop, 'dragenter', cancel);

        addEventHandler(drop, 'drop', function (e) {
            e = e || window.event; // get window.event if e argument missing (in IE)   
            if (e.preventDefault) {
                e.preventDefault();
            } // stops the browser from redirecting off to the image.

            var dt = e.dataTransfer;
            var files = dt.files;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var reader = new FileReader();

                //attach event handlers here...

                reader.readAsDataURL(file);
                addEventHandler(reader, 'loadend', function (e, file) {
                    console.log("file:");
                    console.log(file);
                    var bin = this.result;
                    var fileCont = document.createElement('div');
                    fileCont.className = "fileCont";
                    list.appendChild(fileCont);
                                        
                    var fileNumber = list.getElementsByTagName('img').length + 1;
                    status.innerHTML = fileNumber < files.length ? 'Loaded 100% of file ' + fileNumber + ' of ' + files.length + '...' : 'Done loading. processed ' + fileNumber + ' files.';

                    var img = document.createElement("img");
                    img.file = file;
                    img.src = bin;
                    img.className = "thumb";
                    fileCont.appendChild(img);
                    
                    var newFile = document.createElement('div');
                    newFile.innerHTML = file.name;
                    newFile.className = "fileName";
                    fileCont.appendChild(newFile);
                    
                    var fileSize = document.createElement('div');
                    fileSize.className = "fileSize";
                    fileSize.innerHTML = Math.round(file.size/1024) + ' KB';
                    fileCont.appendChild(fileSize);
                    
                    var progress = document.createElement('div');
                    progress.className = "progress";
                    progress.innerHTML = '<div aria-valuemax="100" aria-valuemin="0" aria-valuenow="100" class="progress-bar progress-bar-success" role="progressbar" style="width: 100%"></div>';
                    fileCont.appendChild(progress);
                    
                    var remove = document.createElement('div');
                    remove.className = "remove";
                    remove.innerHTML = '<span class="glyphicon glyphicon-remove"></div>';
                    list.appendChild(remove);
                    
                    
                }.bindToEventHandler(file));
            }
            return false;
        });
        Function.prototype.bindToEventHandler = function bindToEventHandler() {
            var handler = this;
            var boundParameters = Array.prototype.slice.call(arguments);
            //create closure
            return function (e) {
                e = e || window.event; // get window.event if e argument missing (in IE)   
                boundParameters.unshift(e);
                handler.apply(this, boundParameters);
            }
        };
    });
} else {
    document.getElementById('status').innerHTML = 'Your browser does not support the HTML5 FileReader.';
}


function addEventHandler(obj, evt, handler) {
    if (obj.addEventListener) {
        // W3C method
        obj.addEventListener(evt, handler, false);
    } else if (obj.attachEvent) {
        // IE method.
        obj.attachEvent('on' + evt, handler);
    } else {
        // Old school method.
        obj['on' + evt] = handler;
    }
}

//from https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
function blala(){
   
    console.log("button pressed");
    var img = document.createElement("img");
    var ctx = document.getElementById('canvas').getContext("2d");

    var width = $('img').width();
    var height = $('img').height();
    ctx.drawImage(img, 0, 0, width, height);
    var imgData = ctx.createImageData(width, height);
    var data = imgData.data;
    var pixels = ctx.getImageData(0, 0, width, height);    
    for (var i = 0, ii = pixels.data.length; i < ii; i += 4) {
        var r = pixels.data[i + 0];
        var g = pixels.data[i + 1];
        var b = pixels.data[i + 2];
        var hsv =rgb2hsv(r,g,b);
    }            
}


//from https://msdn.microsoft.com/en-us/library/jj203843%28v=vs.85%29.aspx
function rgb2hsv(r, g, b) {
    //  Converts RGB value to HSV value
    var Hue = 0;
    var Sat = 0;
    var Val = 0;

    //  Convert to a percentage
    r = r / 255; g = g / 255; b = b / 255;
    var minRGB = Math.min(r, g, b);
    var maxRGB = Math.max(r, g, b);

    // Check for a grayscale image
    if (minRGB == maxRGB) {
        Val = parseInt((minRGB * 100) + .5); // Round up
        return [Hue, Sat, Val];  
    }
    var d = (r == minRGB) ? g - b : ((b == minRGB) ? r - g : b - r);
    var h = (r == minRGB) ? 3 : ((b == minRGB) ? 1 : 5);
    Hue = parseInt(60 * (h - d / (maxRGB - minRGB)));
    Sat = parseInt((((maxRGB - minRGB) / maxRGB) * 100) + .5);
    Val = parseInt((maxRGB * 100) + .5); // Round up
    return [Hue, Sat, Val];
}

//Not plugged yet
var bar = $('.progress-bar');
$(function(){
  $(bar).each(function(){
    bar_width = $(this).attr('aria-valuenow');
    $(this).width(bar_width + '%');
  });
});

