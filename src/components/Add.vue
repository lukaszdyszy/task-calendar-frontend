<template>
    <div class="add" :class="{'shown': shown}">
        <div class="form">
            <div class="field">
                <input type="text" id="title" v-model="title" placeholder="Title">
            </div>
            <div class="field">
                <input type="date" id="date" v-model="date">
                <br>
                <input type="time" id="time" v-model="time">
            </div>
            <div class="field">
                <button class="confirm" @click="sendAdd()">confirm</button>
            </div>
            <div class="field">
                <button class="confirm cancel" @click="$parent.newTask = false">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import API from '../API';

export default {
    name: 'Add',
    props: {
        shown: Boolean
    },
    data(){
        return {
            title: '',
            date: '',
            time: ''
        }
    },
    methods: {
        sendAdd(){
            let self = this;
            this.$http.post(API + 'tasks/', {
                user_id: self.$parent.id,
                title: self.title,
                date_time: self.dateTime
            }).then(function(response){
                console.log(response.body);
                self.$parent.newTask = false;
                self.$parent.getTasks();
            })
        }
    },
    computed: {
        dateTime(){
            return this.date + ' ' + this.time;
        }
    },
    created(){
        let today = new Date();

        let Y = today.getFullYear();
        let M = today.getMonth()+1;
        let D = today.getDate();

        if(M < 10){M = '0'+M;}
        if(D < 10){D = '0'+D;}

        this.date = Y + '-' + M + '-' + D;

        let H = today.getHours();
        let I = today.getMinutes();
        if(H < 10){H = '0'+H;}
        if(I < 10){I = '0'+I;}
        this.time = H + ':' + I;
    }
}
</script>

<style lang="scss" scoped>
.test{
    position: fixed;
    top: 10px;
    color: white;
}

.add {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    justify-content: center;
    align-items: center;
    padding: 5px;
}
.shown{
    display: flex;
}

.form{
    width: 100%;
    padding: 15px 5px;
    background-color: rgb(223, 223, 223);
    display: flex;
    flex-direction: column;
    color: black;
}
.field{
    margin: 13px 0;
}

input, button.confirm{
    border: none;
    padding: 5px;
    width: 100%;
    font-size: 1.2rem;
    &:focus{
        outline: none;
    }
}
#date, #time{
    text-align: center;
}

button.confirm{
    background-color: rgb(20, 235, 116);
    text-transform: uppercase;
    letter-spacing: 3px;
}
button.cancel{
    background-color: rgb(194, 228, 1);
}

</style>