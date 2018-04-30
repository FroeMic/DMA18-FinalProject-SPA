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

            <v-form v-model="valid" ref="form" :lazy-validation="false">
              <v-layout row wrap>
                <v-flex xs12 md6>
                  <label>What is your median family income per year?</label>
                  <v-text-field
                    label="Median Family Income per Year"
                    v-model="medianFamilyIncome"
                    type="number"
                    :rules="medianFamilyIncomeRules"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>  
                  <label>What is your median personal income per year?</label>
                  <v-text-field
                    label="Median Personal Income per Year"
                    v-model="medianFamilyIncome"
                    type="number"
                    :rules="medianPersonalIncomeRules"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md8>
                  <label>What type of property is the home loan for?</label>
                  <v-select
                    ref="propertyTypeSelect"
                    label="Property Type"
                    :items="propertyTypeNameOptions"
                    v-model="propertyTypeName"
                    :rules="propertyTypeNameRules"
                    single-line
                    required
                  ></v-select>
                </v-flex>
                <v-flex md4 class="zero-height"></v-flex>
                <v-flex xs12 md8>
                  <label>What's the purpose of the loan?</label>
                  <v-select
                    ref="loanPurposeNameSelect"
                    label="Loan Purpose"
                    :items="loanPurposeNameOptions"
                    v-model="loanPurposeName"
                    :rules="loanPurposeNameRules"
                    single-line
                    required
                  ></v-select>
                </v-flex>
                <v-flex md4 class="zero-height"></v-flex>
                <v-flex xs12 md6>
                  <label>Did you request preapproval?</label>
                  <v-select
                    ref="preApprovalNameSelect"
                    label="Preapproval Name"
                    :items="preApprovalNameOptions"
                    v-model="preApprovalName"
                    :rules="preApprovalNameRules"
                    single-line
                    required
                  ></v-select>
                </v-flex>
                <v-flex md4 class="zero-height"></v-flex>
                <v-flex xs12 md6>
                  <label>Is this a HOEPA loan?</label>
                  <v-select
                    ref="hopaStatusSelect"
                    label="HOEPA Status"
                    :items="hopeaStatusOptions"
                    v-model="hopeaStatus"
                    :rules="hopeaStatusNameRules"
                    single-line
                    required
                  ></v-select>
                </v-flex>
                <v-flex md6 class="zero-height"></v-flex>
                <v-flex xs12 md6>
                  <label>What's your gender?</label>
                  <v-select
                    ref="applicantSexSelect"
                    label="Applicant Sex"
                    :items="applicantSexOptions"
                    v-model="applicantSex"
                    :rules="applicantSexRules"
                    single-line
                    required
                  ></v-select>
                </v-flex>
                <v-flex md6 class="zero-height"></v-flex>
                <v-flex xs12 md6>
                  <label>What's your race?</label>
                  <v-select
                    ref="applicantRaceSelect"
                    label="Applicant Race"
                    :items="applicantRaceOptions"
                    v-model="applicantRace"
                    :rules="applicantRaceRules"
                    single-line
                    required
                  ></v-select>
                </v-flex>
                <v-flex md6 class="zero-height"></v-flex>
                <v-flex xs12 md6>
                  <label>What's your co-applicants gender?</label>
                  <v-select
                    ref="coApplicantSexSelect"
                    label="Co-Applicant Sex"
                    :items="coApplicantSexOptions"
                    v-model="coApplicantSex"
                    :rules="coApplicantSexRules"
                    single-line
                    required
                  ></v-select>
                </v-flex>
                <v-flex md6 class="zero-height"></v-flex>
                <v-flex xs12 md6>
                  <label>What's your co-applicants race?</label>
                  <v-select
                    ref="coApplicantRaceSelect"
                    label="Co-Applicant Race"
                    :items="coApplicantRaceOptions"
                    v-model="coApplicantRace"
                    :rules="coApplicantRaceRules"
                    single-line
                    required
                  ></v-select>
                </v-flex>
              </v-layout>

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
      propertyTypeNameRules: [
        v => !!v || 'Property Type is required'
      ],
      preApprovalNameRules: [
        v => !!v || 'Preapproval Name is required'
      ],
      loanPurposeNameRules: [
        v => !!v || 'Loan Purpose is required'
      ],
      hopeaStatusNameRules: [
        v => !!v || 'Hopea Status is required'
      ],
      applicantSexRules: [
        v => !!v || 'Applicant Sex is required'
      ],
      applicantRaceRules: [
        v => !!v || 'Applicant Race is required'
      ],
      coApplicantSexRules: [
        v => !!v || 'Co-Applicant Race is required'
      ],
      coApplicantRaceRules: [
        v => !!v || 'Co-Applicant Race is required'
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
          this.$refs.propertyTypeSelect.validate()
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
          this.$refs.preApprovalNameSelect.validate()
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
          this.$refs.loanPurposeNameSelect.validate()
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
          this.$refs.hopaStatusSelect.validate()
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
          this.$refs.applicantSexSelect.validate()
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
          this.$refs.applicantRaceSelect.validate()
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
          this.$refs.coApplicantSexSelect.validate()
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
          this.$refs.coApplicantRaceSelect.validate()
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

  form {
    margin-top: 40px;
  }

  label {
    font-weight: 700;
  }

  .zero-height {
    height: 0 !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
</style>
