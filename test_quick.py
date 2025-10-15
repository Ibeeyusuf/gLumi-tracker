import requests
import time

def test_app():
    print("Testing gLumi Tracker application...")
    
    # Wait a moment for server to start
    time.sleep(2)
    
    try:
        # Test the API endpoint
        response = requests.post(
            'http://127.0.0.1:5000/count-gLumi',
            json={'username': 'testuser'},
            timeout=5
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ API Test Successful!")
            print(f"Count: {data['count']}")
            print(f"Message: {data['message']}")
            print(f"Success: {data['success']}")
            
            # Verify count is between 20-200
            if 66 <= data['count'] <= 420:
                print("✅ Count is within expected range (20-200)")
            else:
                print("❌ Count is outside expected range")
                
        else:
            print(f"❌ API returned error: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to server. Make sure Flask app is running.")
    except Exception as e:
        print(f"❌ Error during test: {e}")

if __name__ == "__main__":
    test_app()
