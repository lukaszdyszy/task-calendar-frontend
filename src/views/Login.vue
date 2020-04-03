<template>
    <div class="login-container">
        <div class="login">
            <h1>Sign In</h1>
            <form class="login-form" @submit.prevent="login">
                <input type="text" v-model="email" placeholder="e-mail">
                <input type="password" v-model="password" placeholder="password">
                <input type="submit" class="loging" @click="login" value="Sign in">
                <router-link to="/registration">Sign up</router-link>
                <span class="error" v-if="error">Wrong email or password</span>
            </form>
        </div>
    </div>
</template>

<script>
import API from '../API';

export default {
    name: 'Login',
    data(){
        return {
            email: 'antek@gmail.com',
            password: 'antek',
            error: false
        }
    },
    methods: {
        login(){
            this.$http.post(API + 'users/login.php', {
                email: this.email,
                password: this.password
            }, {
                'Content-Type': 'application/json',
                'withCredentials': true
            }).then(function(response){
                if(response.body.logged){
                    this.$router.push('/panel');
                } else {
                    this.error = true;
                }
            })
        }
    },
    created(){
        let self = this;
        this.$http.get(API + 'users/islogged.php', {
            'withCredentials': true
        }).then(function(response){
            if(response.body.logged){
                self.$router.push('/panel');
            }
        });
    }
}
</script>

<style lang="scss" scoped>

.login-container{
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

form.login-form{
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
    &.loging{
        background-color: white;
        border: 1px solid rgb(179, 179, 179);
        margin: 25px 0 10px 0;
        border-radius: 15px;
        padding: 7px;
    }
}

a{
    display: block;
    border-radius: 15px;
    padding: 7px;
    margin: 10px 0;
    background-color: rgb(47, 211, 240);
}

span.error{
    color: red;
    text-align: center;
    padding: 12px 0;
}

</style>

