<template>
    <div style="border: 1px solid #ccc;margin-top: 2rem;">
      <Toolbar :editorId="editorId" :defaultConfig="toolbarConfig" :mode="mode" style="border-bottom: 1px solid #ccc"/>
      <Editor :editorId="editorId" :defaultConfig="editorConfig" :mode="mode" style="height: 500px; overflow-y: hidden;"/>
    </div>
</template>
<script>
import { onBeforeUnmount, onMounted, watch } from 'vue'
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
export default {
    components: { Editor, Toolbar },
    data(){
        return{

        }
    },
    setup() {
        const editorId = `w-e-${Math.random().toString().slice(-5)}` //【注意】编辑器 id ，要全局唯一
        // defaultContent (JSON 格式) 和 defaultHtml (HTML 格式) ，二选一
        const toolbarConfig = {excludeKeys: ['uploadVideo']}
        const customUpload = async (file, insertFn) => {
            console.log(file)
            // insertFn(result.url)
        }
        const editorConfig = { placeholder: '', autoFocus: true, scroll: false , MENU_CONF: { uploadImage: { customUpload } } }

        // 组件销毁时，也及时销毁编辑器
        onMounted(() => {
            
        })
        onBeforeUnmount(() => {
            const editor = getEditor(editorId)
            console.log(editor.getConfig())
            if (editor == null) return
            editor.destroy()
            removeEditor(editorId)
        })
        watch(() => editorId, (nV, oV) => {
            console.log(oV)
        })
        return {
            editorId,
            mode: 'default',
            toolbarConfig,
            editorConfig,
        }
    },
    mounted(){
        console.log(111)
    }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss" scoped>

</style>