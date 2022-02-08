<template>
    <div class="input-box">
        <span :class="[{'span-style-actie' : spanStyleAdd},{'span-move-active' : spanStyleAdd || modelValue !== ''}]">{{this.title}}</span>
        <input v-model="modelValue" :type="inputType" :maxlength="this.length" @input="handleInput" @focus="spanStyleAdd = true" @blur="spanStyleAdd = false" :style="modelValue === '' ? 'background-color: transparent;':''"/>
    </div>
</template>
<script>
export default {
    data(){
        return{
            spanStyleAdd: false,
        }
    },
    props:{
        inputType: [String],
        length: [Number],
        title: [String,Number],
        modelValue: [String,Number,Boolean]
    },
    methods:{
        handleInput(event) {
			this.$emit("update:modelValue", event.target.value)
		},
    }
}
</script>
<style lang="scss" scoped>
.input-box
{
    width: 7rem;
    height: 3rem;
    display: flex;
    position: relative;
    align-items: flex-end;
    flex-wrap: wrap;
    justify-content: flex-start;
    input
    {
        width: 100%;
        height: 1.5rem;
        outline: none;
        border: solid 0.05rem darkgray;
        padding: 0 0.5rem;
        transition: all 0.3s;
        font-size: 0.6rem;
        position: relative;
        z-index: 10;
        border-radius: 0.1rem;
    }
    input:focus
    {
        border: solid 0.05rem #3773f3;
    }
    span
    {
        width: 100%;
        height: 1.5rem;
        margin-left: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        transition: all 0.4s;
        color: darkgray;
        position: absolute;
        bottom: 0;
        font-size: 0.55rem;
    }
    .span-style-actie
    {
        color: #3773f3;
        font-size: 0.55rem;
    }
    .span-move-active
    {
        margin: 1.5rem 0;
    }
}
</style>