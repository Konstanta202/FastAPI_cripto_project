from app.http_client import COINHTTPCient
from app.config import settings

cmc_client = COINHTTPCient(
    base_url='https://pro-api.coinmarketcap.com',
    api_key=settings.COIN_API_KEY
)
