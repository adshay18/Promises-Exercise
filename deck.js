let deck = axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
let deckID;
const drawnCards = [];
let cardNum = 0;
let newDeck = $('.new');

let button = $('.draw');
let container = $('.cards');

button.on('submit', function(e) {
	e.preventDefault();
	let i = cardNum;
	if (i < 1) {
		container.append(`<img src="${drawnCards[i].image}" alt="${drawnCards[i].value} of ${drawnCards[i].suit}">`);
	} else {
		container.children().remove();
		container.append(`<img src="${drawnCards[i].image}" alt="${drawnCards[i].value} of ${drawnCards[i].suit}">`);
	}

	cardNum += 1;
});

newDeck.click(function(e) {
	location.reload();
});

deck
	.then((res) => {
		deckID = res.data.deck_id;
		return axios.get(`http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=52`);
	})
	.then((res) => {
		for (card in res.data.cards) {
			let value = res.data.cards[card].value;
			let suit = res.data.cards[card].suit;
			let image = res.data.cards[card].image;
			drawnCards[card] = {
				value,
				suit,
				image
			};
		}
	});

if ((cardNum = 52)) {
	cardNum = cardNum - 52;
}
