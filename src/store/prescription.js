import {appointmentService, prescriptionService, profileService, userService} from '../services'
import { router } from '../router'
import {doctor} from "./doctor";
import NewPrescription from "../components/NewPrescription";

const initialState = {
  rxStatus: {},
  rxList: [],
  newRxStatus:{},
  newRx:[]
}

const validatePrescriptionForm = (apptId, medicationId, doseFormId, dosage,indication) => {
  let errors = []
  if (!apptId) {
    errors.push(new Error('ApptId required.'))
  }
  if (!medicationId) {
    errors.push(new Error('medicationId required'))
  }
  if (!doseFormId) {
    errors.push(new Error('doseForm required'))
  }
  if (!dosage) {
    errors.push(new Error('dosage required'))
  }
  if (!indication) {
    errors.push(new Error('indication required'))
  }
  return errors
}

const checkComplete = (prescription) => {
  let complete = true
  for (let [value] of Object.entries(prescription)) {
    if (value.length === 0) {
      complete = false
    }
  }
  return complete
}

export const prescription = {
  namespaced: true,
  state: initialState,
  mutations: {
    loadRxRequest (state) {
      state.rxStatus = { loadingRx: true }
    },
    loadRxSuccess (state, rxs) {
      state.rxStatus = { loadedRx: true }
      state.rxList = rxs
      // document.write(state.rxList)
      console.log(state.rxList)
    },
    loadRxFailure (state) {
      state.rxStatus = { loadingRxFailure: true }
    },
    receiveRx (state, rxs) {
      state.rxStatus = { loadedRx: true }
      state.rxList = rxs
    },
    loadingNewRxSuccess (state, newPrescrition) {
      state.newRxStatus = {
        newRxComplete: checkComplete(newPrescrition)
      }
      state.newRxStatus= newPrescription
    },
     addRxRequest (state, submittedRx) {
      state.newRxStatus= { addRxRequest: true }
      state.newRx = submittedRx
    },
  },
  actions: {
    loadPrescriptions ({ dispatch, commit,state}) {
      commit('loadRxRequest')
      const patient = JSON.parse(localStorage.getItem('patient'))
      commit('loadRxSuccess', patient.prescriptions)
    },
    addPrescription ({ dispatch, commit }, { apptId, patient , medicationId, doseFormId, dosage, indication, datePrescribed }) {
      alert("action entered")
      commit('addRxRequest')
      let errors = validatePrescriptionForm(apptId, medicationId, doseFormId, dosage, indication)
      if (errors.length === 0) {
        prescriptionService.putPrescription(apptId, patient.patientId , medicationId,  doseFormId, dosage, indication, datePrescribed)
      }
      else{
        alert("Missing Fields")
      }
    }
  }
}

