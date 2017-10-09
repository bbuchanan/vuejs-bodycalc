<template>
<div style="margin: 20px">
  <form>
    <div class="row">
      <div class="col-md-3 col-sm-3">
        <div class="form-group">
          <label for="height">Height (ft/in)</label>
          <div class="input-group">
            <input type="number" v-model="feet" class="form-control height-input" placeholder="ft">
            <input type="number" v-model="inches" class="form-control height-input" placeholder="in">
            <span class="static-text-align">{{ calcHeight }}"</span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-3">
        <div class="form-group">
          <label for="weight">Weight (pounds)</label>
          <input type="number" v-model="weight" class="form-control" placeholder="Weight">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 col-sm-3">
        <div class="form-group">
          <label for="shoulders">Shoulders (inches)</label>
          <input type="number" v-model="shoulders" class="form-control" placeholder="Shoulders">
        </div>
      </div>
      <div class="col-md-3 col-sm-3">
        <div class="form-group">
          <label for="chest">Chest (inches)</label>
          <input type="number" v-model="chest" class="form-control" placeholder="Chest">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 col-sm-3">
        <div class="form-group">
          <label for="waist">Waist (inches)</label>
          <input type="number" v-model="waist" class="form-control" placeholder="Waist">
        </div>
      </div>
      <div class="col-md-3 col-sm-3">
        <div class="form-group">
          <label for="hips">Hips (inches)</label>
          <input type="number" v-model="hips" class="form-control" placeholder="Hips">
        </div>
      </div>
    </div>
    <button type="submit" @click.self.prevent="calculate" class="btn btn-primary">Calculate</button>
  </form>
  <p>&nbsp;</p>
  <div class="row">
    <div class="col-md-3 col-sm-3">
      <div class="panel panel-default">
        <div class="panel-heading">Your Body Type</div>
        <div class="panel-body">
          {{ bodyType == '' ? 'Press Calculate to determine body type' : bodyType }}
        </div>
      </div>
    </div>

    <div class="col-md-3 col-sm-3">
      <div class="panel panel-default">
        <div class="panel-heading">Body Category</div>
        <div class="panel-body">
          {{ bodyCategory }}
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {mapGetters} from 'Vuex'
import {mapActions} from 'Vuex'

export default {
  data() {
    return {
      feet: 5,
      inches: 5,
    }
  },
  computed: {
    bodyCategory: function() { return this.$store.getters.bodyCategory },
    calcHeight: function () {
      let height = parseInt(this.feet) * 12 + parseInt(this.inches)
      this.$store.commit('setHeight', height)
      this.$store.dispatch('calculateCategory')
      return height
    },
    height: {
      get() { return this.$store.state.height },
      set(value) { this.$store.commit('setHeight', parseFloat(value)) }
    },
    weight: {
      get() { return this.$store.state.weight },
      set(value) { this.$store.commit('setWeight', parseFloat(value)) }
    },
    shoulders: {
      get() { return this.$store.state.shoulders },
      set(value) { this.$store.commit('setShoulders', parseFloat(value)) }
    },
    chest: {
      get() { return this.$store.state.chest },
      set(value) { this.$store.commit('setChest', parseFloat(value)) }
    },
    waist: {
      get() { return this.$store.state.waist },
      set(value) { this.$store.commit('setWaist', parseFloat(value)) }
    },
    hips: {
      get() { return this.$store.state.hips },
      set(value) { this.$store.commit('setHips', parseFloat(value)) }
    },
    bodyType() {
      return this.$store.getters.bodyType
    }
  },
  methods: {
    calculate() {
      this.$store.dispatch('bodyCalculate')
    }
  }
}
</script>

<style scoped>
.height-input {
  max-width: 75px;
  width: 75px;
}

.static-text-align {
  vertical-align: bottom;
  margin-left: 5px;
}
</style>