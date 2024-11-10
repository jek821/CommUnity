from flask import Flask, request, jsonify
import os
import openai
import json
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

if openai.api_key is None:
    raise ValueError("OPENAI_API_KEY is not set.")

def get_subject(data_dict):
    return data_dict.get("thread_name", "Community Feedback")

def get_city(data_dict):
    return data_dict.get("thread_city", "City")

def get_zipcode(data_dict):
    return data_dict.get("thread_zip", "Zip Code")

def filter_comments(data_dict):
    filtered_comments = {
        key: value for key, value in data_dict.items()
        if key not in ["thread_name", "thread_city", "thread_zip"] and isinstance(value, int) and value >= 3
    }
    return filtered_comments

def gpt_generation(subject, city, zipcode, filtered_comments):
    prompt = f"""
    You are a community representative helping to summarize important comments on the topic of {subject} from local citizens in {city} at zip code {zipcode} to send an email to a government representative to enact change. Emphasize comments with higher support and do not mention the thread or upvotes in the email. 
    Sign the email as 'Community Representative,' and mention the city and zip code early on.

    Subject: {subject}

    Here are the key points mentioned by users:
    {', '.join([f'{comment}' for comment in filtered_comments.keys()])}

    Please draft a concise and respectful email to a government representative based on these points.
    """
    try:
        response = openai.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that writes emails based on summarized comments."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=250,
            temperature=0.7
        )
        email_content = response.choices[0].message['content']
        return email_content
    except Exception as e:
        print(f"Error generating email: {e}")
        raise

@app.route('/generate-email', methods=['POST'])
def generate_email():
    try:
        data = request.get_json()
        
        subject = get_subject(data)
        city = get_city(data)
        zip_code = get_zipcode(data)
        filtered_comments = filter_comments(data)
        
        email_content = gpt_generation(subject, city, zip_code, filtered_comments)
        
        return jsonify({"generated_email": email_content}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
