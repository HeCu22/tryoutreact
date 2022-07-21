import React, {useState, useEffect} from "react";
import axios from 'axios';
import Search from "./components/Search";
import arrayList from './helpers/arrayList';
import './App.css';

function App() {
    const [inputValue, setInputValue] = useState(null);
    const [allData, setAllData] = useState([])
    const [resultData, setResultData] = useState([])
    const [firstLine, setFirstLine] = useState(0);
    const [lastLine, setLastLine] = useState(0);
    const [numberOfLines, setNumberOfLines] = useState(7);

    const [numberFound, setNumberFound] = useState(0);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const apiKey = '62c4453eefed421c2bcd3efb';

    useEffect(() => {
            async function fetchData() {
                toggleError(false);
                toggleLoading(true);

                try {
                    console.log('input value', inputValue)
                    // const response = await axios.get(`https://dummyapi.io/data/v1/post?limit=10`, {
                    const response = await axios.get(`https://dummyapi.io/data/v1/tag/${inputValue}/post?limit=20`, {
                        headers: {'app-id': `${apiKey}`}
                    });

                    console.log('response', response.data);
                    // save result constant


                    setAllData(response.data.data);
                    setFirstLine(1);
                    setLastLine(numberOfLines);
                    setNumberFound(response.data.total);
                    setResultData(response.data.data.slice(1, lastLine));
                    setInputValue('');
                    console.log('set', firstLine, lastLine, numberOfLines);

                } catch (e) {
                    console.error(e);
                    toggleError(true);
                }
                toggleLoading(false);

            }

            if (inputValue > "") {
                fetchData();
                console.log('fetched', resultData);
                console.log('fetched', inputValue);

            }

        },
        [firstLine, inputValue, lastLine, numberFound, numberOfLines, resultData]);

    function nextdata() {

        console.log('next');
        setFirstLine(firstLine + numberOfLines);
        setLastLine(lastLine + numberOfLines);
        setResultData(allData.slice(firstLine, lastLine));
        console.log('next', {resultData});

    }

    return (
        <>

            <section className="outer-row">

                <header>
                    <div className="head inner-col">
                        <h1>Tryout</h1>
                    </div>
                </header>
            </section>

            <section className="outer-row">
                {/* first div makes media work because only search field can grow or shrink ? */}
                <div className="inner-cols">
                    <div className="zijkolom-1">
                        <Search setInputHandler={setInputValue}/>

                    </div>
                    {error && (<span>Deze tag geeft geen resultaten</span>)}
                    {loading && (<span>Loading...</span>)}
                    {resultData.length === 0 && !error &&
                        <span>Vul eerst een tag in</span>}
                    <p>data length {resultData.length}</p>
                </div>

                <div className="inner-col">


                    {Object.keys(resultData).length > 0 &&
                        <>


                            <main>
                                {Object.keys(allData).length > 0 &&
                                    <div className="first-article">
                                        <h2> {allData[0].text} {firstLine} {numberFound} </h2>
                                        <div className="image-prop">
                                    <span className="image-wrapper"><img src={allData[0].image}
                                                                         alt="avatar"/> </span>
                                            <h4>Likes: {allData[0].likes}</h4>
                                            <h4>Tags: <span> {arrayList((allData[0].tags))} </span></h4>
                                        </div>

                                    </div>
                                }
                                <div className="tryout-list">


                                    {resultData.map((dataLine) => {
                                        return (
                                            <div key={dataLine.id} className="article-group">
                                                <article className="article">

                                                    <h5>{dataLine.text}</h5> <p> Likes: {dataLine.likes}</p>

                                                    <h5>Tags: <span> {arrayList((allData[0].tags))} </span></h5>
                                                    <div>
                                    <span className="image-wrapper"><img src={dataLine.image}
                                                                         alt="avatar"/> </span>
                                                    </div>
                                                </article>
                                            </div>
                                        );
                                    })
                                    }
                                </div>

                            </main>
                        </>
                    }
                </div>
                <div>
                    {lastLine < numberFound &&
                        <div className="zijkolom-2">

                            <button onClick={nextdata}>Next</button>
                        </div>
                    }
                </div>


            </section>

            <section className="outer-row">
                <footer>
                    <div className="inner-col">
                        copywrite
                    </div>
                </footer>
            </section>

        </>
    )
}

export default App;
