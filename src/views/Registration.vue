<template>
    <div class="register-container">
        <div class="login">
            <h1>Sign up</h1>
            <form class="register-form" @submit.prevent="register">
                <input type="text" v-model="email" placeholder="e-mail">
                <span class="error" v-if="e_email.length > 0">{{ e_email }}</span>
                <input type="password" v-model="password" placeholder="password">
                <input type="password" v-model="r_password" placeholder="repeat password">
                <span class="error" v-if="e_password.length > 0">{{ e_password }}</span>
                <div id="c-div">
                    <div class="g-recaptcha" :data-sitekey="sitekey"></div>
                </div>
                <input type="submit" class="registration" value="Sign up">
                <button class="logging" @click="$router.push('/')">Sign in</button>
                <span class="message" :class="{'error': e_message}">{{ message }}</span>
                <div class="lds-ellipsis" v-if="waitingForResponse"><div></div><div></div><div></div><div></div></div>
            </form>
        </div>
    </div>
</template>

<script>
import API from '../API';
import Sitekey from '../Sitekey.js';

export default {
    name: 'Registration',
    data(){
        return {
            email: '',
            password: '',
            r_password: '',
            e_email: '',
            e_password: '',
            message: '',
            sitekey: Sitekey,
            waitingForResponse: false,
            e_message: false
        }
    },
    methods: {
        register(){
            let e_test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(e_test.test(String(this.email).toLowerCase()) == false){
                this.e_email = 'Wrong email';
                this.resetCaptcha();
            } else if(this.password != this.r_password){
                this.e_email = '';
                this.e_password = 'Passwords not match';
                this.resetCaptcha();
            } else if(!(RegExp('[a-z]{1,}').test(String(this.password)) && 
            RegExp('[A-Z]{1,}').test(String(this.password)) && 
            RegExp('[0-9]{1,}').test(String(this.password)) && 
            RegExp('[!@#$&%?_-]{1,}').test(String(this.password)) && 
            this.password.length>7)){
                this.e_email = '';
                this.e_password = 'Password must contain min. 8 characters, uppercase, lowercase and special sign.';
                this.resetCaptcha();
            } else {
                this.waitingForResponse = true;
                this.$http.post(API + 'users/register.php', {
                    email: this.email,
                    password: this.password,
                    captcha: grecaptcha.getResponse()
                }, {
                    'Content-Type': 'application/json'
                }).then(function(response){
                    this.waitingForResponse = false;
                    if(response.body.Error != 0){
                        this.e_message = true;
                        this.resetCaptcha();
                    } else {
                        this.e_message = false;
                    }
                    this.e_email = '';
                    this.e_password = '';
                    this.message = response.body.message;
                });
            }
        },
        addCaptcha(){
            let script = document.createElement('script');
            script.src = 'https://www.google.com/recaptcha/api.js';
            document.head.appendChild(script);
        },
        removeCaptcha(){
            let script1 = document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]');
            let script2 = document.querySelector('script[src^="https://www.gstatic.com"]');
            document.head.removeChild(script1);
            document.head.removeChild(script2);
        },
        resetCaptcha(){
            let c_div = document.getElementById('c-div');
            let captchaDiv = document.querySelector('#c-div > .g-recaptcha');
            c_div.removeChild(captchaDiv);
            this.removeCaptcha();

            this.addCaptcha();
            captchaDiv = document.createElement('div');
            captchaDiv.setAttribute('class', 'g-recaptcha');
            captchaDiv.setAttribute('data-sitekey', Sitekey);
            c_div.appendChild(captchaDiv);
        }
    },
    created(){
      this.addCaptcha();
    },
    destroyed(){
      this.removeCaptcha();
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

form.register-form{
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
    &.registration{
        background-color: rgb(47, 211, 240);
        border-radius: 15px;
        padding: 7px;
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
