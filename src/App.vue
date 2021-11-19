<template>
  <v-app>
    <v-main>
      <!-- <div>{{MainItem.Prop1.Value}}</div> -->
      <div ref="container"></div>
    </v-main>
    <v-btn @click="Get">add</v-btn>
  </v-app>
</template>

<script>
 import json from './components/data.json'
import { EditModel } from './EditModel.js';
import textField from "./components/textField";
import Vue from "vue";
import vuetify from './plugins/vuetify'
export default {
  name: "App",

  components: {
    textField,
  },

  data: () => ({
    json:json,
    MainItem: 
    {
      Text:'text',
      Value:'TestValue',
      Description: "Description" 
    }
  }),
  methods: {
    Get(){
      this.Set(this.json);
    }
    ,
    Set(val) {
      console.log(val);
				if (val.Errors && val.Errors.length > 0) {
					this.ShowErrors(val);
				}
				if (val.Item) {

					var mainItems = val.Item;

					var model = new EditModel(mainItems)
					this.MainItem = model;
         for(var propertyName in this.MainItem) {
            var property=this.MainItem[propertyName];
            this.Add(property)
          }
				}
			},
    Add(item) {
      var componentClass = Vue.extend(textField);
      var instance = new componentClass({
        vuetify: vuetify,
        propsData: {
          type: "primary",
          property: item,
        },
      });
      //instance.$slots.default = ["Click me!"];
      instance.$mount(); // pass nothing
      this.$refs.container.appendChild(instance.$el);
    
    }
    ,AddProgr(property){
console.log(property);


    },
  },
};
</script>
