function arrayList (arrayitems) {
    return `${arrayitems.map((item) => {
        return ' ' + item;
    })}`
}

export default arrayList;