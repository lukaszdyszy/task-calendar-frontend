<template>
    <div class="login-container">
        <div class="login">
            <h1>Sign In</h1>
            <div class="form">
                <input type="text" v-model="email" placeholder="e-mail">
                <input type="password" v-model="password" placeholder="password">
                <button class="loging" @click="login">Sign in</button>
                <button class="registration">Sign up</button>
                <span class="error" v-if="error">Wrong email or password</span>
            </div>
        </div>
    </div>
</template>

<script>
import API from '../API';

export default {
    name: 'Login',
    data(){
        return {
            email: '',
            password: '',
            error: false
        }
    },
    methods: {
        login(){
            let self = this;
            this.$http.post(API + 'users/login.php', {
                email: self.email,
                password: self.password
            }).then(function(response){
                if(response.body.logged){
                    self.$router.push('/panel');
                } else {
                    self.error = true;
                }
            })
        }
    },
    created(){
        let self = this;
        this.$http.get(API + 'users/islogged.php').then(function(response){
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

