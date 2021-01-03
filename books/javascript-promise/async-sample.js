async function fetchBookTitle() {
    const res = await fetch("https://azu.github.io/promises-book/json/book.json");
    const json = await res.json();
    return json.title;
}

fetchBookTitle().then(title => {
    console.log(title);
});