class Word {

    constructor(wordTranslated, language) {
        this.wordTranslated = wordTranslated;
        this.language = language;
    }

    async updateCount() {
        let result= await chrome.storage.local.get(["wordsByLanguage"])

        if (result.wordsByLanguage == null)
            result.wordsByLanguage = {}

        if (!(this.language in result.wordsByLanguage)) {
            result.wordsByLanguage[this.language] = {}
        }

        if (!(this.wordTranslated in result.wordsByLanguage[this.language])) {
            result.wordsByLanguage[this.language][this.wordTranslated] = {
                count: 0,
            }
        }

        result.wordsByLanguage[this.language][this.wordTranslated].count++
        await chrome.storage.local.set({ wordsByLanguage: result.wordsByLanguage})
    }

    static async getTopNByLanguage(n) {
        let result = await chrome.storage.local.get(["wordsByLanguage"])
        let wordsByLanguage = {}

        if (result.wordsByLanguage == null)
            return wordsByLanguage

        for (const [language, frequencyByWord] of Object.entries(result.wordsByLanguage)) {
            let words = []
            Object.entries(frequencyByWord).forEach(([word, freq]) => {
                words.push({
                    word: word,
                    freq: freq.count
                })
            })

            let sorted = words.sort((a, b) => b.freq - a.freq)
            wordsByLanguage[language] = sorted.slice(0, n)
        }

        return wordsByLanguage
    }

    static async generateFile() {
        let result = await chrome.storage.local.get(["wordsByLanguage"])
        let textToSave = JSON.stringify(result);
        let hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'wordReferenceSummary.json';
        hiddenElement.click();
    }
}