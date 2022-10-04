<template>
    <div class="text-center">
        <label class="open-modal" data-bs-toggle="modal" data-bs-target="#createPostModal">What's on your mind?</label>
    </div>
    <div class="modal fade" id="createPostModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="createPostLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <h5 class="modal-title" id="createPostLabel">Create post</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- create post detail -->
                    <div>
                        <editor v-model="content" />
                    </div>

                    <!-- show preview image -->
                    <div class="mt-3">
                        <div v-if="preview_list.length" class="set-x-button">
                            <div class="p-2" v-for="(item, index) in preview_list" :key="index">
                                <font-awesome-icon class="btn" icon="fa-solid fa-x" @click="showImage()" />
                                <img :src="item" class="preview-multi-image"/>                                        
                            </div>
                        </div>
                    </div>

                    <!-- add to your post such as image -->
                    <div class="row align-items-center p-2" style="border: 2px solid #CCCCCC">
                        <div class="col-sm-6">
                            <label>Add to your post</label>
                        </div>
                        <div class="col-sm-6">
                            <div class="image-upload">
                                <label for="file-input">
                                    <font-awesome-icon icon="fa-solid fa-image" size="lg" style="cursor: pointer;" />
                                </label>
                                <input id="file-input" type="file" accept="image/*" multiple="multiple" @change="previewMultiImage"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="post()">Understood</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService'
import AuthUser from '@/store/AuthUser'
import Editor from './Editor.vue'

export default{
    components:{
        Editor
    },
    data(){
        return {
            content: '',
            preview_list: [],
            image_list: [],
        }
    },
    methods:{
        async post(){
            let headers = AuthService.getApiHeader()
            let api_endpoint = "http://127.0.0.1:8000"
            let url = api_endpoint + '/api/posts'
            let user_id = AuthUser.getters.user.id
            let fd = new FormData()
            fd.append('detail',this.content)
            fd.append('user_id',user_id)
            let res = await this.axios.post(url, fd, headers)
            if(res.status == 201){
                let url = api_endpoint + '/api/store'
                let post_id = res.data.id
                for(let i = 0; i < this.image_list.length; i++){
                    let fd = new FormData()
                    fd.append('file',this.image_list[i])
                    fd.append('post_id', post_id)
                    let res = await this.axios.post(url,fd)
                    if(res.status == 201){
                        console.log('create post success')
                    }
                }
            }
        },
        previewMultiImage: function(event) {
            var input = event.target;
            var count = input.files.length;
            var index = 0;
            if (input.files) {
                while(count --) {
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        this.preview_list.push(e.target.result);
                    }
                this.image_list.push(input.files[index]);
                reader.readAsDataURL(input.files[index]);
                index ++;
                }
            }
        },
    }
}
</script>

<style>

</style>