<template>
    <div class="add" :class="{'shown': shown}">
        <div class="form">
            <div class="field">
                <label for="title">Title</label>
                <br>
                <input type="text" id="title" v-model="title">
            </div>
            <div class="field">
                <label for="date">When</label>
                <br>
                <input type="date" id="date" v-model="date_time">
            </div>
            <div class="field">
                <button class="confirm">confirm</button>
            </div>
            <div class="field">
                <button class="confirm cancel" @click="$parent.newTask = false">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Add',
    props: {
        shown: Boolean
    },
    data(){
        return {
            title: '',
            date_time: ''
        }
    }
}
</script>

<style lang="scss" scoped>

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

button.confirm{
    background-color: rgb(20, 235, 116);
    text-transform: uppercase;
    letter-spacing: 3px;
}
button.cancel{
    background-color: rgb(194, 228, 1);
}

</style>