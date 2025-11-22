from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt
from passlib.context import CryptContext

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()
SECRET_KEY = os.environ.get('SECRET_KEY', 'vtop-secret-key-2024')

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class LoginRequest(BaseModel):
    student_id: str
    password: str

class LoginResponse(BaseModel):
    token: str
    student: dict

class Student(BaseModel):
    model_config = ConfigDict(extra="ignore")
    student_id: str
    name: str
    email: str
    program: str
    branch: str
    semester: int
    registration_number: str
    profile_image: Optional[str] = None

class Attendance(BaseModel):
    model_config = ConfigDict(extra="ignore")
    student_id: str
    course_code: str
    course_name: str
    total_classes: int
    attended_classes: int
    percentage: float

class Mark(BaseModel):
    model_config = ConfigDict(extra="ignore")
    student_id: str
    course_code: str
    course_name: str
    cat1: Optional[float] = None
    cat2: Optional[float] = None
    assignment: Optional[float] = None
    fat: Optional[float] = None
    total: Optional[float] = None

class Grade(BaseModel):
    model_config = ConfigDict(extra="ignore")
    student_id: str
    course_code: str
    course_name: str
    grade: str
    credits: int
    semester: int

class TimeTable(BaseModel):
    model_config = ConfigDict(extra="ignore")
    student_id: str
    day: str
    slot: str
    course_code: str
    course_name: str
    faculty: str
    venue: str

class Exam(BaseModel):
    model_config = ConfigDict(extra="ignore")
    student_id: str
    course_code: str
    course_name: str
    exam_type: str
    date: str
    time: str
    venue: str

class Payment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    student_id: str
    transaction_id: str
    amount: float
    description: str
    date: str
    status: str

class LeaveRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    student_id: str
    leave_type: str
    from_date: str
    to_date: str
    reason: str
    status: str = "Pending"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class Message(BaseModel):
    model_config = ConfigDict(extra="ignore")
    course_code: str
    course_name: str
    message: str
    faculty: str
    date: str

class HostelAllotment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    student_id: str
    block: str
    room_number: str
    bed_number: str
    allotment_date: str

# Helper functions
def create_token(student_id: str):
    payload = {
        "student_id": student_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=7)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload["student_id"]
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

# Routes
@api_router.get("/")
async def root():
    return {"message": "Welcome to VTOP 2.0 API"}

@api_router.post("/auth/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    # Demo credentials
    if request.student_id in ["21BCE001", "21BCE002", "21BCE003"] and request.password == "demo123":
        student = await db.students.find_one({"student_id": request.student_id}, {"_id": 0})
        if not student:
            # Create demo student if not exists
            student = {
                "student_id": request.student_id,
                "name": f"Student {request.student_id}",
                "email": f"{request.student_id.lower()}@university.edu",
                "program": "B.Tech",
                "branch": "Computer Science and Engineering",
                "semester": 5,
                "registration_number": request.student_id,
                "profile_image": None
            }
            await db.students.insert_one(student)
            student.pop("_id", None)
        
        token = create_token(request.student_id)
        return {"token": token, "student": student}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

@api_router.get("/profile", response_model=Student)
async def get_profile(student_id: str = Depends(verify_token)):
    student = await db.students.find_one({"student_id": student_id}, {"_id": 0})
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@api_router.get("/attendance", response_model=List[Attendance])
async def get_attendance(student_id: str = Depends(verify_token)):
    attendance = await db.attendance.find({"student_id": student_id}, {"_id": 0}).to_list(100)
    return attendance

@api_router.get("/marks", response_model=List[Mark])
async def get_marks(student_id: str = Depends(verify_token)):
    marks = await db.marks.find({"student_id": student_id}, {"_id": 0}).to_list(100)
    return marks

@api_router.get("/grades", response_model=List[Grade])
async def get_grades(student_id: str = Depends(verify_token)):
    grades = await db.grades.find({"student_id": student_id}, {"_id": 0}).to_list(100)
    return grades

@api_router.get("/timetable", response_model=List[TimeTable])
async def get_timetable(student_id: str = Depends(verify_token)):
    timetable = await db.timetable.find({"student_id": student_id}, {"_id": 0}).to_list(100)
    return timetable

@api_router.get("/exams", response_model=List[Exam])
async def get_exams(student_id: str = Depends(verify_token)):
    exams = await db.exams.find({"student_id": student_id}, {"_id": 0}).to_list(100)
    return exams

@api_router.get("/payments", response_model=List[Payment])
async def get_payments(student_id: str = Depends(verify_token)):
    payments = await db.payments.find({"student_id": student_id}, {"_id": 0}).to_list(100)
    return payments

@api_router.get("/leave-requests", response_model=List[LeaveRequest])
async def get_leave_requests(student_id: str = Depends(verify_token)):
    leaves = await db.leave_requests.find({"student_id": student_id}, {"_id": 0}).to_list(100)
    return leaves

@api_router.post("/leave-requests", response_model=LeaveRequest)
async def create_leave_request(leave: LeaveRequest, student_id: str = Depends(verify_token)):
    leave.student_id = student_id
    leave_dict = leave.model_dump()
    await db.leave_requests.insert_one(leave_dict)
    return leave

@api_router.get("/messages", response_model=List[Message])
async def get_messages(student_id: str = Depends(verify_token)):
    messages = await db.messages.find({}, {"_id": 0}).to_list(100)
    return messages

@api_router.get("/hostel", response_model=HostelAllotment)
async def get_hostel(student_id: str = Depends(verify_token)):
    hostel = await db.hostel_allotments.find_one({"student_id": student_id}, {"_id": 0})
    if not hostel:
        raise HTTPException(status_code=404, detail="No hostel allotment found")
    return hostel

@api_router.post("/change-password")
async def change_password(old_password: str, new_password: str, student_id: str = Depends(verify_token)):
    # For demo, just return success
    return {"message": "Password changed successfully"}

# Initialize demo data
@api_router.post("/init-demo-data")
async def init_demo_data():
    student_id = "21BCE001"
    
    # Attendance data
    attendance_data = [
        {"student_id": student_id, "course_code": "CSE2001", "course_name": "Data Structures", "total_classes": 45, "attended_classes": 42, "percentage": 93.33},
        {"student_id": student_id, "course_code": "CSE2002", "course_name": "Algorithms", "total_classes": 40, "attended_classes": 38, "percentage": 95.0},
        {"student_id": student_id, "course_code": "CSE2003", "course_name": "Database Systems", "total_classes": 42, "attended_classes": 40, "percentage": 95.24},
        {"student_id": student_id, "course_code": "CSE2004", "course_name": "Operating Systems", "total_classes": 38, "attended_classes": 35, "percentage": 92.11},
        {"student_id": student_id, "course_code": "CSE2005", "course_name": "Computer Networks", "total_classes": 44, "attended_classes": 41, "percentage": 93.18}
    ]
    await db.attendance.delete_many({"student_id": student_id})
    await db.attendance.insert_many(attendance_data)
    
    # Marks data
    marks_data = [
        {"student_id": student_id, "course_code": "CSE2001", "course_name": "Data Structures", "cat1": 48, "cat2": 45, "assignment": 18, "fat": 88, "total": 199},
        {"student_id": student_id, "course_code": "CSE2002", "course_name": "Algorithms", "cat1": 50, "cat2": 47, "assignment": 20, "fat": 90, "total": 207},
        {"student_id": student_id, "course_code": "CSE2003", "course_name": "Database Systems", "cat1": 45, "cat2": 46, "assignment": 19, "fat": 85, "total": 195},
        {"student_id": student_id, "course_code": "CSE2004", "course_name": "Operating Systems", "cat1": 47, "cat2": 44, "assignment": 18, "fat": 87, "total": 196},
        {"student_id": student_id, "course_code": "CSE2005", "course_name": "Computer Networks", "cat1": 46, "cat2": 48, "assignment": 19, "fat": 89, "total": 202}
    ]
    await db.marks.delete_many({"student_id": student_id})
    await db.marks.insert_many(marks_data)
    
    # Grades data
    grades_data = [
        {"student_id": student_id, "course_code": "CSE2001", "course_name": "Data Structures", "grade": "A", "credits": 4, "semester": 5},
        {"student_id": student_id, "course_code": "CSE2002", "course_name": "Algorithms", "grade": "A+", "credits": 4, "semester": 5},
        {"student_id": student_id, "course_code": "CSE2003", "course_name": "Database Systems", "grade": "A", "credits": 3, "semester": 5},
        {"student_id": student_id, "course_code": "CSE2004", "course_name": "Operating Systems", "grade": "A", "credits": 3, "semester": 5},
        {"student_id": student_id, "course_code": "CSE2005", "course_name": "Computer Networks", "grade": "A+", "credits": 4, "semester": 5}
    ]
    await db.grades.delete_many({"student_id": student_id})
    await db.grades.insert_many(grades_data)
    
    # Timetable data
    timetable_data = [
        {"student_id": student_id, "day": "Monday", "slot": "09:00-10:00", "course_code": "CSE2001", "course_name": "Data Structures", "faculty": "Dr. Sharma", "venue": "AB1-101"},
        {"student_id": student_id, "day": "Monday", "slot": "10:00-11:00", "course_code": "CSE2002", "course_name": "Algorithms", "faculty": "Dr. Kumar", "venue": "AB1-102"},
        {"student_id": student_id, "day": "Tuesday", "slot": "09:00-10:00", "course_code": "CSE2003", "course_name": "Database Systems", "faculty": "Dr. Patel", "venue": "AB2-201"},
        {"student_id": student_id, "day": "Tuesday", "slot": "11:00-12:00", "course_code": "CSE2004", "course_name": "Operating Systems", "faculty": "Dr. Singh", "venue": "AB2-202"},
        {"student_id": student_id, "day": "Wednesday", "slot": "10:00-11:00", "course_code": "CSE2005", "course_name": "Computer Networks", "faculty": "Dr. Reddy", "venue": "AB1-103"}
    ]
    await db.timetable.delete_many({"student_id": student_id})
    await db.timetable.insert_many(timetable_data)
    
    # Exam data
    exam_data = [
        {"student_id": student_id, "course_code": "CSE2001", "course_name": "Data Structures", "exam_type": "FAT", "date": "2025-12-15", "time": "09:00 AM", "venue": "Exam Hall 1"},
        {"student_id": student_id, "course_code": "CSE2002", "course_name": "Algorithms", "exam_type": "FAT", "date": "2025-12-17", "time": "02:00 PM", "venue": "Exam Hall 2"},
        {"student_id": student_id, "course_code": "CSE2003", "course_name": "Database Systems", "exam_type": "FAT", "date": "2025-12-19", "time": "09:00 AM", "venue": "Exam Hall 1"},
        {"student_id": student_id, "course_code": "CSE2004", "course_name": "Operating Systems", "exam_type": "FAT", "date": "2025-12-21", "time": "02:00 PM", "venue": "Exam Hall 3"},
        {"student_id": student_id, "course_code": "CSE2005", "course_name": "Computer Networks", "exam_type": "FAT", "date": "2025-12-23", "time": "09:00 AM", "venue": "Exam Hall 2"}
    ]
    await db.exams.delete_many({"student_id": student_id})
    await db.exams.insert_many(exam_data)
    
    # Payment data
    payment_data = [
        {"student_id": student_id, "transaction_id": "TXN001234567", "amount": 75000, "description": "Semester Fee - Sem 5", "date": "2025-08-15", "status": "Completed"},
        {"student_id": student_id, "transaction_id": "TXN001234568", "amount": 5000, "description": "Hostel Fee - Sem 5", "date": "2025-08-15", "status": "Completed"},
        {"student_id": student_id, "transaction_id": "TXN001234569", "amount": 2000, "description": "Library Fee", "date": "2025-08-20", "status": "Completed"}
    ]
    await db.payments.delete_many({"student_id": student_id})
    await db.payments.insert_many(payment_data)
    
    # Messages
    messages_data = [
        {"course_code": "CSE2001", "course_name": "Data Structures", "message": "Assignment 2 submission deadline extended to Nov 30", "faculty": "Dr. Sharma", "date": "2025-11-20"},
        {"course_code": "CSE2002", "course_name": "Algorithms", "message": "CAT-2 will be conducted on Dec 5", "faculty": "Dr. Kumar", "date": "2025-11-21"},
        {"course_code": "CSE2003", "course_name": "Database Systems", "message": "Project demo scheduled for next week", "faculty": "Dr. Patel", "date": "2025-11-22"}
    ]
    await db.messages.delete_many({})
    await db.messages.insert_many(messages_data)
    
    # Hostel allotment
    hostel_data = {"student_id": student_id, "block": "Block A", "room_number": "A-305", "bed_number": "2", "allotment_date": "2025-08-01"}
    await db.hostel_allotments.delete_many({"student_id": student_id})
    await db.hostel_allotments.insert_one(hostel_data)
    
    return {"message": "Demo data initialized successfully"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()