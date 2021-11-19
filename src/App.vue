<template>
  <v-app>
    <v-main><v-container fluid>
      <!-- <div>{{MainItem.Prop1.Value}}</div> -->
      <v-row  ref="container"></v-row>
      </v-container>
    </v-main>
    <v-btn @click="Get">add</v-btn>
  </v-app>
</template>

<script>
import json from "./components/data.json";
import { EditModel } from "./EditModel.js";
import textField from "./components/textField";
import formColumn from "./components/formColumn";
import Vue from "vue";
import vuetify from "./plugins/vuetify";
export default {
  name: "App",

  components: {
    textField,formColumn
  },

  data: () => ({
    json: json,
    MainItem: {
      Text: "text",
      Value: "TestValue",
      Description: "Description",
    },
  }),
  methods: {
    Get() {
      this.Set(this.json);
    },
    Set(val) {
      if (val.Errors && val.Errors.length > 0) {
        this.ShowErrors(val);
      }
      if (val.Item) {
        var mainItems = val.Item;

        var model = new EditModel(mainItems);
        this.MainItem = model;
        for (var column in this.MainItem.Columns) {

          column=this.MainItem.Columns[column];
         var colEl= this.AddColumn();
          for (var propertyName in this.MainItem) {
            var property = this.MainItem[propertyName];
            if(column==property.Column)
            {
               this.AddField(property,colEl);
            }          

          }

        }
      }
    },
    AddColumn() {
      var componentClass = Vue.extend(formColumn);
      var instance = new componentClass({
        vuetify: vuetify,
       });
      //instance.$slots.default = ["Click me!"];
      instance.$mount(); // pass nothing
     this.$refs.container.appendChild(instance.$el);
     return instance.$el;
     
    },
    AddField(item,container) {
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
     // this.$refs.container.appendChild(instance.$el);
     container.appendChild(instance.$el);
    },
  },
};
</script>
