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
            <div class="tool edit">
                <div class="caption">edit</div>
                <i class="fas fa-pen"></i>
            </div>
            <div class="date">
                {{ date_time.split(' ')[1] }}
            </div>
        </div>
        <div class="title">{{ title }}</div>
    </div>
</template>

<script>
import API from '../API';

export default {
    name: 'Task',
    props: {
        p_id: Number,
        p_title: String,
        p_date_time: String,
        p_done: Boolean
    },
    data(){
        return {
            id: 0,
            title: '',
            date_time: '',
            done: false
        }
    },
    methods: {
        sendEdit(){
            let self = this;
            this.$http.put(API + 'tasks/', {
                id: self.id,
                title: self.title,
                date_time: self.date_time,
                done: self.done
            }).then(function(response){
                console.log(response);
            })
        },
        delTask(){
            let self = this;
            this.$http.delete(API + 'tasks/', {body: {
                    id: self.id
                }
            }).then(function(response){
                console.log(response);
                self.$parent.getTasks();
            })
        },
        markDone(){
            this.done = !this.done;
            this.sendEdit();
        }
    },
    created(){
        this.id = this.p_id;
        this.title = this.p_title;
        this.date_time = this.p_date_time;
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