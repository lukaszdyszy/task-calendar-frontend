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
                <input type="submit" class="registration" value="Sign up">
                <button class="logging" @click="$router.push('/')">Sign in</button>
                <span class="message">{{ message }}</span>
            </form>
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
                this.e_email = '';
                this.e_password = '';

                this.$http.post(API + 'users/register.php', {
                    email: this.email,
                    password: this.password
                }).then(function(response){
                    this.message = response.body.message;
                });
            }
        }
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
