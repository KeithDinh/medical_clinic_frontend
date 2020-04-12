import {recordsService} from '../services'
import { router } from '../router'

const initialState = {
  recordsStatus: {},
  recordsList: [],
  newRecordStatus:{},
  newRecord:[]
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
   console.log(errors)
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
  },
  actions: {
    receiveRecords (
      { dispatch, commit }, records) {
      commit('loadRecordsSuccess', records)
    },
    loadMedicalRecords (
      { dispatch, commit }) {
      commit('loadRecordsRequest')
      const localUser = JSON.parse(localStorage.getItem('localUser'))
      commit('loadRecordsSuccess', localUser.records)
    },

    addRecord ({ dispatch, commit }, {apptId, patient, height, weight,diagnoses,labTesting, treatment,newPrescriptions, actualStartTime, actualEndTime}) {
      alert("action entered")
      commit('addRecordRequest')
      let errors = validateRecordForm(apptId, height,weight,diagnoses,labTesting,treatment, newPrescriptions)
      if (errors.length === 0) {
        alert("call put record")
        recordsService.putRecord(apptId, patient.patientId, height, weight,diagnoses,labTesting, treatment, newPrescriptions, actualStartTime, actualEndTime)
          .then(
            response => {
            }
          )
      }
      else{
        alert("Missing Fields")
        console.log(errors)
      }
    }
  }

}

