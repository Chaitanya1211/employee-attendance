// GreetingMessage.js
import axios from "axios";
import React, { useEffect, useState } from "react";

export function GreetingMessage({ name }) {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://quotes85.p.rapidapi.com/getrandomquote',
            headers: {
                'X-RapidAPI-Key': '7d4197b160msh9c9918491e1b29ep1dcbf7jsn8c8d896e6e7e',
                'X-RapidAPI-Host': 'quotes85.p.rapidapi.com'
            }
        };
        
            axios.request(options).then((response) => {
                const quoteArr= response.data.split("-");
                setQuote(quoteArr[0]);
                setAuthor(quoteArr[1]);
                console.log(quoteArr);
            }).catch((error) => {
                setQuote("It is never too late to be what you might have been.");
                setAuthor("Grorge Eliot");
                console.error(error);
            })
    }, [])

    
    const currentTime = new Date().getHours();
    let greeting = "";

    if (currentTime >= 5 && currentTime < 12) {
        greeting = "Good Morning";
    } else if (currentTime >= 12 && currentTime < 17) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }
    return (
        <>
            <div class="card">
                <div class="card-body">
                <h5 class="card-title">{greeting + " " + name + " !!"}</h5>
                <p class="card-text mb-2">{quote ?? "this is quote"}</p>
                <p class="card-text mb-0"><small class="text-muted">{author ?? "this is author"}</small></p>
            </div>
            </div>
        </>
    );
}


export default GreetingMessage;
