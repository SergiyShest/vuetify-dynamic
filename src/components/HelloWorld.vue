<template>
  <v-container>
    <v-row class="text-center">



      <v-col
        class="mb-5"
        cols="12"
      >


        <v-row justify="center">
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-row>
      </v-col>

  


    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data() {
			return {
				MainItem: {},
				ColumCount: 1,
				loadingData: true,
				IsChanged: false,

				alert: { show: false, message: null },
				EnableSaveForm: false,
 whatsNext: [
        {
          text: 'Explore components',
          href: 'https://vuetifyjs.com/components/api-explorer',
        },
        {
          text: 'Select a layout',
          href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
        },
        {
          text: 'Frequently Asked Questions',
          href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
        },
      ],
				
			}
  }
  }
</script>
