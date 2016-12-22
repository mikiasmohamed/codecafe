import Vue from 'vue';
import Vue2Filters from 'vue2-filters';
import './drinks.scss';
import template from './drinks.html';
import _ from 'underscore';
import {
  LoadingState
} from 'src/main';
import {
  drinksResource
} from 'src/helpers/resources';

Vue.use(Vue2Filters);

export default Vue.extend({
  template,
  data() {
    return {
      drinks: [],
      message: null,
      modifiers: [],
      components: [],
      store: {
        name: null
      },
      modifiersSection: false,
      componentsSection: false,
      purchased: false,
      drinkSearch: '',
      modifierSearch: '',
      componentSearch: ''
    };
  },
  computed: {
    selectedDrinks: function() {
      return this.drinks.filter(function(drink) {
        return drink.checked;
      }).map(function(drink) {
        return drink.quantity * parseFloat(drink.price);
      });
    },
    selectedModifiers: function() {
      return this.modifiers.filter(function(modifier) {
        return modifier.checked;
      }).map(function(modifier) {
        return modifier.quantity * parseFloat(modifier.price);
      });
    },
    selectedComoponents: function() {
      return this.components.filter(function(component) {
        return component.checked;
      }).map(function(component) {
        return component.quantity * parseFloat(component.price);
      });
    },
    total: function() {
      if (this.selectedDrinks && this.selectedDrinks.length > 0) {
        return this.selectedDrinks.concat(this.selectedModifiers).concat(this.selectedComoponents).reduce(function(a, b) {
          return a + b;
        });
      }
      return 0;
    }
  },

  created() {
    this.fetchDrinks();
  },

  methods: {
    fetchDrinks() {
      LoadingState.$emit('toggle', true);
      return drinksResource.get().then((response) => {
        this.drinks = response.data.drinks;
        this.message = response.data.message;
        this.modifiers = response.data.modifiers;
        this.components = response.data.components;
        this.store.name = response.data.store.name;
        LoadingState.$emit('toggle', false);
      }, (errorResponse) => {
        // Handle error...
        console.log('API responded with:', errorResponse.status);
        LoadingState.$emit('toggle', false);
      });
    },
    toggleModifiers: function(event) {
      event.preventDefault();
      this.modifiersSection = !this.modifiersSection;
    },
    toggleComponents: function(event) {
      event.preventDefault();
      this.componentsSection = !this.componentsSection;
    },
    purchase: function(event) {
      event.preventDefault();
      if (this.total > 0) {
        this.purchased = true;
        this.notify = this.message + '; your total is $' + this.total + '.';
        this.total = 0;
        _.each(this.drinks, function(drink) {
          drink.checked = false;
          drink.quantity = 0;
        });
      }
    }
  }
});
