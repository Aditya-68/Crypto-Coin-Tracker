import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css'

export default function Coin() {
    const [cryptoData, setCryptoData] = useState([]);
    const [search, setSearch] = useState("");

    const fetchCryptoData = async () => {
        try {
            const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
                params: {
                    vs_currency: "inr",
                }
            });
            console.log(res);
            setCryptoData(res.data);
        } catch (e) {
            console.error("Error fetching data:", e);
        }
    };

    useEffect(() => {
        fetchCryptoData();
    }, []);

    const handleInput = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="container">
            <h1>CryptoCurrency Price Tracking</h1>
            <label htmlFor="search"> <b>Enter Coin Name:  </b>  &nbsp;</label>
            <input type="text" placeholder="Search here..." onChange={handleInput} id="search" />

            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Market Cap(Rupee)</th>
                        <th>Price (Rupee)</th>
                        <th>Available Supply</th>
                        <th>Volume</th>
                        <th>24 Hr. Change</th>
                    </tr>
                </thead>
                <tbody>
                    {cryptoData
                        .filter((coin) =>
                            coin.name.toLowerCase().includes(search.toLowerCase())
                        ).slice(0, 10)
                        .map((coin, index) => (
                            <tr key={index}>
                                <td>{coin.market_cap_rank}</td>
                                <div className="icon">
                                    <img src={coin.image} alt={coin.symbol} />
                                    <td>{coin.name}</td>
                                </div>
                                <td>{coin.symbol.toUpperCase()}</td>
                                <td>{coin.market_cap.toLocaleString()}</td>
                                <td>{coin.current_price.toFixed(2)}</td>
                                <td>{coin.max_supply ? coin.max_supply.toLocaleString() : "N/A"}</td>
                                <td>{coin.
                                    total_volume
                                }</td>
                                <td style={{
                                    color: coin.price_change_percentage_24h < 0 ? "red" : "green",
                                }}>{coin.price_change_percentage_24h}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className="footer">
                <p>Copyright © 2025 Aditya</p>
            </div>
        </div>
    );
}
