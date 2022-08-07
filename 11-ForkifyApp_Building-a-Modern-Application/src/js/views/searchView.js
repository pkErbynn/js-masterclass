class SearchView {
    #parentEl = document.querySelector('.search');

    getQuery() {
        const query = this.#parentEl.querySelector('.search__field').value;
        this.#clearInput();
        return query;
    }

    addSearchHandler(handler){
        this.#parentEl.addEventListener('submit', e => {
            e.preventDefault(); // prevent page reload
            handler();
        })
    }

    #clearInput(){
        this.#parentEl.querySelector('.search__field').value = "";
    }
}

export default new SearchView();