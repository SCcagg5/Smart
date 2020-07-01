<template>
  <div>
  <app-nav></app-nav>
  <div class="columns" style="padding-top:20px">
    <div class="column is-3 is-hidden-mobile">

      <app-sidebar :api="api"></app-sidebar>
    </div>
    <div class="column is-9" style="padding-top:10px;">
      <div style="padding: 5px;">
        <div v-if="api.info" class="box">
          <h3>{{api.info.name}}</h3>
          <markdown-view :data="api.info.description"></markdown-view>
        </div>

      </div>
      <div style="padding: 5px;">
        <div v-for="innerItem in api.item">
            <collection-folder v-if="innerItem.item" :item="innerItem" :path="`api`"></collection-folder>
            <collection-request v-else :item="innerItem" :path="api"></collection-request>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<script>
  import CollectionFolder from './CollectionFolder';
  import CollectionRequest from './CollectionRequest';
  import RequestView from './RequestView';
  import AppSidebar from './AppSidebar';
  import AppNav from './AppNav';
export default {
  name: 'PostmanViewer',
  components: {CollectionFolder, CollectionRequest, AppSidebar, RequestView, AppNav},
  props: {
    msg: String
  },
  data() {
    return {
      api: {},
      url: '',
      file: null,
    }
  },
  mounted() {
    let url = 'https://raw.githubusercontent.com/SCcagg5/Smart/master/Smartdom/Webapps/api.smartdom/%23Documentation/Smart.postman_collection.json';
    if(url){
      this.sendApiRequest(url);
    }
  },
  methods: {
    getApi(){
      this.sendApiRequest(this.url);
    },
    sendApiRequest(url){
        fetch(url).then(response => response.json()).then(data => {
          console.log(data);
          localStorage.setItem('apiUrl', url);
          this.api = data;
        }).catch(error => {
          console.log(error);
        });
    },
    getPath(name){
      return `/#/api/${name}`;
    },
    uploadFile() {
      let that = this;
      var reader = new FileReader();
        reader.onload = function(){
          var text = reader.result;
          try {
              var data = JSON.parse(text);
          } catch (e) {
             console.log("Invalid Data");
             return;
          }

          if (data.info) {
            that.api = data;
          } else {
            console.log("Invalid Data");
          }
        };
        reader.readAsText(this.file);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
