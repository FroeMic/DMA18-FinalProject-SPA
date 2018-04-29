<template>
  <div class="hmda-form" >


  <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1>

            <h3>HMDA Form</h3>
            <div>
              Enter the following information to get a personalized predicion on how much money you can expect when applying for a home loan.
            </div>
            <div>
              (We do not save any of the information you enter on our servers.)
            </div>

            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                label="Median Family Income per Year"
                v-model="medianFamilyIncome"
                type="number"
                :rules="medianFamilyIncomeRules"
                required
              ></v-text-field>
              <v-text-field
                label="Median Personal Income per Year"
                v-model="medianFamilyIncome"
                type="number"
                :rules="medianPersonalIncomeRules"
                required
              ></v-text-field>
              <v-select
                label="Purchaser Type"
                :items="purchaserTypeNameOptions"
                v-model="purchaserTypeName"
                :rules="purchaserTypeNameRules"
                single-line
                required
              ></v-select>
              <v-select
                label="Property Type"
                :items="propertyTypeNameOptions"
                v-model="propertyTypeName"
                :rules="propertyTypeNameRules"
                single-line
                required
              ></v-select>
              <v-select
                label="Preapproval Name"
                :items="preApprovalNameOptions"
                v-model="preApprovalName"
                :rules="preApprovalNameRules"
                single-line
                required
              ></v-select>
              <v-select
                label="Loan Purpose"
                :items="loanPurposeNameOptions"
                v-model="loanPurposeName"
                :rules="loanPurposeNameRules"
                single-line
                required
              ></v-select>
              <v-select
                label="HOEPA Status"
                :items="hopeaStatusOptions"
                v-model="hopeaStatus"
                :rules="hopeaStatusNameRules"
                single-line
                required
              ></v-select>
              <v-select
                label="Applicant Sex"
                :items="applicantSexOptions"
                v-model="applicantSex"
                :rules="applicantSexRules"
                single-line
                required
              ></v-select>
              <v-select
                label="Applicant Race"
                :items="applicantRaceOptions"
                v-model="applicantRace"
                :rules="applicantRaceRules"
                single-line
                required
              ></v-select>
              <v-select
                label="Co-Applicant Sex"
                :items="coApplicantSexOptions"
                v-model="coApplicantSex"
                :rules="coApplicantSexRules"
                single-line
                required
              ></v-select>
              <v-select
                label="Co-Applicant Race"
                :items="coApplicantRaceOptions"
                v-model="coApplicantRace"
                :rules="coApplicantRaceRules"
                single-line
                required
              ></v-select>

              <v-btn @click="submit" :disabled="!valid">
                submit
              </v-btn>
              <v-btn @click="clear">
                clear
              </v-btn>
            </v-form>

        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'

  export default Vue.extend({
    props: {
    },
    data: () => ({
      valid: false,
      medianFamilyIncomeRules: [
        v => !!v || 'Median Family Income is required'
      ],
      medianPersonalIncomeRules: [
        v => !!v || 'Median Personal Income is required'
      ],
      purchaserTypeNameRules: [
        // v => {
        //   console.log(v, !!v)
        //   return !!v || 'Purchaser Type is required'
        // }
      ],
      propertyTypeNameRules: [
        // v => !!v || 'Property Type is required'
      ],
      preApprovalNameRules: [
        // v => !!v || 'Preapproval Name is required'
      ],
      loanPurposeNameRules: [
        // v => !!v || 'Loan Purpose is required'
      ],
      hopeaStatusNameRules: [
        // v => !!v || 'Hopea Status is required'
      ],
      applicantSexRules: [
        // v => !!v || 'Applicant Sex is required'
      ],
      applicantRaceRules: [
        // v => !!v || 'Applicant Race is required'
      ],
      coApplicantSexRules: [

      ],
      coApplicantRaceRules: [

      ],
      purchaserTypeNameOptions: [
        'Life insurance company, credit union, mortgage bank, or finance company',
        'Ginnie Mae (GNMA)', 'Fannie Mae (FNMA)',
        'Other type of purchaser',
        'Loan was not originated or was not sold in calendar year covered by register',
        'Freddie Mac (FHLMC)', 'Commercial bank, savings bank or savings association',
        'Private securitization', 'Affiliate institution', 'Farmer Mac (FAMC)'
      ],
      propertyTypeNameOptions: [
        'One-to-four family dwelling (other than manufactured housing)',
        'Manufactured housing',
        'Multifamily dwelling'
      ],
      preApprovalNameOptions: [
        'Not applicable', 'Preapproval was not requested', 'Preapproval was requested'
      ],
      loanPurposeNameOptions: [
        'Home purchase', 'Refinancing', 'Home improvement'
      ],
      hopeaStatusOptions: [
        'Not a HOEPA loan', 'HOEPA loan'
      ],
      applicantSexOptions: [
        'Not applicable',
        'Female',
        'Male',
        'Not applicable'
      ],
      applicantRaceOptions: [
        'White',
        'Native Hawaiian or Other Pacific Islander',
        'Black or African American',
        'Asian',
        'American Indian or Alaska Native',
        'Not applicable'
      ],
      coApplicantSexOptions: [
        'No co-applicant',
        'Female',
        'Male',
        'Not applicable'
      ],
      coApplicantRaceOptions: [
        'White',
        'Native Hawaiian or Other Pacific Islander',
        'Black or African American',
        'Asian',
        'American Indian or Alaska Native',
        'No co-applicant'
      ]
    }),
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters([
        'loanForm',
        'map'
      ]),

      // form fields
      medianFamilyIncome: {
        get () {
          return this.loanForm['medianFamilyIncome']
        },
        set (value) {
          this.$store.commit('setLoanFormField', {
            'name': 'medianFamilyIncome',
            'value': value
          })
        }
      },
      medianPersonalIncome: {
        get () {
          return this.loanForm['medianPersonalIncome']
        },
        set (value) {
          this.$store.commit('setLoanFormField', {
            'name': 'medianPersonalIncome',
            'value': value
          })
        }
      },
      purchaserTypeName: {
        get () {
          return this.loanForm['purchaserTypeName']
        },
        set (value) {
          this.$store.commit('setLoanFormField', {
            'name': 'purchaserTypeName',
            'value': value
          })
        }
      },
      propertyTypeName: {
        get () {
          return this.loanForm['propertyTypeName']
        },
        set (value) {
          this.$store.commit('setLoanFormField', {
            'name': 'propertyTypeName',
            'value': value
          })
        }
      },
      preApprovalName: {
        get () {
          return this.loanForm['preApprovalName']
        },
        set (value) {
          this.$store.commit('setLoanFormField', {
            'name': 'preApprovalName',
            'value': value
          })
        }
      },
      loanPurposeName: {
        get () {
          return this.loanForm['loanPurposeName']
        },
        set (value) {
          this.$store.commit('setLoanFormField', {
            'name': 'loanPurposeName',
            'value': value
          })
        }
      },
      hopeaStatus: {
        get () {
          return this.loanForm['hopeaStatus']
        },
        set (value) {
          this.$store.commit('setLoanFormField', {
            'name': 'hopeaStatus',
            'value': value
          })
        }
      },
      applicantSex: {
        get () {
          return this.loanForm['applicantSex']
        },
        set (value) {
          this.$store.commit('setLoanFormField', {
            'name': 'applicantSex',
            'value': value
          })
        }
      },
      applicantRace: {
        get () {
          return this.loanForm['applicantRace']
        },
        set (value) {
          this.$store.commit('setLoanFormField', {
            'name': 'applicantRace',
            'value': value
          })
        }
      },
      coApplicantSex: {
        get () {
          return this.loanForm['coApplicantSex']
        },
        set (value) {
          this.$store.commit('setLoanFormField', {
            'name': 'coApplicantSex',
            'value': value
          })
        }
      },
      coApplicantRace: {
        get () {
          return this.loanForm['coApplicantRace']
        },
        set (value) {
          this.$store.commit('setLoanFormField', {
            'name': 'coApplicantRace',
            'value': value
          })
        }
      }
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('loadPredictionData').then((response) => {
            this.$router.push('/')
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  })
</script>

<style scoped>

</style>
