define({ "api": [
  {
    "type": "delete",
    "url": "/ctf",
    "title": "Deletes a single ctf",
    "group": "CTF",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf._id",
            "description": "<p>ctf id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf.version",
            "description": "<p>ctf version number</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf.about",
            "description": "<p>ctf's about</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf.startDate",
            "description": "<p>ctf's startDate</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf.finishDate",
            "description": "<p>ctf's finishDate</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": 564643,\n  \"version\": \"1.0.0\",\n  \"type\": \"ctf\",\n  \"startDate\": \"2019-8-20\",\n  \"finishDate\": \"2019-8-25\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/ctf/"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Auth error",
          "content": "HTTP/1.1 403 Forbidden",
          "type": "json"
        },
        {
          "title": "Delete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/ctf.ts",
    "groupTitle": "CTF",
    "name": "DeleteCtf"
  },
  {
    "type": "get",
    "url": "/ctf",
    "title": "Get a single ctf",
    "group": "CTF",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf._id",
            "description": "<p>ctf id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf.version",
            "description": "<p>ctf version number</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf.about",
            "description": "<p>ctf's about</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf.startDate",
            "description": "<p>ctf's startDate</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf.finishDate",
            "description": "<p>ctf's finishDate</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": 564643,\n  \"version\": \"1.0.0\",\n  \"type\": \"ctf\",\n  \"startDate\": \"2019-8-20\",\n  \"finishDate\": \"2019-8-25\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/ctf/"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Find error",
          "content": "HTTP/1.1 404 Not found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/ctf.ts",
    "groupTitle": "CTF",
    "name": "GetCtf"
  },
  {
    "type": "get",
    "url": "/ctf",
    "title": "List all CTFs",
    "group": "CTF",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "ctf",
            "description": "<p>list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf._id",
            "description": "<p>ctf id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf.version",
            "description": "<p>ctf version number</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf.about",
            "description": "<p>ctf's about</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf.startDate",
            "description": "<p>ctf's startDate</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf.finishDate",
            "description": "<p>ctf's finishDate</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[{\n  \"_id\": 564643,\n  \"version\": \"1.0.0\",\n  \"type\": \"ctf\",\n  \"startDate\": \"2019-8-20\",\n  \"finishDate\": \"2019-8-25\"\n}]",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/ctf/"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/ctf.ts",
    "groupTitle": "CTF",
    "name": "GetCtf"
  },
  {
    "type": "put",
    "url": "/ctf",
    "title": "updates a single ctf only Admins",
    "group": "CTF",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>CTF version</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "about",
            "description": "<p>CTF description</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "startDate",
            "description": "<p>CTF startDate</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "finishDate",
            "description": "<p>CTF finishDate</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf._id",
            "description": "<p>ctf id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf.version",
            "description": "<p>ctf version number</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf.about",
            "description": "<p>ctf's about</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf.startDate",
            "description": "<p>ctf's startDate</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ctf.finishDate",
            "description": "<p>ctf's finishDate</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": 564643,\n  \"version\": \"1.0.0\",\n  \"type\": \"ctf\",\n  \"startDate\": \"2019-8-20\",\n  \"finishDate\": \"2019-8-25\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/ctf/"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Auth error",
          "content": "HTTP/1.1 403 Forbidden",
          "type": "json"
        },
        {
          "title": "Find error",
          "content": "HTTP/1.1 404 Not found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/ctf.ts",
    "groupTitle": "CTF",
    "name": "PutCtf"
  },
  {
    "type": "delete",
    "url": "/challenges/:id",
    "title": "Delete a challenge",
    "group": "Challenges",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "BearerToken",
            "description": "<p>The authorization header</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Deleted successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/challenges/5d3ed1b97b7f06737c15d5b3"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Details of the error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Challenge not found",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Challenge not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Error details\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/challenges.ts",
    "groupTitle": "Challenges",
    "name": "DeleteChallengesId"
  },
  {
    "type": "get",
    "url": "/challenges",
    "title": "List all challenges",
    "group": "Challenges",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "BearerToken",
            "description": "<p>The authorization header</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "challenge",
            "description": "<p>list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge._id",
            "description": "<p>Challenge id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.author",
            "description": "<p>Author id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.title",
            "description": "<p>Challenge title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.difficulty",
            "description": "<p>Challenge difficulty</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.category",
            "description": "<p>Challenge category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.file",
            "description": "<p>Challenge file</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge.score",
            "description": "<p>Challenge score</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge.submissions",
            "description": "<p>Challenge submissions</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge.solves",
            "description": "<p>Challenge solves</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"challenges\": [\n    {\n      \"solves\": 0,\n      \"submissions\": 0,\n      \"_id\": \"5d3ed1b97b7f06737c15d5b3\",\n      \"title\": \"Anarchism\",\n      \"author\": \"5d3ec57e33155b5c551fdb6e\",\n      \"score\": 100,\n      \"difficulty\": \"Easy\",\n      \"category\": \"RE\",\n      \"file\": \"/static/challenge_files/1564398009677iPad_low_vision.jpg\",\n      \"__v\": 0\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/challenges/"
      }
    ],
    "version": "0.0.0",
    "filename": "src/routes/challenges.ts",
    "groupTitle": "Challenges",
    "name": "GetChallenges",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Details of the error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Error details\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/challenges/archived",
    "title": "List archived challenges",
    "group": "Challenges",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "challenge",
            "description": "<p>list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge._id",
            "description": "<p>Challenge id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.author",
            "description": "<p>Author id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.title",
            "description": "<p>Challenge title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.difficulty",
            "description": "<p>Challenge difficulty</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.category",
            "description": "<p>Challenge category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.file",
            "description": "<p>Challenge file</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge.score",
            "description": "<p>Challenge score</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge.submissions",
            "description": "<p>Challenge submissions</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge.solves",
            "description": "<p>Challenge solves</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"challenges\": [\n    {\n        \"solves\": 0,\n        \"submissions\": 0,\n        \"_id\": \"5d3ed1b97b7f06737c15d5b3\",\n        \"title\": \"Anarchism\",\n        \"author\": \"5d3ec57e33155b5c551fdb6e\",\n        \"score\": 100,\n        \"difficulty\": \"Easy\",\n        \"category\": \"RE\",\n        \"file\": \"/static/challenge_files/1564398009677iPad_low_vision.jpg\",\n        \"__v\": 0\n    },\n  ],\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/challenges/archived"
      }
    ],
    "version": "0.0.0",
    "filename": "src/routes/challenges.ts",
    "groupTitle": "Challenges",
    "name": "GetChallengesArchived",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Details of the error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Error details\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/challenges/available",
    "title": "List available challenges",
    "group": "Challenges",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "challenge",
            "description": "<p>list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge._id",
            "description": "<p>Challenge id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.author",
            "description": "<p>Author id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.title",
            "description": "<p>Challenge title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.difficulty",
            "description": "<p>Challenge difficulty</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.category",
            "description": "<p>Challenge category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.file",
            "description": "<p>Challenge file</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge.score",
            "description": "<p>Challenge score</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge.submissions",
            "description": "<p>Challenge submissions</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge.solves",
            "description": "<p>Challenge solves</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"challenges\": [\n    {\n      \"solves\": 0,\n      \"submissions\": 0,\n      \"_id\": \"5d3ed1b97b7f06737c15d5b3\",\n      \"title\": \"Anarchism\",\n      \"author\": \"5d3ec57e33155b5c551fdb6e\",\n      \"score\": 100,\n      \"difficulty\": \"Easy\",\n      \"category\": \"RE\",\n      \"file\": \"/static/challenge_files/1564398009677iPad_low_vision.jpg\",\n      \"__v\": 0\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/challenges/available/"
      }
    ],
    "version": "0.0.0",
    "filename": "src/routes/challenges.ts",
    "groupTitle": "Challenges",
    "name": "GetChallengesAvailable",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Details of the error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Error details\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/challenges/:id",
    "title": "Get a single challenge",
    "group": "Challenges",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "challenge",
            "description": "<p>Challenge object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge._id",
            "description": "<p>Challenge id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.author",
            "description": "<p>Author id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.title",
            "description": "<p>Challenge title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.difficulty",
            "description": "<p>Challenge difficulty</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.category",
            "description": "<p>Challenge category</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.file",
            "description": "<p>Challenge file</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge.score",
            "description": "<p>Challenge score</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge.submissions",
            "description": "<p>Challenge submissions</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge.solves",
            "description": "<p>Challenge solves</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"solves\": 0,\n  \"submissions\": 0,\n  \"_id\": \"5d3ed1b97b7f06737c15d5b3\",\n  \"title\": \"Anarchism\",\n  \"author\": \"5d3ec57e33155b5c551fdb6e\",\n  \"score\": 100,\n  \"difficulty\": \"Easy\",\n  \"category\": \"RE\",\n  \"file\": \"/static/challenge_files/1564398009677iPad_low_vision.jpg\",\n  \"__v\": 0\n},",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/challenges/5d3ed1b97b7f06737c15d5b3"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Details of the error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Challenge not found",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Challenge not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Error details\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/challenges.ts",
    "groupTitle": "Challenges",
    "name": "GetChallengesId"
  },
  {
    "type": "post",
    "url": "/challenges",
    "title": "Create a new challenge.",
    "group": "Challenges",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "BearerToken",
            "description": "<p>The authorization header</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Challenge author id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Challenge Category.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "details",
            "description": "<p>Challenge details.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Challenge difficulty [&quot;Easy&quot;, &quot;Medium&quot;, &quot;Hard&quot;].</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>Challenge file.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "flag",
            "description": "<p>Challenge flag.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Challenge score.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Challenge title.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"author\": \"5d3ec57e33155b5c551fdb6e\",\n  \"category\": \"RE\",\n  \"details\": \"Challenge description\",\n  \"difficulty\": \"Easy\",\n  \"flag\": \"THIS IS A FLAG\",\n  \"score\": 100,\n  \"title\": \"Challenge 101\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "challenge",
            "description": "<p>Created challenge.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge._id",
            "description": "<p>Challenge id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.author",
            "description": "<p>Author id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.title",
            "description": "<p>Challenge title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.difficulty",
            "description": "<p>Challenge difficulty</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.category",
            "description": "<p>Challenge category</p>"
          },
          {
            "group": "Success 200",
            "type": "File",
            "optional": false,
            "field": "challenge.file",
            "description": "<p>Challenge file</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge.score",
            "description": "<p>Challenge score</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge.submissions",
            "description": "<p>Challenge submissions</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge.solves",
            "description": "<p>Challenge solves</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"solves\": 0,\n  \"submissions\": 0,\n  \"_id\": \"5d3ed1b97b7f06737c15d5b3\",\n  \"title\": \"Anarchism\",\n  \"author\": \"5d3ec57e33155b5c551fdb6e\",\n  \"score\": 100,\n  \"difficulty\": \"Easy\",\n  \"category\": \"RE\",\n  \"file\": \"/static/challenge_files/1564398009677iPad_low_vision.jpg\",\n  \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/challenges/"
      }
    ],
    "version": "0.0.0",
    "filename": "src/routes/challenges.ts",
    "groupTitle": "Challenges",
    "name": "PostChallenges",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Details of the error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Error details\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/challenges/:id",
    "title": "Submit a challenge solution.",
    "group": "Challenges",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "BearerToken",
            "description": "<p>The authorization header</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "flag",
            "description": "<p>The challenge's flag.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"flag\": \"fl4g_0f_ch4ll3ng3\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"The flag is correct!\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/challenges/5d3ed1b97b7f06737c15d5b3"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Details of the error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Challenge solved",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Challenge already solved.\"\n}",
          "type": "json"
        },
        {
          "title": "Flag not correct",
          "content": "HTTP/1.1 417 Expectation Failed\n{\n  \"message\": \"The flag is not correct.\"\n}",
          "type": "json"
        },
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Error details\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/challenges.ts",
    "groupTitle": "Challenges",
    "name": "PostChallengesId"
  },
  {
    "type": "put",
    "url": "/challenges",
    "title": "Update challenge.",
    "group": "Challenges",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "BearerToken",
            "description": "<p>The authorization header</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Challenge author.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Challenge Category.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "details",
            "description": "<p>Challenge details.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Challenge difficulty.</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>Challenge file.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "flag",
            "description": "<p>Challenge flag.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Challenge score.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Challenge title.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"author\": \"5d3ec57e33155b5c551fdb6e\",\n  \"category\": \"RE\",\n  \"details\": \"Challenge description\",\n  \"difficulty\": \"Easy\",\n  \"flag\": \"THIS IS A FLAG\",\n  \"score\": 100,\n  \"title\": \"Challenge 101\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "challenge",
            "description": "<p>Created challenge.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge._id",
            "description": "<p>Challenge id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.author",
            "description": "<p>Author id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.title",
            "description": "<p>Challenge title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.difficulty",
            "description": "<p>Challenge difficulty</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challenge.category",
            "description": "<p>Challenge category</p>"
          },
          {
            "group": "Success 200",
            "type": "File",
            "optional": false,
            "field": "challenge.file",
            "description": "<p>Challenge file</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge.score",
            "description": "<p>Challenge score</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge.submissions",
            "description": "<p>Challenge submissions</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge.solves",
            "description": "<p>Challenge solves</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"updated successfully\",\n  \"challenge\": {\n    \"solves\": 0,\n    \"submissions\": 0,\n    \"_id\": \"5d3ed1b97b7f06737c15d5b3\",\n    \"title\": \"Anarchism\",\n    \"author\": \"5d3ec57e33155b5c551fdb6e\",\n    \"score\": 100,\n    \"difficulty\": \"Easy\",\n    \"category\": \"RE\",\n    \"file\": \"/static/challenge_files/1564398009677iPad_low_vision.jpg\",\n    \"__v\": 0\n  }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/challenges/5d3ed1b97b7f06737c15d5b3"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Details of the error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Challenge not found",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Challenge not found\"\n}",
          "type": "json"
        },
        {
          "title": "No field edited",
          "content": "HTTP/1.1 411 Length Required\n{\n  \"message\": \"Please edit at least one field\"\n}",
          "type": "json"
        },
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Error details\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/challenges.ts",
    "groupTitle": "Challenges",
    "name": "PutChallenges"
  },
  {
    "type": "delete",
    "url": "/users/id",
    "title": "deletes an authenticated user",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "BearerToken",
            "description": "<p>The authorization header</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>User _id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>User score</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": 1,\n  \"Username\": \"Tom\",\n  \"score\": 200,\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/users/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Update error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/users.ts",
    "groupTitle": "Users",
    "name": "DeleteUsersId"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "List all users",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>User id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.score",
            "description": "<p>User's score</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[{\n  \"_id\": 564643,\n  \"username\": \"Tom\",\n  \"score\": 150\n}]",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/users/"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/users.ts",
    "groupTitle": "Users",
    "name": "GetUsers"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Get a single user",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>User _id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>User id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.score",
            "description": "<p>User's score</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n {\n   \"_id\": 564643,\n   \"username\": \"Tom\",\n   \"score\": 150\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/users/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "User not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        },
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/users.ts",
    "groupTitle": "Users",
    "name": "GetUsersId"
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "Authenicates a user",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n \"username\": \"Tom\",\n \"password\": \"*******\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>User id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.score",
            "description": "<p>User's score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>authentication token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": " HTTP/1.1 200 OK\n{\n   \"user\": {\n   \"_id\": 564643,\n   \"username\": \"Tom\",\n   \"score\": 150\n   },\n   \"token\": \"fdggjhhyruufderr47itred.fdggjhhyruufderr47itred.fdggjhhyruufderr47itred=\"\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/users/login"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/users.ts",
    "groupTitle": "Users",
    "name": "PostUsersLogin"
  },
  {
    "type": "post",
    "url": "/users/signup",
    "title": "creates a new user",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n \"username\": \"Tom\",\n \"password\": \"*******\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>User id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.score",
            "description": "<p>User's score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>authentication token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": " HTTP/1.1 200 OK\n{\n   \"user\": {\n   \"_id\": 564643,\n   \"username\": \"Tom\",\n   \"score\": 150\n   },\n   \"token\": \"fdggjhhyruufderr47itred.fdggjhhyruufderr47itred.fdggjhhyruufderr47itred=\"\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/users/signup"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/users.ts",
    "groupTitle": "Users",
    "name": "PostUsersSignup"
  },
  {
    "type": "put",
    "url": "/users/id",
    "title": "updates an authenticated user",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's username</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>User's score</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"username\": \"Tom\",\n  \"score\": 200\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "BearerToken",
            "description": "<p>The authorization header</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>User _id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>User score</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": 1,\n  \"Username\": \"Tom\",\n  \"score\": 200,\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/users/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Update error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/users.ts",
    "groupTitle": "Users",
    "name": "PutUsersId"
  },
  {
    "type": "delete",
    "url": "/writeup/:id",
    "title": "Delete a writeup",
    "group": "Writeups",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "BearerToken",
            "description": "<p>The authorization header</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "user"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Deleted successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/writeups/5d3ca1ed1ac0025b69a41be0"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Details of the error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Writeup not found",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Writeup not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Error details\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/writeups.ts",
    "groupTitle": "Writeups",
    "name": "DeleteWriteupId"
  },
  {
    "type": "get",
    "url": "/writeups",
    "title": "List all writeups",
    "group": "Writeups",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "writeup",
            "description": "<p>Created writeup.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup._id",
            "description": "<p>Writeup id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "writeup.challenge",
            "description": "<p>Created challenge.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge._id",
            "description": "<p>Challenge id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge.author",
            "description": "<p>Author id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge.title",
            "description": "<p>Challenge title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge.difficulty",
            "description": "<p>Challenge difficulty</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge.category",
            "description": "<p>Challenge category</p>"
          },
          {
            "group": "Success 200",
            "type": "File",
            "optional": false,
            "field": "writeup.challenge.file",
            "description": "<p>Challenge file</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "writeup.challenge.score",
            "description": "<p>Challenge score</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "writeup.challenge.submissions",
            "description": "<p>Challenge submissions</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "writeup.challenge.solves",
            "description": "<p>Challenge solves</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.content",
            "description": "<p>Writeup content</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"writeups\": [\n    {\n      \"_id\": \"5d3ca1ed1ac0025b69a41be0\",\n      \"challenge\": {\n        \"solves\": 0,\n        \"submissions\": 0,\n        \"_id\": \"5d3ed1b97b7f06737c15d5b3\",\n        \"title\": \"Anarchism\",\n        \"author\": \"5d3ec57e33155b5c551fdb6e\",\n        \"score\": 100,\n        \"difficulty\": \"Easy\",\n        \"category\": \"RE\",\n        \"file\": \"/static/challenge_files/1564398009677iPad_low_vision.jpg\",\n        \"__v\": 0\n      },\n      \"content\": \"WRITEUP CONTENT\",\n      \"__v\": 0\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/writeups/"
      }
    ],
    "version": "0.0.0",
    "filename": "src/routes/writeups.ts",
    "groupTitle": "Writeups",
    "name": "GetWriteups",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Details of the error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Error details\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/writeups/:id",
    "title": "Get a single writeups",
    "group": "Writeups",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "writeup",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup._id",
            "description": "<p>Writeup id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "writeup.challenge",
            "description": "<p>Created challenge.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge._id",
            "description": "<p>Challenge id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge.author",
            "description": "<p>Author id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge.title",
            "description": "<p>Challenge title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge.difficulty",
            "description": "<p>Challenge difficulty</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge.category",
            "description": "<p>Challenge category</p>"
          },
          {
            "group": "Success 200",
            "type": "File",
            "optional": false,
            "field": "writeup.challenge.file",
            "description": "<p>Challenge file</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "writeup.challenge.score",
            "description": "<p>Challenge score</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "writeup.challenge.submissions",
            "description": "<p>Challenge submissions</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "writeup.challenge.solves",
            "description": "<p>Challenge solves</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.content",
            "description": "<p>Writeup content</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"5d3ca1ed1ac0025b69a41be0\",\n  \"challenge\": {\n    \"solves\": 0,\n    \"submissions\": 0,\n    \"_id\": \"5d3ed1b97b7f06737c15d5b3\",\n    \"title\": \"Anarchism\",\n    \"author\": \"5d3ec57e33155b5c551fdb6e\",\n    \"score\": 100,\n    \"difficulty\": \"Easy\",\n    \"category\": \"RE\",\n    \"file\": \"/static/challenge_files/1564398009677iPad_low_vision.jpg\",\n    \"__v\": 0\n  },\n  \"content\": \"WRITEUP CONTENT\",\n  \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/writeups/5d3ca1ed1ac0025b69a41be0"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Details of the error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Writeup not found",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Writeup not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Error details\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/writeups.ts",
    "groupTitle": "Writeups",
    "name": "GetWriteupsId"
  },
  {
    "type": "post",
    "url": "/writeups",
    "title": "Create a new writeup.",
    "group": "Writeups",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "BearerToken",
            "description": "<p>The authorization header</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Writup author id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "challenge",
            "description": "<p>Writeup challenge id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Writeup content.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"author\": \"5d3ec57e33155b5c551fdb6e\",\n  \"challenge\": \"5d3c9ee20b3e7b55cdb8b4bb\",\n  \"content\": \"WRITEUP CONTENT\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "writeup",
            "description": "<p>Created writeup.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup._id",
            "description": "<p>Writeup id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "writeup.challenge",
            "description": "<p>Created challenge.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge._id",
            "description": "<p>Challenge id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge.author",
            "description": "<p>Author id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge.title",
            "description": "<p>Challenge title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge.difficulty",
            "description": "<p>Challenge difficulty</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge.category",
            "description": "<p>Challenge category</p>"
          },
          {
            "group": "Success 200",
            "type": "File",
            "optional": false,
            "field": "writeup.challenge.file",
            "description": "<p>Challenge file</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "writeup.challenge.score",
            "description": "<p>Challenge score</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "writeup.challenge.submissions",
            "description": "<p>Challenge submissions</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "writeup.challenge.solves",
            "description": "<p>Challenge solves</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.content",
            "description": "<p>Writeup content</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"5d3ca1ed1ac0025b69a41be0\",\n  \"challenge\": {\n    \"solves\": 0,\n    \"submissions\": 0,\n    \"_id\": \"5d3ed1b97b7f06737c15d5b3\",\n    \"title\": \"Anarchism\",\n    \"author\": \"5d3ec57e33155b5c551fdb6e\",\n    \"score\": 100,\n    \"difficulty\": \"Easy\",\n    \"category\": \"RE\",\n    \"file\": \"/static/challenge_files/1564398009677iPad_low_vision.jpg\",\n    \"__v\": 0\n  },\n  \"content\": \"WRITEUP CONTENT\",\n  \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/writeups/"
      }
    ],
    "version": "0.0.0",
    "filename": "src/routes/writeups.ts",
    "groupTitle": "Writeups",
    "name": "PostWriteups",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Details of the error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Error details\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/writeups",
    "title": "Update writeup.",
    "group": "Writeups",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "BearerToken",
            "description": "<p>The authorization header</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Writup author id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "challenge",
            "description": "<p>Writeup challenge id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Writeup content.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"author\": \"5d3ec57e33155b5c551fdb6e\",\n  \"challenge\": \"5d3c9ee20b3e7b55cdb8b4bb\",\n  \"content\": \"WRITEUP CONTENT\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "writeup",
            "description": "<p>Updated writeup.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup._id",
            "description": "<p>Writeup id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "writeup.challenge",
            "description": "<p>Created challenge.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge._id",
            "description": "<p>Challenge id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge.author",
            "description": "<p>Author id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge.title",
            "description": "<p>Challenge title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge.difficulty",
            "description": "<p>Challenge difficulty</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.challenge.category",
            "description": "<p>Challenge category</p>"
          },
          {
            "group": "Success 200",
            "type": "File",
            "optional": false,
            "field": "writeup.challenge.file",
            "description": "<p>Challenge file</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "writeup.challenge.score",
            "description": "<p>Challenge score</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "writeup.challenge.submissions",
            "description": "<p>Challenge submissions</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "writeup.challenge.solves",
            "description": "<p>Challenge solves</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "writeup.content",
            "description": "<p>Writeup content</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"5d3ca1ed1ac0025b69a41be0\",\n  \"challenge\": {\n    \"solves\": 0,\n    \"submissions\": 0,\n    \"_id\": \"5d3ed1b97b7f06737c15d5b3\",\n    \"title\": \"Anarchism\",\n    \"author\": \"5d3ec57e33155b5c551fdb6e\",\n    \"score\": 100,\n    \"difficulty\": \"Easy\",\n    \"category\": \"RE\",\n    \"file\": \"/static/challenge_files/1564398009677iPad_low_vision.jpg\",\n    \"__v\": 0\n  },\n  \"content\": \"WRITEUP CONTENT\",\n  \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:8000/api/writeups/5d3ca1ed1ac0025b69a41be0"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Details of the error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Writeup not found",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Writeup not found\"\n}",
          "type": "json"
        },
        {
          "title": "No field edited",
          "content": "HTTP/1.1 411 Length Required\n{\n  \"message\": \"Please edit at least one field\"\n}",
          "type": "json"
        },
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Error details\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/writeups.ts",
    "groupTitle": "Writeups",
    "name": "PutWriteups"
  }
] });
