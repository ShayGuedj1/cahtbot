from flask import Flask, request, jsonify, send_from_directory
import psycopg2
import redis
import pika
import time

app = Flask(__name__, static_folder='static')

# Function to establish a connection to PostgreSQL with retries
def connect_to_postgres():
    retries = 5
    while retries > 0:
        try:
            conn = psycopg2.connect(
                dbname="chatbot",
                user="postgres",
                password="postgres",
                host="postgres",
                port="5432"
            )
            return conn
        except psycopg2.OperationalError as e:
            print(f"Failed to connect to PostgreSQL: {e}")
            retries -= 1
            time.sleep(5)
    raise Exception("Unable to connect to PostgreSQL after multiple retries")

# PostgreSQL connection
conn = connect_to_postgres()
cur = conn.cursor()

# Create the messages table if it doesn't exist
cur.execute("""
    CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL
    )
""")
conn.commit()

# Redis connection
redis_client = redis.StrictRedis(host='redis', port=6379, db=0)

# RabbitMQ connection
connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
channel = connection.channel()
channel.queue_declare(queue='chatbot_queue')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        message = data.get('message')

        if not message:
            return jsonify({'status': 'error', 'message': 'No message provided'}), 400

        # Save message to PostgreSQL
        cur.execute("INSERT INTO messages (content) VALUES (%s)", (message,))
        conn.commit()

        # Save message to Redis
        redis_client.set('last_message', message)

        # Send message to RabbitMQ
        channel.basic_publish(exchange='', routing_key='chatbot_queue', body=message)

        # Initial interaction logic
        if message.lower() == "yes":
            response = {
                'status': 'success',
                'message': 'You can find more details here: <a href="https://github.com/ShayGuedj1/chatbot/blob/main/README.md" target="_blank">README</a>'
            }
        elif message.lower() == "no":
            response = {
                'status': 'success',
                'message': "Well, this was fun, we should do it again sometime :)"
            }
        else:
            response = {
                'status': 'success',
                'message': f"Hi {message}, nice to meet you! My name is CloudBot and I am here to demonstrate a DevOps project for Shay Guedj. Do you want more details? Please answer with yes/no"
            }

        return jsonify(response)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)