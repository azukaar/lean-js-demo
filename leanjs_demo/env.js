// browser only 
if(typeof window !== 'undefined') {
    if(typeof window.NODE_ENV === 'undefined') {
        if(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
            window.NODE_ENV = 'development';
        else 
            window.NODE_ENV = 'production';
    }
}