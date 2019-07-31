<template>
    <div class="panel">
        <TaskForm v-if="loading==false" mode="add" :shown="taskForm" :p_date_time="parseDate+' '+parseTime"></TaskForm>
        <div class="newTask" @click="taskForm=true">
            <i class="fas fa-plus-circle fa-3x"></i>
        </div>
        <div class="tob-bar">
            <i class="fas fa-bars fa-2x" @click="lOpen = !lOpen"></i>
        </div>
        <div class="left-pane" :class="{'open': lOpen}">
            <i class="fas fa-times" @click="lOpen = !lOpen"></i>
            <span class="name">{{ email }}</span>
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
import DatePicker from 'vue2-datepicker-improved';

export default {
    name: 'Panel',
    components: {
        Task,
        TaskForm,
        DatePicker
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
            taskForm: false
        }
    },
    methods: {
        isLogged(){
            let self = this;
            this.$http.get(API + 'users/islogged.php')
            .then(function(response){
                if(response.body.logged == false){
                    self.$router.push('/');
                } else {
                    self.id = response.body.id;
                    self.email = response.body.email;
                    self.date = new Date();
                    self.loading = false;
                    self.getTasks();
                }
            });
        },
        logout(){
            let self = this;
            this.$http.get(API + 'users/logout.php')
            .then(function(response){
                self.isLogged();
            });
        },
        getTasks(){
            let self = this;
            this.tasks = [];
            this.$http.get(API + 'tasks/?date_time='+self.parseDate)
            .then(function(response){
                self.tasks = response.body;
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
    color: green;
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
}

</style>
