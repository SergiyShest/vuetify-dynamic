<template>
  <v-row>
    <v-col cols="3" no-gutters
      ><v-label>{{ property.Text }}:</v-label></v-col
    >
    <v-col cols="8">
      <v-text-field v-if="property.ControlType == 'TextField'"
        :class="type"
        :type="property.DataType"
        v-model="property.Value"
        :readonly="property.Readonly"
        :placeholder="property.Description"
        outlined
        hide-details="auto"
        :rules="property.Rules"
        :background-color="BackgroundColor"
      />
      <div v-if="property.ControlType == 'Select'" >

     
      <v-select 
        v-model="property.Value"
        :items="property.AvaiableValues"
        item-text="Name"
        item-value="Id"
        :placeholder="property.Description"
        outlined
        hide-details="auto"
        :rules="property.Rules"
        :background-color="BackgroundColor"
      />
      </div>
    </v-col>
  </v-row>
</template>
,
<script>
export default {
  name: "textField",
  props: ["type", "property"],
  data: () => ({
    dataType: "date",
  }),
  computed: {
    BackgroundColor: function name() {
      if (this.property.Readonly) {
        return "#CCC";
      }
      return this.property.IsChanged ? "#FFF" : "#EEE";
    },
  },
};
</script>
<style scoped>
button.primary {
  background: blue;
  color: white;
}
</style>