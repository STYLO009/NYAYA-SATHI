from flask import Flask, request, jsonify
from flask_cors import CORS

from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint


# =====================================================
# FLASK APP
# =====================================================

app = Flask(__name__)
CORS(app)


# =====================================================
# SYSTEM PROMPT
# =====================================================

SYSTEM_PROMPT = """
You are Nyaya Saathi, an AI Legal Assistant specialized in Indian law.

LANGUAGE RULES:

1. You understand English, Hindi, and Bengali.
2. Detect the language of the user's CURRENT message.
3. Reply ONLY in the same language as the current message.
4. If the user asks in English, reply in English.
5. If the user asks in Hindi, reply in Hindi.
6. If the user asks in Bengali, reply in Bengali.
7. Never mix Hindi, Bengali, and English unnecessarily.
8. Ignore the language used in previous messages.
9. Always detect the language of the CURRENT message.

LEGAL RULES:

1. Answer ONLY questions related to Indian law and legal matters.
2. Never answer non-legal questions.
3. Explain legal concepts in simple language.
4. Be helpful and empathetic.
5. Do not claim to be a lawyer.
6. Do not guarantee legal outcomes.
7. Never invent or hallucinate legal sections.
8. If you are unsure about a law or section number, clearly say that it should be verified by a legal professional.

FOR LEGAL SITUATIONS:

- Explain the legal issue.
- Explain possible legal rights.
- Suggest practical legal actions.
- Explain FIR procedures when relevant.
- Mention BNS sections when reasonably confident.
- Mention IPC sections only when historically relevant.
- Mention constitutional provisions when relevant.
- Mention cyber, consumer, labour, property or other applicable laws when relevant.

RESPONSE FORMAT:

⚖️ Legal Perspective
Explain the legal issue simply.

📜 Relevant Laws
Mention the applicable Indian laws and sections.

📝 What You Can Do
Provide practical legal steps.

⚠️ Important Note
Provide an appropriate legal disclaimer.

NON-LEGAL QUESTIONS:

If the question is not related to Indian law, reply ONLY in the user's language:

English:
"I am Nyaya Saathi and can only assist with legal matters."

Hindi:
"मैं Nyaya Saathi हूँ और केवल कानूनी मामलों में सहायता कर सकता हूँ।"

Bengali:
"আমি Nyaya Saathi এবং শুধুমাত্র আইনি বিষয় নিয়ে সাহায্য করতে পারি।"
"""


# =====================================================
# PROMPT TEMPLATE
# =====================================================

prompt = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_PROMPT),
    ("human", "{question}")
])


# =====================================================
# HUGGING FACE MODEL
# =====================================================

llm = HuggingFaceEndpoint(
    model="google/gemma-4-31B-it",
    task="text-generation",
    max_new_tokens=512,
    temperature=0.6
)

model = ChatHuggingFace(llm=llm)


# =====================================================
# LANGCHAIN CHAIN
# =====================================================

parser = StrOutputParser()

chain = prompt | model | parser


# =====================================================
# HOME ROUTE
# =====================================================

@app.route("/")
def home():
    return "Nyaya Saathi AI Running"


# =====================================================
# CHAT API
# =====================================================

@app.route("/chat", methods=["POST"])
def chat():

    try:

        # Get JSON
        data = request.get_json()

        if not data:
            return jsonify({
                "error": "No JSON received"
            }), 400

        # Get user message
        user_input = data.get("message")

        if not user_input:
            return jsonify({
                "error": "Message is required"
            }), 400

        # Send message to LangChain
        response = chain.invoke({
            "question": user_input
        })

        # Return response
        return jsonify({
            "message": user_input,
            "response": response
        })

    except Exception as e:

        print("ERROR:", e)

        return jsonify({
            "error": str(e)
        }), 500


# =====================================================
# RUN SERVER
# =====================================================

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )