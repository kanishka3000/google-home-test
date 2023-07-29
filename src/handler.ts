// Sample function to simulate current energy generation (replace this with your actual implementation)
function getCurrentEnergyGeneration() {
    // Replace this with the logic to fetch the current energy generation status of your solar PV system
    // For demonstration purposes, we'll use a random value between 0 and 1000 kWh.
    return Math.floor(Math.random() * 1000);
}

// Handler for SYNC intent to discover devices
function handleSyncIntent(request) {
    const response = {
        requestId: request.requestId,
        payload: {
            agentUserId: 'user123',
            devices: [
                {
                    id: '123',
                    type: 'action.devices.types.SENSOR',
                    traits: ['action.devices.traits.EnergyStorage', 'action.devices.traits.SensorState'],
                    name: {
                        name: 'Simple sensor',
                    },
                    willReportState: true,
                    attributes: {
                        sensorStatesSupported: [
                            {
                                name: 'AirQuality',
                                descriptiveCapabilities: {
                                    availableStates: ['healthy', 'moderate', 'unhealthy', 'very unhealthy'],
                                },
                            },
                        ],
                        queryOnlyEnergyStorage: true,
                    },
                    deviceInfo: {
                        manufacturer: 'smart-home-inc',
                        model: 'hs1234',
                        hwVersion: '3.2',
                        swVersion: '11.4',
                    },
                },
            ],
        },
    };

    return response;
}

// Handler for QUERY intent to get the current energy generation
function handleQueryIntent(request) {
    const currentEnergyGeneration = getCurrentEnergyGeneration();
    const response = {
        requestId: "6894439706274654514",
        payload: {
            devices: {
                123: {
                    status: "SUCCESS",
                    online: true,
                    currentSensorStateData: [
                        {
                            name: "AirQuality",
                            currentSensorState: "unhealthy"
                        }
                    ],
                    descriptiveCapacityRemaining: "HIGH",
                    capacityRemaining: [
                        {
                            unit: "PERCENTAGE",
                            rawValue: 90
                        }
                    ]
                }
            }
        }
    }

    return response;
}

// Handler for EXECUTE intent to execute actions on devices
function handleExecuteIntent(request) {
    // Dummy implementation for EXECUTE intent
    // Replace this with your actual implementation to handle actions on devices
    const response = {
        requestId: request.requestId,
        payload: {
            commands: [
                {
                    ids: ['123'],
                    status: 'SUCCESS',
                    states: {},
                },
            ],
        },
    };

    return response;
}

export const handler = async (event, context) => {
    const requestBody = JSON.parse(event.body);
    const intent = requestBody.inputs[0].intent;
    let response;

    switch (intent) {
        case 'action.devices.SYNC':
            response = handleSyncIntent(requestBody);
            break;
        case 'action.devices.QUERY':
            response = handleQueryIntent(requestBody);
            break;
        case 'action.devices.EXECUTE':
            response = handleExecuteIntent(requestBody);
            break;
        default:
            // For unknown intents, return an empty response
            response = {
                requestId: requestBody.requestId,
                payload: {},
            };
    }

    const httpResponse = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(response),
    };

    return httpResponse;
};
