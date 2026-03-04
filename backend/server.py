from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from pathlib import Path
from datetime import datetime, timezone
import razorpay
import uuid
import os

# =====================================================
# ENV
# =====================================================
BASE_DIR = Path(__file__).parent
load_dotenv(BASE_DIR / ".env")

MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME")
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

if not MONGO_URL:
    raise RuntimeError("❌ MONGO_URL missing")

if not DB_NAME:
    raise RuntimeError("❌ DB_NAME missing")

# =====================================================
# DATABASE
# =====================================================
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# =====================================================
# RAZORPAY
# =====================================================
razorpay_client = razorpay.Client(
    auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)
)

# =====================================================
# FASTAPI APP
# =====================================================
app = FastAPI(title="SweetCart API")

api = APIRouter(prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# MODELS
# =====================================================
class CakeResponse(BaseModel):
    id: str
    name: str
    description: str
    price: float
    image_url: str
    category: str


class OrderCreate(BaseModel):
    cake_id: str
    quantity: int
    customer_name: str
    customer_mobile: str
    customer_email: Optional[EmailStr] = None
    delivery_address: str


class CheckoutRequest(BaseModel):
    order_id: str


class PaymentVerify(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


# =====================================================
# HEALTH CHECK
# =====================================================
@api.get("/")
async def root():
    return {"status": "backend running"}


# =====================================================
# CAKES
# =====================================================
@api.get("/cakes", response_model=List[CakeResponse])
async def get_cakes():
    cakes = await db.cakes.find({}, {"_id": 0}).to_list(100)
    return cakes


@api.get("/cakes/{cake_id}", response_model=CakeResponse)
async def get_cake(cake_id: str):

    cake = await db.cakes.find_one({"id": cake_id}, {"_id": 0})

    if not cake:
        raise HTTPException(status_code=404, detail="Cake not found")

    return cake


# =====================================================
# ORDERS
# =====================================================
@api.post("/orders")
async def create_order(data: OrderCreate):

    cake = await db.cakes.find_one({"id": data.cake_id}, {"_id": 0})

    if not cake:
        raise HTTPException(status_code=404, detail="Cake not found")

    order = {
        "id": str(uuid.uuid4()),
        "order_id": f"DRC{uuid.uuid4().hex[:8].upper()}",
        "cake_id": data.cake_id,
        "cake_name": cake["name"],
        "cake_price": float(cake["price"]),
        "quantity": data.quantity,
        "total_amount": float(cake["price"]) * data.quantity,
        "customer_name": data.customer_name,
        "customer_mobile": data.customer_mobile,
        "customer_email": data.customer_email,
        "delivery_address": data.delivery_address,
        "payment_status": "pending",
        "status": "pending",
        "razorpay_order_id": None,
        "created_at": datetime.now(timezone.utc).isoformat()
    }

    await db.orders.insert_one(order)

    order.pop("_id", None)

    return JSONResponse(content=order)


# =====================================================
# CREATE RAZORPAY ORDER
# =====================================================
@api.post("/checkout/session")
async def create_checkout_session(data: CheckoutRequest):

    order = await db.orders.find_one(
        {"order_id": data.order_id},
        {"_id": 0}
    )

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    razorpay_order = razorpay_client.order.create({
        "amount": int(order["total_amount"] * 100),
        "currency": "INR",
        "receipt": order["order_id"],
        "payment_capture": 1
    })

    await db.orders.update_one(
        {"order_id": data.order_id},
        {"$set": {"razorpay_order_id": razorpay_order["id"]}}
    )

    return {
        "key": RAZORPAY_KEY_ID,
        "razorpay_order_id": razorpay_order["id"],
        "amount": razorpay_order["amount"],
        "currency": "INR"
    }


# =====================================================
# VERIFY PAYMENT
# =====================================================
@api.post("/checkout/verify")
async def verify_payment(data: PaymentVerify):

    try:

        razorpay_client.utility.verify_payment_signature(data.model_dump())

        await db.orders.update_one(
            {"razorpay_order_id": data.razorpay_order_id},
            {"$set": {
                "payment_status": "paid",
                "status": "confirmed"
            }}
        )

        return {"status": "success"}

    except Exception:
        raise HTTPException(status_code=400, detail="Payment verification failed")


# =====================================================
# SEED DATA
# =====================================================
@app.on_event("startup")
async def seed_cakes():

    count = await db.cakes.count_documents({})

    if count == 0:

        await db.cakes.insert_many([
            {
                "id": str(uuid.uuid4()),
                "name": "Chocolate Cake",
                "description": "Rich chocolate cake",
                "price": 299,
                "image_url": "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
                "category": "Chocolate",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Strawberry Cake",
                "description": "Fresh strawberry cake",
                "price": 349,
                "image_url": "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
                "category": "Fruit",
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ])


# =====================================================
# REGISTER ROUTES
# =====================================================
app.include_router(api)
