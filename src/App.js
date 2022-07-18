import { useEffect, useState } from "react";

const App = () => {

    const urlPeople = "https://swapi.dev/api/people";
    const urlPlanets = "https://swapi.dev/api/planets";
    const urlFilms = "https://swapi.dev/api/films";

    const [url] = useState("https://rickandmortyapi.com/api/character");
    const [characters, setCharacters] = useState(null);

    useEffect(() => {
        getCharacters(url);
        getData();
    }, [])

    /* const getCharacters = (url) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }) // GET
        .then((response) => {

            return response.json();
        })
        .then((info) => {
            console.log(info);
            return info;
        })
        .then((data) => {
            const { results } = data;

            results.forEach(async (element, index) => {
                //console.log(element);
                const response = await fetch(element?.location?.url);
                const info = await response.json();
                //console.log(info);
                data.results[index].location = info?.name;
            });

            setCharacters(data);

        })
    } */

    const getCharacters = url => {
        fetch(url)
            .then((response) => response.json())
            .then(async (data) => {
                console.log(data);

                const { results } = data;

                const responses = await Promise.all(results.map((elem) => fetch(elem?.location?.url)));
                //console.log(responses);
                const info = await Promise.all(responses.filter((item, index) => index < 18).map((response) => response.json()));
                //console.log(info);
                info.forEach((elem, index) => data.results[index].location = elem);

                setCharacters(data);

            })
    }

    const getData = async () => {
        const responses = await Promise.all([fetch(urlPeople), fetch(urlPlanets), fetch(urlFilms)]);
        const data = await Promise.all(responses.map(resp => resp.json()));
        const [dataPeople, dataPlanets, dataFilms] = data;
        console.log(dataPeople);
        console.log(dataPlanets);
        console.log(dataFilms);
    }
    return (
        <h1>Hello App</h1>
    )
}

export default App;