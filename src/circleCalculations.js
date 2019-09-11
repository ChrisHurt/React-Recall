var revolution = 360
var degToRads = Math.PI/180
var radsToDegs = 180/Math.PI

var tierSizes = [8,15,22]


let seedData = (numDataPoints) => {
  let seed = {}
  for(let i = 0; i < numDataPoints; i++){
    seed[i] = i;
  }
  return seed
}

let calculateDataNeededForSecondRing = (innerDiameter,subCircleDiameter) =>{
  return Math.ceil(180 / (radsToDegs * Math.asin((1)/(1+ (innerDiameter)/(subCircleDiameter/2) ))))
}

let calculateSubCircleRadialDisplacement = (outerDiameter, data) => {
  return ((outerDiameter)/(Math.sin(degToRads*calculateSubCircleFullAngle(data)/2)+1))
}

let calculateSubCircleFullAngle = (data) => {
  return (revolution / Object.entries(data).length)
}

let calculateNewOuterDiameter = (fixedSubCircleRadius,numDataPoints) => {
  return fixedSubCircleRadius * (1 + (1)/(Math.sin(degToRads * ((revolution/2)/numDataPoints))))
}

let calculateSubCircleRotationAngle = (rotationCoefficient,data) => {
  return Number(rotationCoefficient * calculateSubCircleFullAngle(data))
}

let calculateSubCircleDiameter = (outerDiameter, data) => {
  return outerDiameter * 2*(1 - ((1)/(1 + Math.sin(degToRads*(calculateSubCircleFullAngle(data))/2))))
}



let calculateNewRadialDisplacement = (fixedSubCircleRadius,numDataPoints) => {
  return calculateNewOuterDiameter(fixedSubCircleRadius,numDataPoints) - fixedSubCircleRadius
}

// let calculateNewRadialDisplacement = (fixedSubCircleRadius,knownOuterDiameter) => {
//   return knownOuterDiameter - fixedSubCircleRadius
// }

let distributeData = (data) => {
  return Object.entries(data).reduce((array,datapoint,index)=>{
    if(index <= 7){
      if(!array[0]){
        array[0] = {}
      }
      array[0][datapoint[0]] = datapoint[1]
    } else if(index <= 22){
      if(!array[1]){
        array[1] = {}
      }
      array[1][datapoint[0]] = datapoint[1]
    } else {
      if(!array[2]){
        array[2] = {}
      }
      array[2][datapoint[0]] = datapoint[1]
    }
    return array
  },[])
}

let circleTiers = (data,diameter) => {
  let dataArray = distributeData(data)
  let subCircleDiameter = 0;
  let outerDiameter = 0

  if(Object.keys(data).length > 8){
    subCircleDiameter = calculateSubCircleDiameter(diameter,seedData(8))
  } else {
    subCircleDiameter = calculateSubCircleDiameter(diameter,data)
  }
  let dA = dataArray.map((circleTier,index)=>{
    if(index === 0){
      outerDiameter = diameter
    } else {
      let numDataPoints = tierSizes[index]
      outerDiameter = calculateNewOuterDiameter(subCircleDiameter/2,numDataPoints)
    }
    // dataArray[index] = circleTier
    return { data: circleTier, outerDiameter }
  })
  // console.log(dA)
  return dA
}

let largestDiameter = (data,diameter) => {

  return circleTiers(data,diameter).map(circleTier=>circleTier.outerDiameter).sort((a,b)=>b-a)[0]
}

module.exports = {
  seedData,
  calculateDataNeededForSecondRing,
  calculateSubCircleRadialDisplacement,
  calculateSubCircleFullAngle,
  calculateNewOuterDiameter,
  calculateSubCircleRotationAngle,
  calculateSubCircleDiameter,
  calculateNewRadialDisplacement,
  distributeData,
  circleTiers,
  largestDiameter
}