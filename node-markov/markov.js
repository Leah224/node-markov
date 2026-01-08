/** Textual Markov chain generator */

class MarkovMachine {
  /** Build markov machine; read in text. */
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(w => w !== "");
    this.chains = {};
    this.makeChains();
  }

  /** Set markov chains:
   *
   * for text of "the cat in the hat", chains will be:
   * {
   *   "the": ["cat", "hat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "hat": [null]
   * }
   */
  makeChains() {
    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1] || null;

      if (!this.chains[word]) {
        this.chains[word] = [];
      }

      this.chains[word].push(nextWord);
    }
  }

  /** Return random text from chains */
  makeText(numWords = 100) {
    const keys = Object.keys(this.chains);
    let word = keys[Math.floor(Math.random() * keys.length)];
    const output = [];

    while (output.length < numWords && word !== null) {
      output.push(word);
      const nextWords = this.chains[word];
      word = nextWords[Math.floor(Math.random() * nextWords.length)];
    }

    return output.join(" ");
  }
}

module.exports = MarkovMachine;
