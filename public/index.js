'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [
  {
    'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
    'name': 'les-routiers-bretons',
    'pricePerKm': 0.05,
    'pricePerVolume': 5
  },
  {
    'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
    'name': 'geodis',
    'pricePerKm': 0.1,
    'pricePerVolume': 8.5
  },
  {
    'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
    'name': 'xpo',
    'pricePerKm': 0.10,
    'pricePerVolume': 10
  }
];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [
  {
    'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
    'shipper': 'bio-gourmet',
    'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
    'distance': 100,
    'volume': 4,
    'options':
    {
      'deductibleReduction': false
    },
    'price': 0,
    'commission':
    {
      'insurance': 0,
      'treasury': 0,
      'convargo': 0
    }
  },
  {
    'id': '65203b0a-a864-4dea-81e2-e389515752a8',
    'shipper': 'librairie-lu-cie',
    'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
    'distance': 650,
    'volume': 12,
    'options':
    {
      'deductibleReduction': true
    },
    'price': 0,
    'commission':
    {
      'insurance': 0,
      'treasury': 0,
      'convargo': 0
    }
  },
  {
    'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
    'shipper': 'otacos',
    'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
    'distance': 1250,
    'volume': 30,
    'options':
    {
      'deductibleReduction': true
    },
      'price': 0,
      'commission':
    {
      'insurance': 0,
      'treasury': 0,
      'convargo': 0
    }
  }
];

//list of actors for payment
//useful from exercise 5
const actors = [
  {
    'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
    'payment':
    [{
      'who': 'shipper',
      'type': 'debit',
      'amount': 0
    },
    {
      'who': 'owner',
      'type': 'credit',
      'amount': 0
    },
    {
      'who': 'treasury',
      'type': 'credit',
      'amount': 0
    },
    {
      'who': 'insurance',
      'type': 'credit',
      'amount': 0
    },
    {
      'who': 'convargo',
      'type': 'credit',
      'amount': 0
    }]
  },
  {
    'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
    'payment': [{
      'who': 'shipper',
      'type': 'debit',
      'amount': 0
    }, {
      'who': 'owner',
      'type': 'credit',
      'amount': 0
    }, {
      'who': 'treasury',
      'type': 'credit',
      'amount': 0
    }, {
      'who': 'insurance',
      'type': 'credit',
      'amount': 0
    }, {
      'who': 'convargo',
      'type': 'credit',
      'amount': 0
    }]
  },
  {
    'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
    'payment':
    [{
      'who': 'shipper',
      'type': 'debit',
      'amount': 0
    },
    {
      'who': 'owner',
      'type': 'credit',
      'amount': 0
    },
    {
      'who': 'treasury',
      'type': 'credit',
      'amount': 0
    },
    {
      'who': 'insurance',
      'type': 'credit',
      'amount': 0
    },
    {
      'who': 'convargo',
      'type': 'credit',
      'amount': 0
    }]
  }
];

//console.log(truckers);
//console.log(deliveries);
//console.log(actors);

function getDeliveryPrice(deliveries, truckers) {
  for (var i = 0; i < deliveries.length; i++) {
    var delivery_trucker_id = deliveries[i]["truckerId"]
    var trucker = findTruckerByID(truckers, delivery_trucker_id)
    var discount = calculDiscount(deliveries[i], trucker)
    deliveries[i]["price"] = calculPrice(deliveries[i], trucker, discount)
  }
}

function findTruckerByID(truckers, trucker_id) {
  for (var i = 0; i < truckers.length; i++) {
    if (truckers[i]["id"] == trucker_id) {
      return truckers[i]
    }
  }
}

function findDeliveryByID(deliveries, delivery_id) {
  for (var i = 0; i < deliveries.length; i++) {
    if (deliveries[i]["id"] == delivery_id) {
      return deliveries[i]
    }
  }
}

function calculPrice(delivery, trucker, discount) {
  return delivery["distance"] * trucker["pricePerKm"] + delivery["volume"] * discount * trucker["pricePerVolume"]
}

function calculDiscount(delivery, trucker) {
  if (delivery["volume"] > 25) {
    return 0.5
  }
  else if (delivery["volume"] > 10) {
    return 0.7
  }
  else if (delivery["volume"] > 5) {
    return 0.9
  }
  else {
    return 1
  }
}

function getCommission(delivery) {
  return delivery["price"] * 0.3
}

function getInsurance(delivery) {
  var commission = getCommission(delivery)
  return commission / 2
}

function getTreasury(delivery) {
  return Math.ceil(delivery["distance"] / 500) // Integer division
}

function getConvargo(delivery) {
  var commission = getCommission(delivery)
  var insurance = getInsurance(delivery)
  var treasury = getTreasury(delivery)
  return commission - insurance - treasury
}

function fillCommissionValues(deliveries) {
  for (var i = 0; i < deliveries.length; i++) {
    deliveries[i]['commission']["insurance"] = getInsurance(deliveries[i])
    deliveries[i]['commission']["treasury"] = getTreasury(deliveries[i])
    deliveries[i]['commission']["convargo"] = getConvargo(deliveries[i])
  }
}

function getAdditionalCharge(delivery) {
  var additional_charge = 0
  if (delivery["options"]["deductibleReduction"]) {
    additional_charge = delivery["volume"]
  }
  return additional_charge
}

function applyCharge(delivery, additional_charge) {
  delivery["price"] += additional_charge
  delivery['commission']["convargo"] += additional_charge
}

function chargeDrivers(deliveries) {
  for (var i = 0; i < deliveries.length; i++) {
    var additional_charge = getAdditionalCharge(deliveries[i])
    applyCharge(deliveries[i], additional_charge)
  }
}

function payShipper(actor, delivery) {
  actor["payment"][0]["amount"] = delivery["price"]
}

function payTrucker(actor, delivery) {
  var commission = getCommission(delivery)
  actor["payment"][1]["amount"] = delivery["price"] - commission
}

function payInsurance(actor, delivery) {
  actor["payment"][3]["amount"] = getInsurance(delivery)
}

function payTreasury(actor, delivery) {
  actor["payment"][2]["amount"] = getTreasury(delivery)
}

function payConvargo(actor, delivery) {
  actor["payment"][4]["amount"] = getConvargo(delivery) + delivery["volume"]
}

function payActors(actors, deliveries) {
  for (var i = 0; i < actors.length; i++) {
    var delivery_id = actors[i]["deliveryId"]
    var delivery = findDeliveryByID(deliveries, delivery_id)
    payShipper(actors[i], delivery)
    payTrucker(actors[i], delivery)
    payTreasury(actors[i], delivery)
    payInsurance(actors[i], delivery)
    payConvargo(actors[i], delivery)
  }
}

getDeliveryPrice(deliveries, truckers)
fillCommissionValues(deliveries)
chargeDrivers(deliveries)
payActors(actors, deliveries)
console.log(actors);
