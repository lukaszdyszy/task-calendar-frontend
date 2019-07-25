<template>
    <div class="panel">
        <div class="tob-bar">
            <i class="fas fa-bars fa-2x" @click="lOpen = !lOpen"></i>
        </div>
        <div class="left-pane" :class="{'open': lOpen}">
            <i class="fas fa-times" @click="lOpen = !lOpen"></i>
            <span class="name">{{ email }}</span>
            <button @click="logout()" class="logout">Sign out</button>
        </div>
        <main v-if="loading == false">
            <div class="container">
                <div class="date-bar">
                    {{ parseDate }}
                </div>
                <Task v-for="task in tasks" 
                :p_id="task.ID" 
                :p_title="task.title" 
                :p_done="Boolean(+task.done)" 
                :p_date_time="task.date_time"
                ></Task>
            </div>
        </main>
    </div>
</template>

<script>
import API from '../API';
import Task from '../components/Task';

export default {
    name: 'Panel',
    components: {
        Task
    },
    data(){
        return {
            id: 0,
            email: '',
            lOpen: false,
            date: '',
            tasks: [],
            loading: true
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
            this.$http.get(API + 'tasks/?user_id='+self.id+'&date_time='+self.parseDate)
            .then(function(response){
                console.log(response);
                self.tasks = response.body;
            })
        }
    },
    computed: {
        parseDate(){
            let Y = this.date.getFullYear();
            let M = this.date.getMonth()+1;
            let D = this.date.getDate();

            if(M < 10){M = '0'+M;}
            if(D < 10){D = '0'+D;}

            return Y + '-' + M + '-' + D;
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
    max-width: 600px;
    margin: 100px auto;
    padding: 10px;
}
.date-bar{
    text-align: center;
    border-top: 3px double;
    border-bottom: 3px double;
    padding: 10px;
}

</style>
