try:
    from flask import Flask
    print("Flask is available!")
    
    # Test app creation
    app = Flask(__name__)
    
    @app.route('/test')
    def test():
        return "Flask is working!"
    
    if __name__ == '__main__':
        print("Starting simple Flask test...")
        app.run(debug=True, port=5001)
        
except ImportError as e:
    print(f"Import error: {e}")
    print("Flask is not available in this Python environment")
