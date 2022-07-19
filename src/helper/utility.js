function tanggalan(){
    let today= new Date()
    let dd = today.getDate();
    if (dd < 10) {
        dd = '0' + dd
    }
    let mm = today.getMonth() + 1; //January is 0!
    if (mm < 10) {
    mm = '0' + mm
    }
    let yyyy = today.getFullYear();
    return dd + '-' + mm + '-' + yyyy
}

function tanggalan2(){
    let today= new Date()
    let dd = today.getDate();
    if (dd < 10) {
        dd = '0' + dd
    }
    let mm = today.getMonth() + 1; //January is 0!
    if (mm < 10) {
    mm = '0' + mm
    }
    let yyyy = today.getFullYear();
    return  yyyy + '-' + mm + '-' +dd
}

function jam (){
    var date = new Date;    
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hour = date.getHours();
    let milliSeconds = date.getMilliseconds();
    return hour + ':'+ minutes + ':'+ seconds +'.'+milliSeconds
}

function dhm(t){
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round( (t - d * cd - h * ch) / 60000),
        pad = function(n){ return n < 10 ? '0' + n : n; };
    
    if( h > 0 ){
    d++;
    h = 0;
    }
    return d;
    }

function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}
    
function ubahFormatTanggal(tanggal){
    let today = new Date(toDateTime(tanggal.seconds))
    let dd = today.getDate();
        if (dd < 10) {
            dd = '0' + dd
        }
        let mm = today.getMonth() + 1; //January is 0!
        if (mm < 10) {
        mm = '0' + mm
        }
        let yyyy = today.getFullYear();
        
        return yyyy + '-' + mm + '-' + dd
}
    
function ubahFormatTanggal2(tanggal){
    
    let today = new Date(toDateTime(tanggal.seconds))
    let dd = today.getDate();
    if (dd < 10) {
        dd = '0' + dd
    }
    let mm = today.getMonth() + 1; //January is 0!
    if (mm < 10) {
    mm = '0' + mm
    }
    let yyyy = today.getFullYear();
    
    return dd + '-' + mm + '-' + yyyy
}

function cekKadaluarsaToken(waktu){
    selisih_detik = new Date().getTime()-new Date(waktu).getTime()
    ceklebihdari1hari = selisih_detik / 86400000 > 1 ? true : false
    return ceklebihdari1hari
}

export {tanggalan, tanggalan2, jam, dhm, ubahFormatTanggal, ubahFormatTanggal2, cekKadaluarsaToken}