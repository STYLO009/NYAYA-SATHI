from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from pathlib import Path

document_folder = Path(r"C:\NYAYA-SATHI\AIservice\documents")

documents = []

for file_path in document_folder.glob("*.pdf"):
    documents.extend(PyPDFLoader(str(file_path)).load())

print("Pages:", len(documents))

if documents:
    print(documents[0].page_content[:1000])

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

chunks = splitter.split_documents(documents)

print("Chunks:", len(chunks))

embedding = HuggingFaceEmbeddings(
    model_name="BAAI/bge-base-en-v1.5"
)

vectorstore = FAISS.from_documents(
    chunks,
    embedding
)

vectorstore.save_local(r"C:\NYAYA-SATHI\AIservice\vectorstore")

print("Vectors are being created!!!!")