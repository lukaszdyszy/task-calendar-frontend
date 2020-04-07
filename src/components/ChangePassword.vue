<template>
    <div class="change-password">
        <div class="form">
            <form @submit.prevent="changePass">
                <input type="password" v-model="newPassword" placeholder="new password...">
                <input type="password" v-model="newPasswordRepeat" placeholder="repeat password...">
                <input type="submit" value="change">
            </form>
            <div class="msg">
                <span class="error">{{ error }}</span>
                <span class="message">{{ message }}</span>
                <div class="lds-ellipsis" v-if="waitingForResponse"><div></div><div></div><div></div><div></div></div>
            </div>
            <button class="cancel" @click="cancel">cancel</button>
        </div>
    </div>
</template>

<script>
import API from '@/API.js';

export default {
    name: 'ChangePassword',
    props: {
        shown: Boolean
    },
    data(){
        return {
            newPassword: 'zaq1@WSX',
            newPasswordRepeat: 'zaq1@WSX',
            error: '',
            waitingForResponse: false,
            message: ''
        }
    },
    methods: {
        cancel(){
            this.$parent.changePasswordForm = false;
        },
        changePass(){
            if(this.newPassword != this.newPasswordRepeat){
                this.error = 'Passwords not match';
            } else if(!(RegExp('[a-z]{1,}').test(String(this.newPassword)) && 
            RegExp('[A-Z]{1,}').test(String(this.newPassword)) && 
            RegExp('[0-9]{1,}').test(String(this.newPassword)) && 
            RegExp('[!@#$&%?_-]{1,}').test(String(this.newPassword)) && 
            this.newPassword.length>7)){
                this.error = 'Password must contain min. 8 characters, uppercase, lowercase and a special sign.';
            } else {
                this.waitingForResponse = true;
                this.$http.post(API + 'users/changePassword.php', {
                    password: this.newPassword
                }, {
                    'withCredentials': true,
                    'Content-Type': 'application/json'
                }).then(function(response){
                    this.waitingForResponse = false;
                    if(response.body.Error != 0){
                        this.error = response.body.message;
                    } else {
                        this.error = '';
                        this.message = response.body.message;
                    }
                });
            }
        }
    }, 
    watch: {
        shown: function(){
            this.message = '';
            this.error = '';
        }
    }
}
</script>

<style lang="scss" scoped>

.change-password{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.445);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.form{
    background-color: rgba(255, 255, 255, 0.85);
    padding: 15px;
}
form{
    input{
        border: none;
        padding: 5px;
        width: 100%;
        font-size: 1.2rem;
        margin: 5px 0;
        &:focus{
            outline: none;
        }
        &[type=submit]{
            background-color: rgb(20, 235, 116);
            text-transform: uppercase;
            letter-spacing: 3px;
        }
    }
}

button.cancel{
    border: none;
    padding: 5px;
    width: 100%;
    font-size: 1.2rem;
    background-color: rgb(194, 228, 1);
    text-transform: uppercase;
    letter-spacing: 3px;
}


.msg{
    text-align: center;
    padding: 10px 0;
    font-size: 1.1rem;
}
.error{
    color: red;
}
.message{
    color: black;
}

.lds-ellipsis{
    margin: 0 auto;
}

</style>