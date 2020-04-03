<template>
    <div class="task-form" :class="{'shown': shown}">
        <div class="shadow" @click="$parent.taskForm = false"></div>
        <div class="form">
            <div class="field">
                <input type="text" v-model="title" placeholder="Title">
            </div>
            <div class="field">
                <input type="date" class="date-input" v-model="date">
                <br>
                <input type="time" class="time-input" v-model="time">
            </div>
            <div class="field">
                <button class="confirm" v-if="mode=='edit'" @click="edit()">confirm</button>
                <button class="confirm" v-if="mode=='add'" @click="add()">confirm</button>
            </div>
        </div>
    </div>
</template>

<script>
import API from '../API';

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
    display: none;
}
.shadow{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.445);
}
.form{
    width: 100%;
    max-width: 500px;
    position: absolute;
    z-index: 1001;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.85);
    padding: 15px;
}

.shown{
    display: block;
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
.date-input, .time-input{
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
