import { puzzleInputAsLines } from "../../../helpers/puzzleInput.js";

// const cardStrength: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const cardStrength: string[] = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']

const handTypes: string[] = [
    'high card',
    'one pair',
    'two pair',
    'three of a kind',
    'full house',
    'four of a kind',
    'five of a kind',
]

const upgrades: Record<string, string[]> = {
    'high card': ['one pair', 'three of a kind', 'four of a kind', 'five of a kind', 'five of a kind'],
    'one pair': ['three of a kind', 'four of a kind', 'five of a kind'],
    'two pair': ['full house'],
    'three of a kind': ['four of a kind', 'five of a kind'],
    'four of a kind': ['five of a kind']
}

class Hand {
    bid: number;
    hand: string[];
    handType: number;
    numJokers: number;

    constructor(hand: string, bid: number) {
        this.hand = hand.split('');
        this.bid = bid;
        this.setHandType(this.hand);
    }

    setHandType(hand: string[]) {
        let count: Record<string, number> = this.countCards(hand)
        this.handType = this.lookForHandType(count)
        if (this.numJokers) {
            let currentHandType = handTypes[this.handType]
            let newHandType = upgrades[currentHandType][this.numJokers - 1]
            this.handType = handTypes.indexOf(newHandType)
        }
    }

    countCards(hand: string[]) {
        let count: Record<string, number> = {};
        let jokers: number = 0;
        hand.forEach(card => {
            if (card == 'J') {
                jokers++
                return
            }
            if (count[card] == undefined)
                count[card] = 1
            else
                count[card]++
        });
        this.numJokers = jokers;
        return count;
    }

    lookForHandType(count: Record<string, number>) {
        let type: number = -1;
        const cards = Object.keys(count)
        switch (cards.length + this.numJokers) {
            case 1:
                type = handTypes.indexOf('five of a kind')
                break;
            case 2:
                let numFirstCard = count[cards[0]];
                if (numFirstCard == 1 || numFirstCard == 4)
                    type = handTypes.indexOf('four of a kind')
                else
                    type = handTypes.indexOf('full house')
                break;
            case 3:
                for (let i in count) {
                    if (count[i] == 3) {
                        type = handTypes.indexOf('three of a kind')
                        break;
                    }
                }
                if (type < 0)
                    type = handTypes.indexOf('two pair')
                break;
            case 4:
                type = handTypes.indexOf('one pair')
                break;
            case 5:
                type = handTypes.indexOf('high card')
                break;
            default:
                break;
        }
        return type;
    }
}


let hands: Hand[] = [];
for (let line of puzzleInputAsLines('C:/dev/aoc23/src/2023/day/7/input.txt')) {
    const inputs = line.split(' ');
    hands.push(new Hand(inputs[0], Number(inputs[1])))
}

hands.sort((a, b) => {
    if (a.handType > b.handType) return 1;
    if (a.handType < b.handType) return -1;
    else return compareCardsInHands(a.hand, b.hand);
})
function compareCardsInHands(a: string[], b: string[]) {
    for (let i = 0; i < a.length; i++) {
        if (cardStrength.indexOf(a[i]) > cardStrength.indexOf(b[i])) return 1;
        if (cardStrength.indexOf(a[i]) < cardStrength.indexOf(b[i])) return -1;
    }
    return 0;
}


let total = 0;
hands.forEach((hand, index) => {
    total += (index + 1) * hand.bid;
});

console.log(total);