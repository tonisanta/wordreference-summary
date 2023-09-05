let url = new URL(location.href)
let wordTranslated = url.searchParams.get("spen")
let word = new Word(wordTranslated, "spanish")
word.updateCount()