import './Dictionary.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Dictionary = () => {

    const [searchText, setSearchText] = useState('');
    const [result, setresult] = useState({});
    const [meanings, setMeanings] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const [isnotFound, setIsnotFound] = useState(false);


    const getResults = async () => {
        try {
            setIsnotFound(false);
            const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`);
            if (res.data[0]) {
                setresult(res.data[0]);
                setIsSearched(true);
            } else {
                setIsnotFound(true);
            }
        } catch (error) {
            console.log(error);
            setIsnotFound(true);
        }

    }

    useEffect(() => {
        if (result.meanings && isSearched) {
            setMeanings(result.meanings);
        }
    }, [result])

    useEffect(() => {
        if (meanings.length) {
            setIsSearched(false);
        }
    }, [meanings])

    const setValue = (e) => {
        setSearchText(e.target.value);
    }

    return (
        <div className='Dictionary'>
            <h3>Search English Word 📖</h3>
            <div className='searchContainer'>
                <input required placeholder='Type vocabulary' onChange={setValue} />
                <button onClick={getResults}>Search</button>
            </div>

            {
                meanings.length > 0
                    ? meanings.map((meaning, index) => {
                        console.log(meaning);
                        return (
                            <div className='resultContainer' key={index}>
                                <h3>{meaning.partOfSpeech}</h3>
                                <hr />
                                <div className='meanings'>
                                    {
                                        meaning.definitions.map((definition, defIndex) => {

                                            return <div key={defIndex}>
                                                <p>{defIndex + 1}: {definition.definition}</p>
                                                {defIndex === meaning.definitions.length - 1 && <hr />}
                                            </div>
                                        })}
                                </div>
                            </div>
                        )
                    })
                    : <div className='resultContainerBadStatus'>
                        {isnotFound && 'Could not find any result... +_+'}
                    </div>
            }
        </div>
    )
}

export default Dictionary;