// Part 1 - Number Facts

// 1. Make a request to get a fact about my favorite number
let favNumberFact = axios.get('http://numbersapi.com/9/?json');
favNumberFact.then((res) => console.log(res.data.text)).catch((err) => console.log(err));
// -> 9 is the highest single-digit number in the decimal system.

// 2. Figure out how to get data on multiple numbers in a single request, put all the number facts on the page.
const list = $('.number-facts');
let numberFacts = axios.get('http://numbersapi.com/1..10,100');
numberFacts
	.then((res) => {
		for (number in res.data) {
			list.append(`<li class="list-group-item">${res.data[number]}</li>`);
		}
	})
	.catch((err) => {
		list.append("<li class='list-group-item bg-danger'>An error occured.</li>");
	});

// 3. Use the api to get 4 facts on your favorite number and display them all on the page
const favList = $('.9-facts');
let allPromises = [];

for (let i = 1; i <= 4; i++) {
	allPromises.push(axios.get('http://numbersapi.com/9/?json'));
}

Promise.all(allPromises)
	.then((factArr) => {
		for (number in factArr) {
			favList.append(`<li class="list-group-item">${factArr[number].data.text}</li>`);
		}
	})
	.catch((err) => {
		favList.append("<li class='list-group-item bg-danger'>An error occured.</li>");
	});

// Part 2 - Deck of Cards

// 1. Request 1 card from a shuffled deck, console.log its value and suit
let shuffledDeck = axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
let deckID;
shuffledDeck
	.then((res) => {
		deckID = res.data.deck_id;
		return axios.get(`http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);
	})
	.then((res) => {
		for (card in res.data.cards) {
			let value = res.data.cards[card].value;
			let suit = res.data.cards[card].suit;
			console.log(`${value} of ${suit}.`);
		}
	})
	.catch((err) => {
		$('.cards').append('<span class="bg-danger">Error generating deck</span>');
	});

// 2. Request 1 card from a newly shuffled deck. Make another request to get another card from the same deck, console.log both values once you have them
let deck2 = axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
let deck2ID;
const drawnCards = [];
deck2
	.then((res) => {
		deck2ID = res.data.deck_id;
		return axios.get(`http://deckofcardsapi.com/api/deck/${deck2ID}/draw/?count=1`);
	})
	.then((res) => {
		for (card in res.data.cards) {
			let value = res.data.cards[card].value;
			let suit = res.data.cards[card].suit;
			drawnCards.push(`${value} of ${suit}.`);
		}
		return axios.get(`http://deckofcardsapi.com/api/deck/${deck2ID}/draw/?count=1`);
	})
	.then((res) => {
		for (card in res.data.cards) {
			let value = res.data.cards[card].value;
			let suit = res.data.cards[card].suit;
			drawnCards.push(`${value} of ${suit}.`);
		}
	})
	.then((res) => {
		for (card in drawnCards) {
			console.log(drawnCards[card]);
		}
	})
	.catch((err) => {
		$('.cards').append('<span class="bg-danger">Error generating deck 2</span>');
	});

// 3. Build an html page that lets you draw cards from a single deck until all the cards are gone. Display each card on the page. Solution will be on deck.html, deck.css and deck.js
