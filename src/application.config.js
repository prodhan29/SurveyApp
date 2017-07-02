const config = {
    domain: 'http://54.69.108.14:8090',
    ajaxConfig: function() {
        return {
            headers: {
                'Authorization': `Bearer $(${sessionStorage.getItem("auth_token")})`
            }
        }
    },
    maltipartConfig: function(){
        return {
            headers: {
                'Authorization': `Bearer $(${sessionStorage.getItem("auth_token")})`,
                'Content-Type': 'multipart/form-data' 
            }
        }
    }
}

export default config;