document.addEventListener('DOMContentLoaded',  async () => {
    const numToDisplay = 10
    let wordsByLanguage = await Word.getTopNByLanguage(numToDisplay)
    for (const [language, words] of Object.entries(wordsByLanguage)) {
        appendWords(language, words)
    }

    let button = document.getElementById("download-summary")
    button.addEventListener("click", () => {
        Word.generateFile()
    })
});

function appendWords(language, words) {
    const languageHeader = document.createElement("h3")
    languageHeader.textContent = language

    const ul = document.createElement("ul")
    words.forEach((word) => {
        const li = document.createElement("li");
        li.textContent = `${word.word}: ${word.freq}`
        ul.appendChild(li)
    });

    let div = document.getElementById("words-summary")
    div.append(languageHeader)
    div.append(ul)
}
