

function nextdata {

    console.log('next');
    setFirstLine(firstLine + numberOfLines);
    setLastLine(lastLine + numberOfLines);
    setResultData(allData.slice(firstLine, lastLine));
    console.log('next', {resultData});

}
function Button ()  {
    <button
        disabled={disabled}
        onclick={clickHandler}
        onClick={nextdata}>Next</button>

}

export default Button;