<template>
    <div class="task" :class="{'done': done}">
        <div class="tools">
            <div class="tool mark" @click="markDone()">
                <div class="caption">done</div>
                <i class="fas fa-check"></i>
            </div>
            <div class="tool delete" @click="delTask()">
                <div class="caption">delete</div>
                <i class="fas fa-trash-alt"></i>
            </div>
            <div class="tool edit" @click="taskForm = true">
                <div class="caption">edit</div>
                <i class="fas fa-pen"></i>
            </div>
            <div class="date">
                {{ date_time.split(' ')[1].slice(0,5) }}
            </div>
        </div>
        <div class="title">{{ title }}</div>

        <TaskForm mode="edit" 
        :id="id" 
        :p_title="title" 
        :p_date="date_time.split(' ')[0]"  
        :p_time="date_time.split(' ')[1].slice(0, -3)" 
        v-if="taskForm"
        v-on:formSent="reload($event)">
        </TaskForm>

    </div>
</template>

<script>
import API from '@/API';
import TaskForm from './TaskForm';

export default {
    components: {
        TaskForm
    },
    name: 'Task',
    props: {
        id: Number,
        title: String,
        date_time: String,
        p_done: Boolean
    },
    data(){
        return {
            done: false,
            taskForm: false
        }
    },
    methods: {
        delTask(){
            this.$http.post(API + 'tasks/delete.php', {
                id: this.id
            }, {
                'Content-Type': 'application/json',
                'withCredentials': true
            }).then(function(response){
                this.$emit('formSent', this.date_time);
            })
        },
        markDone(){
            this.done = !this.done;
            this.$http.post(API + 'tasks/edit.php', {
                id: this.id,
                done: this.done
            }, {
                'Content-Type': 'application/json',
                'withCredentials': true
            }).then(function(response){
                this.$emit('formSent', this.date_time);
            })
        },
        reload(date){
            this.$emit('formSent', date);
        }
    },
    created(){
        this.done = this.p_done;
    }
}
</script>

<style lang="scss" scoped>

.task{
    background-color: white;
    color: black;
    border: 3px solid aqua;
    border-radius: 15px;
    padding: 7px;
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.done{
    border-color: green;
    background-color: aquamarine;
}

.tools{
    display: flex;
    margin-right: 7px;
}
.tool{
    position: relative;
    padding: 5px;
    color: rgb(114, 114, 114);
    &:hover{
        .caption{
            opacity: 1;
        }
    }
}
.mark:hover{
    color: green;
}
.delete:hover{
    color: red;
}
.edit:hover{
    color: blue;
}
.caption{
    position: absolute;
    top: -25px;
    left: 50%;
    padding: 5px;
    border-radius: 5px;
    transform: translateX(-50%);
    background-color: rgb(24, 24, 24);
    color: rgb(197, 197, 197);
    opacity: 0;
    transition: opacity 0.3s;
}
.date{
    border-left: 1px dashed;
    border-right: 1px dashed;
    padding: 5px;
}
.title{
    margin-left: 7px;
}

</style>