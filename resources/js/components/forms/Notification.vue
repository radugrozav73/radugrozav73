<template>
    <div :class="[notify ? 'addNotifier':'hideNotifier']">
        <p>{{msg}}.</p>
    </div>
</template>

<script>
export default {
        props:['notify', 'msg']
}
</script>

<style scoped>
.addNotifier{
    position: fixed;
    bottom: 30px;
    z-index:300;
    left:30px;
    width:200px;
    height:60px;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color:white;
    background-color:#e93b81;
    transform: scale(1);
    transition: .3s ease-in-out;
}
.hideNotifier{
    position: fixed;
    bottom: 30px;
    left:30px;
    width:150px;
    height:30px;
    z-index:300;
    font-size: .8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color:white;
    background-color:#e93b81;
    transform: scale(0);
    visibility: hidden;
    transition: .3s ease-in-out;
}

@media only screen and (max-width: 600px){
    .addNotifier{
        top:100px;
        left:50%;
        bottom:unset;
        transform:translatex(-50%);
    }
    .hideNotifier{
        top:100px;
        left:50%;
        bottom:unset;
        transform:translatex(-50%);
    }
}
</style>