import {profileService, recordsService} from '../services'
import { router } from '../router'

const initialState = {
  recordsStatus: {},
  recordsList: [],
  newRecordStatus:{},
  newRecord:[],
  updateRecordStatus: {}
}

const validateRecordForm = (apptId, height,weight,diagnoses,labTesting,treatment, newPrescriptions) => {
  let errors = []
  if (!apptId) {
    errors.push(new Error('ApptId required.'))
  }
  if (!height) {
    errors.push(new Error('height required'))
  }
  if (!weight) {
    errors.push(new Error('weight required'))
  }
  if (!diagnoses) {
    errors.push(new Error('diagnoses required'))
  }
   if (labTesting!=0 && labTesting!=1) {
    errors.push(new Error('labTesting required'))
  }
  if (!treatment) {
    errors.push(new Error('treatment required'))
  }
   if (newPrescriptions!=0&&newPrescriptions!=1) {
    errors.push(new Error('newPrescriptions required'))
  }
  return errors
}
export const medicalRecords = {
  namespaced: true,
  state: initialState,
  mutations: {
    loadRecordsRequest (state) {
      state.recordsStatus = { loadingRecords: true }
    },
    loadRecordsSuccess (state, records) {
      state.recordsStatus = { loadedRecords: true }
      state.recordsList = records
    },
    loadRecordsFailure (state) {
      state.recordsStatus = { loadingRecordsFailure: true }
    },
      addRecordRequest (state, submittedRecord) {
      state.newRecordStatus= { addRecordRequest: true }
      state.newRecord = submittedRecord
    },
       addRecordSuccess (state,newRecord){
      state.newRecordStatus={postedNewRecord:true}
      state.newRecord=newRecord
    },
    updateRecRequest (state) {state.updateRecordStatus = {updatingRec: true}},
    updateRecSuccess (state) {
      state.recordsStatus = { loadedRecords: true }
      state.recordsList = records
    },
    updateRecFailure (state) {state.updateRecordStatus = {updateRec: true}},
  },
  actions: {
    receiveRecords (
      { dispatch, commit }, records) {
      commit('loadRecordsSuccess', records)
    },
    loadMedicalRecords (
      { dispatch, commit }) {
      commit('loadRecordsRequest')
      const patient = JSON.parse(localStorage.getItem('patient'))
      commit('loadRecordsSuccess', patient.records)
    },

    addRecord ({ dispatch, commit }, {apptId, patient, height, weight,diagnoses,labTesting, treatment,newPrescriptions, actualStartTime, actualEndTime}) {
      commit('addRecordRequest')
      let errors = validateRecordForm(apptId, height,weight,diagnoses,labTesting,treatment, newPrescriptions)
      if (errors.length === 0) {
        //confirm("add new medical record")
        recordsService.putRecord(apptId, patient.patientId, height, weight,diagnoses,labTesting, treatment, newPrescriptions, actualStartTime, actualEndTime)
             .then(
        response => {
          //commit('addRecordSuccess', {apptId, patientId , medicationId,  doseFormId, dosage, indication, datePrescribed})
          //const localUser = JSON.parse(localStorage.getItem('localUser'))
          profileService.getProfile(patient.patientId).then(
            response => {
              const patient = JSON.parse(localStorage.getItem('patient'))
              commit('loadRecordsSuccess', patient.records)
              //router.push('/doctor-dashboard')
            }
          )
          dispatch('alert/success', 'New Record Added', { root: true })
        }
      )
      }
      else{
        alert("Missing Fields")
      }
    },
    updateRecord ({ dispatch, commit, state }, recObject) {
      commit('updateRecRequest')
      recordsService.editRecord(recObject).then(
        response => {
          commit('loadRecRequest')
          profileService.getProfile(recObject.patient_id).then(
            response => {
              //const patient = JSON.parse(localStorage.getItem('patient'))
              //commit('updateRecSuccess', patient.records)
              dispatch('alert/success', 'Record Updated', { root: true })
            }
          )
        }
      )
    }
  }
}
