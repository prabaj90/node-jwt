var log = {
    info:function(info){
        console.log("info: ",info);
    }, 
    error: function(error){
        console.log("Error", error);
    }
};

module.exports = log;