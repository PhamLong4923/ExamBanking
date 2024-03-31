
const limit = {
    bankMode: {
        "0": {
            "name": "System",
            "bankLimit": null,
            "repoLimit": null,
            "secLimit": null,
            "quesLimit": null
        },
        "1": {
            "name": "Free",
            "bankLimit": 1,
            "repoLimit": 5,
            "secLimit": 3,
            "quesLimit": 50
        },
        "2": {
            "name": "Standard",
            "bankLimit": 1,
            "repoLimit": 7,
            "secLimit": 5,
            "quesLimit": 85
        },
        "3": {
            "name": "Premium",
            "bankLimit": 2,
            "repoLimit": 11,
            "secLimit": 7,
            "quesLimit": 125
        }
    }
};

export default limit;
