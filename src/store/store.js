import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    height: 65,
    weight: 140,
    shoulders: 36,
    chest: 37,
    waist: 30,
    hips: 40,
    inseam: 30,
    bodyType: '',
    bodyCategory: ''
  },
  getters: {
    height: state => state.height,
    weight: state => state.weight,
    shoulders: state => state.shoulders,
    chest: state => state.chest,
    waist: state => state.waist,
    hips: state => state.waist,
    bodyType: state => state.bodyType,
    bodyCategory: state => state.bodyCategory
  },
  mutations: {
    setHeight: (state, value) => state.height = value,
    setWeight: (state, value) => state.weight = value,
    setShoulders: (state, value) => state.shoulders = value,
    setChest: (state, value) => state.chest = value,
    setWaist: (state, value) => state.waist = value,
    setHips: (state, value) => state.hips = value,
    calcualteCategory: (state) => {
      state.bodyCategory = 'Unknown'
      if (state.height > 48 && state.height <= 62) {
        if (state.weight < 110) {
          state.bodyCategory = 'Short Petite'
        }
        if (state.weight >= 100 && state.weight <= 145) {
          state.bodyCategory = 'Short Medium'
        }

        if (state.weight >= 135 && state.weight <= 170) {
          state.bodyCategory = 'Short Full'
        }

        if (state.weight > 155) {
          state.bodyCategory = 'Short Plus'
        }
      }

      if (state.height > 62 && state.height <= 67) {
        if (state.weight >= 90 && state.weight <= 125) {
          state.bodyCategory = 'Average Slender'
        }
        if (state.weight >= 115 && state.weight <= 170) {
          state.bodyCategory = 'Average Medium'
        }
        if (state.weight >= 155 && state.weight <= 195) {
          state.bodyCategory = 'Average Full'
        }
        if (state.weight > 180) {
          state.bodyCategory = 'Average Plus'
        }
      }

      if (state.height > 67) {
        if (state.weight >= 110 && state.weight <= 150) {
          state.bodyCategory = 'Tall Slender'
        }
        if (state.weight >= 135 && state.weight <= 195) {
          state.bodyCategory = 'Tall Medium'
        }
        if (state.weight >= 175 && state.weight <= 230) {
          state.bodyCategory = 'Tall Full'
        }
        if (state.weight > 205) {
          state.bodyCategory = 'Tall Plus'
        }
      }
    },
    bodyCalculate: (state) => {
      state.bodyType = 'Unknown'

      debugger
      // check for inverted triangle.
      let chestHipDiff = state.chest / state.hips
      if (chestHipDiff >= 1.05) {
        state.bodyType = 'Inverted Triangle'
      }

      // rectangle
      let rectInputs = [state.shoulders, state.hips, state.chest]
      rectInputs.sort((a, b) => a < b)
      let t = rectInputs[0] * 0.95
      let y = rectInputs[1]
      let z = rectInputs[2]

      if (y > t && z > t) {
        state.bodyType = 'Rectangle'
      }

      // triangle
      let hipsShoulderDiff = state.hips / state.chest
      if (hipsShoulderDiff > 1.05) {
        state.bodyType = 'Triangle'
      }

    // hourglass
    // waist is at least 25% smaller than shoulder
    let waistDiff = state.waist / state.shoulders
    let waistHipDiff = state.waist / state.hips
    let t2 = Math.max(state.hips, state.shoulders) * 0.95
    let y2 = Math.min(state.hips, state.shoulders)

    if (waistDiff < 0.75 && waistHipDiff < 0.75 && y2 > t2) {
      state.bodyType = 'Hourglass'
    }
  }
  },
  actions: {
    bodyCalculate: ({ commit }) => {
      commit('bodyCalculate')
    },
    calculateCategory: ({ commit }) => {
      commit('calcualteCategory')
    }
    },
});