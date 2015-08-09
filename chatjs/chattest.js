﻿var DIALOGUES_DATA_SOURCE = {
    "actors": [
		{
		    "id": 10,
		    "name": "John"
		},
		{
		    "id": 20,
		    "name": "Emily"
		}
    ],
	"dialogues": [
		{
		    "id": 10,
		    "parent": null,
		    "isChoice": false,
		    "actor": 10,
		    "conversant": 20,
		    "menuText": "",
		    "dialogueText": "What am I doing here?",
		    "conditionsString": "",
		    "codeBefore": "",
		    "codeAfter": "",
		    "outgoingLinks": [
				20
		    ]
		},
		{
		    "id": 20,
		    "parent": 10,
		    "isChoice": false,
		    "actor": 20,
		    "conversant": 10,
		    "menuText": "",
		    "dialogueText": "What? Did you forget already? Poor poor little John. Once so mighty, now stuck in the middle of a maze to no where.",
		    "conditionsString": "",
		    "codeBefore": "",
		    "codeAfter": "",
		    "outgoingLinks": [
				30
		    ]
		},
		{
		    "id": 30,
		    "parent": 20,
		    "isChoice": true,
		    "conditionsString": "",
		    "codeBefore": "",
		    "codeAfter": "",
		    "outgoingLinks": [
				40,
				50
		    ]
		},
		{
		    "id": 40,
		    "parent": 30,
		    "isChoice": false,
		    "actor": 10,
		    "conversant": 20,
		    "menuText": "Ask about maze.",
		    "dialogueText": "What is this place?",
		    "conditionsString": "",
		    "codeBefore": "",
		    "codeAfter": "",
		    "outgoingLinks": [
				41
		    ]
		},
		{
		    "id": 41,
		    "parent": 40,
		    "isChoice": false,
		    "actor": 20,
		    "conversant": 10,
		    "menuText": "",
		    "dialogueText": "This? This is where you whither and die...",
		    "conditionsString": "",
		    "codeBefore": "",
		    "codeAfter": "",
		    "outgoingLinks": [
				30
		    ]
		},
		{
		    "id": 50,
		    "parent": 30,
		    "isChoice": false,
		    "actor": 10,
		    "conversant": 20,
		    "menuText": "Leave",
		    "dialogueText": "Looks like this place needs a gardener...",
		    "conditionsString": "",
		    "codeBefore": "",
		    "codeAfter": "",
		    "outgoingLinks": []
		}
	]
}