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
    addRxSuccess (state,newRx){
      state.rxStatus={postedNewRx:true}
      state.appt=newRx
    },
    updateRxRequest (state) {state.rxStatus = {updatingRx: true}},
    updateRxSuccess (state) {state.rxStatus = {updatedRx: true}},
    updateRxFailure (state) {state.rxStatus = {updateRx: true}},
  },
  actions: {
    loadPrescriptions ({ dispatch, commit,state}) {
      commit('loadRxRequest')
      const patient = JSON.parse(localStorage.getItem('patient'))
      commit('loadRxSuccess', patient.prescriptions)
    },
    addPrescription ({ dispatch, commit }, { apptId, patient , med, doseFormId, dosage, indication, datePrescribed }) {
      commit('addRxRequest')
      let errors = validatePrescriptionForm(apptId, med.medication_id, doseFormId, dosage, indication)
      if (errors.length === 0) {
        prescriptionService.addPrescription(apptId, patient.patientId , med.medication_id,  doseFormId, dosage, indication, datePrescribed)
      .then(
        response => {
          commit('addRxSuccess', {apptId, patientId , medicationId,  doseFormId, dosage, indication, datePrescribed})
          const localUser = JSON.parse(localStorage.getItem('localUser'))
          profileService.getProfile(localUser.patient_id).then(
            response => {
              const patient = JSON.parse(localStorage.getItem('patient'))
              patient.prescription = response.prescription
              localStorage.setItem('patient', JSON.stringify(patient))
              router.push('/dashboard')
            }
          )
          dispatch('alert/success', 'New Prescription Added', { root: true })
          alert("Prescription is added")
        }
      )
      }
      else{
        alert("Missing Fields")
      }
    },
    updateRx ({ dispatch, commit, state }, rxObject) {
      commit('updateRxRequest')
      prescriptionService.updatePrescription(rxObject).then(
        response => {
          commit('updateRxSuccess')
          commit('loadRxRequest')
          prescriptionService.getPrescriptions()
            .then(
              response => {
                const localUser = JSON.parse(localStorage.getItem('localUser'))
                localUser.prescription = response.prescription
                localStorage.setItem('localUser', JSON.stringify(localUser))
                commit('updateRxSuccess', response.prescription)
                dispatch('alert/success', 'Prescription Updated', { root: true })
              },
              error => {
                commit('updateRxFailure')
                dispatch('alert/error', error, { root: true })
              }
            )
          dispatch('alert/success', 'Prescription Updated', { root: true })
        })
    }
  }
}
