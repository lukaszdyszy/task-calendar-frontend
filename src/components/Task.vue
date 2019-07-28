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
            <div class="tool edit" @click="edition()">
                <div class="caption">edit</div>
                <i class="fas fa-pen"></i>
            </div>
            <div class="date">
                {{ date_time.split(' ')[1].slice(0,5) }}
            </div>
        </div>
        <div class="title">{{ title }}</div>

        <div class="edit-form" :class="{'show-edit': showEdit}">
            <div class="form">
                <div class="field">
                    <input type="text" id="title" v-model="title" placeholder="Title">
                </div>
                <div class="field">
                    <input type="date" id="date" v-model="edited.date">
                    <br>
                    <input type="time" id="time" v-model="edited.time">
                </div>
                <div class="field">
                    <button class="confirm" @click="confirmEdition()">confirm</button>
                </div>
                <div class="field">
                    <button class="confirm cancel" @click="showEdit = false">Cancel</button>
                </div>
            </div>
        </div>
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
            done: false,
            showEdit: false,
            edited: {
                date: '',
                time: ''
            }
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
        },
        edition(){
            this.edited.date = this.date_time.split(' ')[0];
            this.edited.time = this.date_time.split(' ')[1];

            this.showEdit = true;
        },
        confirmEdition(){
            this.date_time = this.edited.date + ' ' + this.edited.time;
            this.sendEdit();
            
            this.showEdit = false;
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


// edit form
.edit-form{
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    justify-content: center;
    align-items: center;
    padding: 5px;
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

.show-edit{
    display: flex;
}

</style>