<template>
    <div class="panel">
        <TaskForm v-if="loading==false" mode="add" :shown="taskForm" :p_date_time="parseDate+' '+parseTime"></TaskForm>
        <ChangePassword :shown="changePasswordForm"/>
        <div class="newTask" @click="taskForm=true">
            <i class="fas fa-plus-circle fa-3x"></i>
        </div>
        <div class="tob-bar">
            <i class="fas fa-bars fa-2x" @click="lOpen = !lOpen"></i>
        </div>
        <div class="left-pane" :class="{'open': lOpen}">
            <i class="fas fa-times" @click="lOpen = !lOpen"></i>
            <span class="name">{{ email }}</span>
            <div class="tools">
                <div class="hd">Tools</div>
                <button @click="changePasswordForm=true">change password</button>
            </div>
            <SideCalendar v-if="renderCalendar"/>
            <button @click="logout()" class="logout">Sign out</button>
        </div>
        <main class="main" v-if="loading == false">
            <div class="container">
                <div class="date-bar">
                   <div class="arrow" @click="prevDate()">
                       &lt;
                   </div>
                   <div>
                       <date-picker v-model="date" @change="getTasks()" lang="en" :defaultDate="date"></date-picker>
                   </div>
                   <div class="arrow" @click="nextDate()">
                       &gt;
                   </div>
                </div>
                <Task v-for="task in tasks" 
                :id="task.ID" 
                :title="task.title" 
                :p_done="Boolean(+task.done)" 
                :date_time="task.date_time"
                ></Task>
            </div>
        </main>
    </div>
</template>

<script>
import API from '../API';
import Task from '../components/Task';
import TaskForm from '../components/TaskForm';
import ChangePassword from '../components/ChangePassword';
import SideCalendar from '../components/SideCalendar';
import DatePicker from 'vue2-datepicker-improved';

export default {
    name: 'Panel',
    components: {
        Task,
        TaskForm,
        DatePicker,
        ChangePassword,
        SideCalendar
    },
    data(){
        return {
            id: 0,
            email: '',
            lOpen: false,
            date: '',
            datePicker: '',
            tasks: [],
            loading: true,
            taskForm: false,
            changePasswordForm: false,
            renderCalendar: true
        }
    },
    methods: {
        isLogged(){
            this.$http.get(API + 'users/islogged.php', {
                'withCredentials': true
            }).then(function(response){
                if(response.body.logged == false){
                    this.$router.push('/');
                } else {
                    this.id = response.body.id;
                    this.email = response.body.email;
                    this.date = new Date();
                    this.loading = false;
                    this.getTasks();
                }
            });
        },
        logout(){
            this.$http.get(API + 'users/logout.php', {
                'withCredentials': true
            }).then(function(response){
                this.isLogged();
            });
        },
        getTasks(){
            this.tasks = [];
            this.$http.get(API + 'tasks/get.php?date_time='+this.parseDate, {
                'withCredentials': true
            }).then(function(response){
                this.tasks = response.body;
            })
        },
        prevDate(){
            let newDate = new Date(this.date);
            newDate.setDate(newDate.getDate()-1);
            this.date = newDate;
            this.getTasks();
        },
        nextDate(){
            let newDate = new Date(this.date);
            newDate.setDate(newDate.getDate()+1);
            this.date = newDate;
            this.getTasks();
        },
        reload(){
            this.getTasks();
        }
    },
    computed: {
        parseDate(){
            let Y = this.date.getFullYear();
            let M = this.date.getMonth()+1;
            let D = this.date.getDate();

            if(M < 10){M = '0'+M;}
            if(D < 10){D = '0'+D;}

            return Y+'-'+M+'-'+D;
        },
        parseTime(){
            let H = this.date.getHours();
            let I = this.date.getMinutes();
            let S = this.date.getSeconds();

            if(H < 10){H = '0'+H;}
            if(I < 10){I = '0'+I;}
            if(S < 10){S = '0'+S;}

            return H+':'+I;
        }
    },
    created(){
        this.isLogged();
    }
}
</script>

<style lang="scss" scoped>

.panel{
    color: white;
}

.tob-bar{
    background-color: rgb(25, 25, 25);
    width: 100%;
    padding: 10px;
    position: fixed;
    top: 0;
    left: 0;
}
.fa-times{
    position: absolute;
    top: 10px;
    right: 10px;
}

.left-pane{
    width: 250px;
    height: 100vh;
    background-color: rgb(39, 39, 39);
    position: fixed;
    z-index: 100;
    padding: 30px 10px 10px 10px;
    text-align: center;
    top: 0;
    left: -250px;
    transition: transform 0.65s;
    &.open{
        transform: translateX(250px);
    }
}
.tools{
    border: 3px solid rgb(202, 202, 202);
    margin: 35px 0;
    padding: 20px 5px;
    position: relative;
    .hd{
        background-color: rgb(39, 39, 39);
        position: absolute;
        top: -15px;
        left: 10px;
        padding: 5px;
        font-size: 1.07rem;
    }
    button{
        width: 100%;
        padding: 7px;
    }
}


button.logout{
    width: calc(100% - 20px);
    margin: 10px;
    font-size: 1.2rem;
    background-color: rgb(6, 194, 252);
    border: 1px solid rgb(39, 39, 39);
    padding: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
    &:focus{
        outline: none;
    }
}


.container{
    max-width: 720px;
    margin: 100px auto;
    padding: 10px;
}
.date-bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 3px double;
    border-bottom: 3px double;
    padding: 10px;
}



.newTask{
    position: fixed;
    bottom: 20px;
    right: 20px;
    color: rgb(0, 109, 0);
    opacity: 0.7;
    &:hover{
        cursor: pointer;
        opacity: 1;
    }
}

.arrow{
    cursor: pointer;
    font-size: 2rem;
}

@media (min-width: 1024px) {
    .panel{
        display: flex;
    }
    .left-pane{
        position: relative;
        top: 0;
        left: 0;
        flex: 1;
        max-width: 300px;
    }
    main.main{
        flex: 4;
    }
    .fa-times{
        display: none;
    }
    .newTask {
        font-size: 1.5rem;
        bottom: 35px;
        right: 35px;
    }
}

</style>
