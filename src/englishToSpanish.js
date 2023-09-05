let url = new URL(location.href)
let wordTranslated = url.searchParams.get("tranword")
let word = new Word(wordTranslated, "english")
word.updateCount()
