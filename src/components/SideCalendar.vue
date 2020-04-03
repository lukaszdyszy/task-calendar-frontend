<template>
    <div class="side-calendar-container">
        <header>
            <div class="prev-next" @click="changeMonth(-1)">&lt;</div>
            <div class="current-date">{{parseDate}}</div>
            <div class="prev-next" @click="changeMonth(1)">&gt;</div>
        </header>
        <table>
            <thead>
                <tr>
                    <th>M</th>
                    <th>T</th>
                    <th>W</th>
                    <th>Th</th>
                    <th>F</th>
                    <th>St</th>
                    <th>S</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="firstDay != 0">
                    <td v-for="index in (firstDay)" style="background-color: lightgrey;"></td>
                    <td v-for="index in (7-firstDay)" 
                    :class="{'task-exist': daysWithTask.indexOf(index) > -1}"
                    @click="changeDate(index)">
                        {{index}}
                    </td>
                </tr>
                <tr v-for="row in (Math.floor((nrODays-(7-firstDay))/7))">
                    <td v-for="day in 7" 
                    :class="{'task-exist': daysWithTask.indexOf(row*7+day-firstDay) > -1}" 
                    @click="changeDate(row*7+day-firstDay)">
                        {{row*7+day-firstDay}}
                    </td>
                </tr>
                <tr>
                    <td v-for="day in ((nrODays-(7-firstDay))%7)" 
                    :class="{'task-exist': daysWithTask.indexOf((Math.floor((nrODays-(7-firstDay))/7))*7+(7-firstDay)+day) > -1}" 
                    @click="changeDate((Math.floor((nrODays-(7-firstDay))/7))*7+(7-firstDay)+day)">
                        {{(Math.floor((nrODays-(7-firstDay))/7))*7+(7-firstDay)+day}}
                    </td>
                    <td v-for="day in (7-((nrODays-(7-firstDay))%7))" style="background-color: lightgrey;"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import API from '@/API.js';

export default {
    name: 'SideCalendar',
    data(){
        return{
            year: 2020,
            month: 0,
            firstDay: 0,
            nrODays: 0,
            tasks: []
        }
    },
    methods: {
        getDate(d){
            this.year = d.getFullYear();
            this.month = d.getMonth();
            this.firstDay = new Date(this.year, this.month, 0).getDay();
            this.nrODays = 32 - (new Date(this.year, this.month, 32).getDate())
            this.getTasks();
        },
        getTasks(){
            let m = this.month+1;
            if(m < 10){
                m = '0'+m;
            }
            this.$http.get(API + 'tasks/get.php?date_time='+this.year+'-'+m, {
                'withCredentials': true
            }).then(function(response){
                this.tasks = response.body;
            });
        },
        changeDate(d){
            let date = new Date(this.year, this.month, d);
            this.$parent.date = date;
            this.$parent.getTasks();
        },
        changeMonth(nr){
            this.month += nr;
            this.getDate(new Date(this.year, this.month));
        }
    },
    computed: {
        daysWithTask(){
            let days = [];
            this.tasks.map((task) => {
                let day = new Date(task.date_time).getDate();
                if(days[days.length-1] != day){
                    days.push(day);
                }
            });
            return days;
        },
        parseDate(){
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            return months[this.month]+' '+this.year;
        }
    },
    created(){
        this.getDate(new Date());
        this.getTasks();
    }
}
</script>

<style lang='scss' scoped>

header{
    display: flex;
    width: 100%;
    padding: 5px 0;
}
.prev-next{
    flex: 1;
    &:hover{
        cursor: pointer;
    }
}
.current-date{
    flex: 3;
}

table{
    width: 100%;
    background-color: white;
    color: black;
    border: 1px solid rgb(8, 171, 221);
    border-collapse: collapse;
    td, th{
        width: (100%/7);
        border: 1px solid rgb(6, 194, 252);
        &:hover{
            cursor: default;
            background-color: rgb(238, 226, 188);
        }
    }
        
}
td.task-exist{
    background-color: rgb(6, 194, 252);;
}
</style>