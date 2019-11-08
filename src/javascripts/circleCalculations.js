var revolution = 360
var degToRads = Math.PI/180
var radsToDegs = 180/Math.PI

var tierSizes = [8,15,22]
let calculateDataNeededForSecondRing = (innerDiameter,subCircleDiameter) =>{
  return Math.ceil(180 / (radsToDegs * Math.asin((1)/(1+ (innerDiameter)/(subCircleDiameter/2) ))))
}

let calculateSubCircleRadialDisplacement = (outerDiameter, numDataPoints) => {
  return ((outerDiameter)/(Math.sin(degToRads*calculateSubCircleFullAngle(numDataPoints)/2)+1))
}

let calculateSubCircleFullAngle = (numDataPoints) => {
  return (revolution / numDataPoints)
}

let calculateNewOuterDiameter = (fixedSubCircleRadius,numDataPoints) => {
  return fixedSubCircleRadius * (1 + (1)/(Math.sin(degToRads * ((revolution/2)/numDataPoints))))
}

let calculateSubCircleRotationAngle = (rotationCoefficient,numDataPoints) => {
  return Number(rotationCoefficient * calculateSubCircleFullAngle(numDataPoints))
}

let calculateSubCircleDiameter = (outerDiameter, numDataPoints) => {
  return outerDiameter * 2*(1 - ((1)/(1 + Math.sin(degToRads*(calculateSubCircleFullAngle(numDataPoints))/2))))
}

let calculateNewRadialDisplacement = (fixedSubCircleRadius,numDataPoints) => {
  return calculateNewOuterDiameter(fixedSubCircleRadius,numDataPoints) - fixedSubCircleRadius
}

let distributeData = (data) => {
  return Object.entries(data).reduce((array,datapoint,index)=>{
    if(index < tierSizes[0]){
      if(!array[0]){
        array[0] = {}
      }
      array[0][datapoint[0]] = datapoint[1]
    } else if(index < tierSizes[0] + tierSizes[1]){
      if(!array[1]){
        array[1] = {}
      }
      array[1][datapoint[0]] = datapoint[1]
    } else if (index < tierSizes[0] + tierSizes[1] + tierSizes[2]){
      if(!array[2]){
        array[2] = {}
      }
      array[2][datapoint[0]] = datapoint[1]
    } else {
      console.error("No more than 45 datapoints are supported for this component")
    }
    return array
  },[])
}

let circleTiers = (data,diameter) => {
  let dataArray = distributeData(data)
  let subCircleDiameter = 0;
  let outerDiameter = 0

  if(Object.keys(data).length > 8){
    subCircleDiameter = calculateSubCircleDiameter(diameter,8)
  } else {
    subCircleDiameter = calculateSubCircleDiameter(diameter,data.length)
  }
  let dA = dataArray.map((circleTier,index)=>{
    if(index === 0){
      outerDiameter = diameter
    } else {
      let numDataPoints = tierSizes[index]
      outerDiameter = calculateNewOuterDiameter(subCircleDiameter/2,numDataPoints)
    }
    return { data: circleTier, outerDiameter }
  })
  return dA;
}

let largestDiameter = (data,diameter) => {
  return circleTiers(data,diameter).map(circleTier=>circleTier.outerDiameter).sort((a,b)=>b-a)[0]
}


module.exports = {
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