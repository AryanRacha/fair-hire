import tempfile
import os
import requests
import pdfplumber
import fitz  # PyMuPDF
import docx
from fastapi import HTTPException

ALLOWED_EXTENSIONS = {"pdf", "docx"}

def extract_text_from_file(file_path: str) -> str:
    ext = file_path.rsplit(".", 1)[1].lower()
    text = ""
    if ext == "pdf":
        try:
            with pdfplumber.open(file_path) as pdf:
                for page in pdf.pages:
                    extracted = page.extract_text()
                    if extracted:
                        text += extracted + "\n"
        except Exception:
            pass
        if not text.strip():
            try:
                doc = fitz.open(file_path)
                for page in doc:
                    text += page.get_text("text") + "\n"
            except Exception:
                pass
    elif ext == "docx":
        doc = docx.Document(file_path)
        text = "\n".join([para.text for para in doc.paragraphs])
    return text.strip()

def download_and_extract(url: str) -> str:
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        ext = "pdf"
        if "docx" in url.lower():
            ext = "docx"
            
        with tempfile.NamedTemporaryFile(delete=False, suffix=f".{ext}") as temp_file:
            temp_file.write(response.content)
            temp_file_path = temp_file.name
            
        text = extract_text_from_file(temp_file_path)
        os.remove(temp_file_path)
        return text
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch or parse resume from URL: {str(e)}")

def get_education_level(text: str) -> int:
    text_lower = text.lower()
    if any(k in text_lower for k in ["phd", "ph.d", "doctorate"]):
        return 3
    if any(k in text_lower for k in ["msc", "m.sc", "ms", "master", "m.tech", "mtech"]):
        return 2
    if any(k in text_lower for k in ["bsc", "b.sc", "bs", "bachelor", "b.tech", "btech", "be"]):
        return 1
    return 0
