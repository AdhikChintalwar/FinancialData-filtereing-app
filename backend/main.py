from fastapi import FastAPI, Query
import requests
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


API_KEY = "x6JqrPU493FTgKR0fGMTuTKJafY9nHK2"
API_URL = f"https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey={API_KEY}"


@app.get("/financial-data")
def get_financial_data(
    start_date: int = Query(None, alias="startDate"),
    end_date: int = Query(None, alias="endDate"),
    min_revenue: float = Query(None, alias="minRevenue"),
    max_revenue: float = Query(None, alias="maxRevenue"),
    min_net_income: float = Query(None, alias="minNetIncome"),
    max_net_income: float = Query(None, alias="maxNetIncome"),
    sort_by: str = Query("date", alias="sortBy"),
    order: str = Query("asc", alias="order"),
):
   
    response = requests.get(API_URL)
    if response.status_code != 200:
        return {"error": "Failed to fetch data from the external API"}

    data = response.json()
    print(data)
    
    if start_date or end_date:
        data = [
            item
            for item in data
            if (start_date is None or int(item["date"][:4]) >= start_date)
            and (end_date is None or int(item["date"][:4]) <= end_date)
        ]

    if min_revenue or max_revenue:
        data = [
            item
            for item in data
            if (min_revenue is None or item["revenue"] >= min_revenue)
            and (max_revenue is None or item["revenue"] <= max_revenue)
        ]

    if min_net_income or max_net_income:
        data = [
            item
            for item in data
            if (min_net_income is None or item["netIncome"] >= min_net_income)
            and (max_net_income is None or item["netIncome"] <= max_net_income)
        ]

    
    reverse = order == "desc"
    data = sorted(data, key=lambda x: x[sort_by], reverse=reverse)

    return data
