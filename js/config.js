requirejs.config({
    baseUrl:'js/lib',
    paths:{
        'jquery':'jquery',
        'app':'../app',
        'com':'../common'
    },
    urlArgs: "version=" +  (new Date()).getTime(),
    shim:{
        'jquery.scrollpage':['jquery','jquery.mousewheel'],
        'jquery.placeholder':['jquery'],
        'jquery.mousewheel':['jquery'],
        'jquery.easing':['jquery']
    }
});