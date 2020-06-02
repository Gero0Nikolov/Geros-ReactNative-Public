import GLOBALS from './GLOBALS.js';

module.exports = {
    notificationListener: function( _component ) {
        _component.listenerInterval = setInterval( () => {
            if (
                GLOBALS.postID > 0 ||
                GLOBALS.type.length > 0
            ) {
                _component.handleNotification();
            }
        }, 500 );
    },
    purgeNotificationListener: function( _component ) {
        clearInterval( _component.listenerInterval );
    },
    purgeGlobals: function() {
        GLOBALS.postID = 0;
        GLOBALS.type = "";
    }
};