import React, {useState} from "react";


function Search({setInputHandler}) {
    const [query, setQuery] = useState('');


    function onFormsubmit(e) {
        e.preventDefault();
        console.log('submitted');
        setInputHandler(query);
    }

    return (
        <form id="form-id" onSubmit={onFormsubmit}>
            <input
                type="text"
                name="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="fil in your tag"/>

            <button type="submit" form="form-id">
                Zoek
            </button>

        </form>
    );
}

export default Search;