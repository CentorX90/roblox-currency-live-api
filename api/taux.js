export default async function handler(req, res) {
  try {
    const exchangeRes = await fetch("https://api.exchangerate.host/latest?base=EUR");
    const exchangeData = await exchangeRes.json();

    const btcRes = await fetch("https://api.coindesk.com/v1/bpi/currentprice/EUR.json");
    const btcData = await btcRes.json();

    const response = {
      base: "EUR",
      rates: exchangeData.rates, // toutes les monnaies
      BTCtoEUR: parseFloat(btcData.bpi.EUR.rate.replace(",", "")) // bitcoin → euro
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des taux" });
  }
}
