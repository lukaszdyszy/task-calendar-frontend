<template>
    <div class="register-container">
        <div class="login">
            <h1>Sign up</h1>
            <div class="form">
                <input type="text" v-model="email" placeholder="e-mail">
                <span class="error" v-if="e_email.length > 0">{{ e_email }}</span>
                <input type="password" v-model="password" placeholder="password">
                <input type="password" v-model="r_password" placeholder="repeat password">
                <span class="error" v-if="e_password.length > 0">{{ e_password }}</span>
                <button class="registration" @click="register()">Sign up</button>
                <button class="logging" @click="$router.push('/')">Sign in</button>
                <span class="message">{{ message }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import API from '../API';

export default {
    name: 'Registration',
    data(){
        return {
            email: '',
            password: '',
            r_password: '',
            e_email: '',
            e_password: '',
            message: ''
        }
    },
    methods: {
        register(){
            let e_test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(e_test.test(String(this.email).toLowerCase()) == false){
                this.e_email = 'Wrong email';
            } else if(this.password != this.r_password){
                this.e_password = 'Passwords not match';
            } else {
                let self = this;

                this.e_email = '';
                this.e_password = '';

                grecaptcha.ready(function() {
                    grecaptcha.execute('6LdKiLAUAAAAANm5grmrHytmmjgmgBkUuzbRvprJ', {action: 'login'}).then(function(token) {
                        self.$http.post(API + 'users/register.php', {
                            email: self.email,
                            password: self.password,
                            token: token
                        }).then(function(response){
                            self.message = response.body.message;
                        })
                    });
                });
            }
        }
    },
    created(){
        let recaptcha = document.createElement('script');
        recaptcha.setAttribute('src', 'https://www.google.com/recaptcha/api.js?render=6LdKiLAUAAAAANm5grmrHytmmjgmgBkUuzbRvprJ');
        document.getElementsByTagName('head')[0].appendChild(recaptcha);
        let cp3 = document.querySelector('div > div.grecaptcha-badge').style.display = 'block';
    },
    destroyed(){
        let cp = document.querySelector('script[src="https://www.google.com/recaptcha/api.js?render=6LdKiLAUAAAAANm5grmrHytmmjgmgBkUuzbRvprJ"]');
        let cp2 = document.querySelector('script[src="https://www.gstatic.com/recaptcha/api2/v1563777128698/recaptcha__pl.js"]');
        let cp3 = document.querySelector('div > div.grecaptcha-badge');
        document.getElementsByTagName('head')[0].removeChild(cp);
        document.getElementsByTagName('head')[0].removeChild(cp2);
        cp3.style.display = 'none';
    }
}
</script>

<style lang="scss" scoped>

.register-container{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login{
    width: 100%;
    max-width: 350px;
    padding: 10px;
    text-align: center;
}

.form{
    width: 100%;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 7px 10px 3px rgba(255,255,255,0.75);
    padding: 10px;
    border-radius: 9px;
    display: flex;
    flex-direction: column;
}

h1{
    padding: 0;
    margin: 12px;
    color: white;
    letter-spacing: 3px;
}

input{
    margin: 10px 0;
    padding: 5px;
    border: none;
    border-bottom: 1px solid rgb(185, 185, 185);
    &:focus{
        outline: none;
        border-bottom: 1px solid rgb(148, 148, 148);
    }
}

button{
    border: none;
    border-radius: 15px;
    padding: 7px;
    margin: 10px 0;
    &:focus{
        outline: none;
    }
    &.registration{
        background-color: rgb(47, 211, 240);
    }
    &.loging{
        background-color: white;
        border: 1px solid rgb(179, 179, 179);
        margin: 25px 0 10px 0;
    }
}

span.error{
    color: red;
    text-align: center;
    padding: 12px 0;
}

</style>
