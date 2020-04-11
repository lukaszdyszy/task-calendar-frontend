<template>
    <div class="task-form" :class="{'shown': shown}">
        <div class="form">
            <form @submit.prevent="send">
                <input type="text" v-model="title" placeholder="Title">
                <input type="date" class="date-input" v-model="date">
                <br>
                <input type="time" class="time-input" v-model="time">
                <input type="submit" value="confirm">
            </form>
            <button class="cancel" @click="cancel">cancel</button>
        </div>
    </div>
</template>

<script>
import API from '@/API';

export default {
    name: 'TaskForm',
    props: {
        shown: Boolean,
        mode: String,
        id: Number,
        p_title: String,
        p_date: String,
        p_time: String
    },
    data(){
        return{
            title: '',
            date: '',
            time: ''
        }
    },
    methods: {
        send(){
            if(this.mode == 'add'){
                this.add();
            } else {
                this.edit();
            }
        },
        add(){
            this.$http.post(API + 'tasks/add.php', {
                title: this.title,
                date_time: this.date + ' ' + this.time
            }, {
                'Content-Type': 'application/json',
                'withCredentials': true
            }).then(function(response){
                this.$router.push('/panel/'+this.date);
                this.$router.go();
            })
        },
        edit(){
            this.$http.post(API + 'tasks/edit.php', {
                id: this.id,
                title: this.title,
                date_time: this.date + ' ' + this.time
            }, {
                'Content-Type': 'application/json',
                'withCredentials': true
            }).then(function(response){
                this.$router.push('/panel/'+this.date);
                this.$router.go();
            })
        },
        cancel(){
            this.$parent.taskForm = false;
        }
    },
    watch:{
        p_date(){
            this.date = this.p_date;
        },
        p_time(){
            this.time = this.p_time;
        }
    },
    created(){
        console.log(API);
        if(this.mode == 'edit'){
            this.title = this.p_title;
        }
        this.date = this.p_date;
        this.time = this.p_time;
    }
}
</script>


<style lang="scss" scoped>

.task-form{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.445);
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
        margin: 10px 0;
        width: 100%;
        font-size: 1.2rem;
        &:focus{
            outline: none;
        }
        &.date-input, &.time-input{
            text-align: center;
            margin: 2px 0;
        }
        &[type=submit]{
            background-color: rgb(20, 235, 116);
            text-transform: uppercase;
            letter-spacing: 3px;
        }
    }
}

button.cancel{
    background-color: rgb(194, 228, 1);
    border: none;
    padding: 5px;
    width: 100%;
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 3px;
}

</style>
