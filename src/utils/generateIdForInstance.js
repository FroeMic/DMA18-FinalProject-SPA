import numpad from './numpad'

/**
 * Generates an ID for an instance from the api.
 */
export default function generateIdForInstance (instance) {
  let stateCode = instance.state_code ? Number(instance.state_code) : 0
  let countyCode = instance.county_code ? Number(instance.county_code) : 0
  let censusTractName = instance.census_tract ? Number(instance.census_tract) : 0.0
  let censusTractNumber = instance.census_tract_number ? Number(instance.census_tract_number) : 0.0

  return [
    numpad(stateCode, 2),
    numpad(countyCode, 3),
    numpad(censusTractName, 6),
    numpad(censusTractNumber, 4, 2)
  ].join('-')
}
